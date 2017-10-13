import * as express from "express";
import { useStaticRendering } from "mobx-react";
import { syncHistoryWithStore } from "mobx-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { createMemoryHistory, match, RouterContext } from "react-router";
import * as Cookies from "universal-cookie";

import { createRoutes } from "browser/createRoutes";
import { fetchData } from "browser/helpers/fetchData";
import { Html } from "browser/helpers/html";
import { Main } from "browser/main";

import { AuthApi, IUserInfoDTO } from "common/apis";
import * as config from "common/config";
import { createStores, IState, toJS } from "common/createStores";

const api = new AuthApi();

async function getAuthenticated(req: express.Request): Promise<IUserInfoDTO | undefined> {
    const cookies = new Cookies(req.headers.cookie || "");
    const accessToken = cookies.get("pq_auth_token");

    if (accessToken) {
        try {
            const userInfo = await api.authInfo({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return userInfo;
        } catch (err) {
            cookies.remove("pq_auth_token");
        }
    } else {
        return Promise.resolve(undefined);
    }
}

function getLang(req: express.Request) {
    let lang;
    if (req.query.lang) {
        lang = req.query.lang.toLowerCase().split("-")[0];
    } else {
        const cookies = new Cookies(req.headers.cookie || "");
        lang = cookies.get("lang");
    }

    if (lang && config.langs.indexOf(lang) !== -1) {
        // ภาษาที่เรียกเว็บรองรับ
        return lang;
    }

    if (lang && config.langs.indexOf(lang) === -1 && req.acceptsLanguages(config.langs)) {
        // ภาษาที่เรียกไม่รองรับ ให้ดูจากบราวเซอร์ว่ารองรับภาษาอะไรบ้าง และตรงกับภาษาที่เว็บรองรับหรือเปล่า
        return req.acceptsLanguages(config.langs) as string;
    } else {
        // ภาษาเริ่มต้น
        return config.defaultLang;
    }
}

export async function render(req: express.Request, res: express.Response, javascript: any, styles: any) {
    useStaticRendering(true);

    const userInfo = await getAuthenticated(req);
    const lang = getLang(req);
    const initState: IState = {
        appStore: {
            initialUrl: req.url,
        },
        authStore: {},
        i18nStore: {
            lang,
        },
    };
    if (userInfo) {
        initState.authStore = {
            accessToken: userInfo.accessToken,
            userInfo,
        };
    }

    const stores = createStores(initState, req.headers.cookie);
    const memoryHistory = createMemoryHistory({
        entries: [req.url],
    });
    const history = syncHistoryWithStore(memoryHistory, stores.routerStore);

    const matchRoutes = {
        location: history.createLocation(req.url),
        routes: createRoutes(stores),
    };

    match(matchRoutes, (error, redirectLocation, renderProps) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        if (redirectLocation) {
            //  + (redirectLocation as any).handleInput
            return res.redirect(302, redirectLocation.pathname);
        }
        if (!renderProps) {
            return res.status(404).send("404 Not found");
        }

        const statusCode = renderProps.routes[1].path !== "*" ? 200 : 404;
        // const helmet = Helmet.default.renderStatic();

        return fetchData(stores, renderProps.components, renderProps.params, renderProps.location.query)
            .then(() => {
                const initialState = toJS(stores);
                const contentComponent = (
                    <Main stores={stores}>
                        <RouterContext {...renderProps} />
                    </Main>
                );
                const contentAsString = ReactDOM.renderToStaticMarkup(contentComponent);

                const htmlComponent = (
                    <Html
                        content={contentAsString}
                        styles={styles}
                        javascript={javascript}
                        initialState={initialState} />
                );
                const htmlAsString = "<!doctype html>" + ReactDOM.renderToStaticMarkup(htmlComponent);

                return res.status(statusCode).send(htmlAsString);
            }).catch((err) => {
                // tslint:disable-next-line:no-console
                console.error("Server side render error:", err);
                res.status(400).send("400: An error has occured : " + err);
            });

    });
}
