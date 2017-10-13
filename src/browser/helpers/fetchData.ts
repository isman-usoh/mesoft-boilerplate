// https://github.com/anorudes/rfx-stack-light/blob/master/src/utils/fetch.js
import { SynchronizedHistory } from "mobx-react-router";

import { IStores } from "common/createStores";

/**
 * Fetch data from components mapping "static fetchData()"
 * and injecting store, router params and query.
 * Used on the server-side. It returns a Promise.
 */
export function fetchData(store: any, components: any, params: any, query: any) {
    return Promise.all(components
        .map((component: any) => component.fetchData
            ? component.fetchData({ store, params, query })
            : false));
}

/**
 * Fetch data from components when the router matches the borwser location.
 * It also prevent the first page to re-fetch data already fetched from the server.
 * Used on the client-side.
 */
export function fetchDataOnLocationMatch(history: SynchronizedHistory, routes: any, match: any, store: IStores) {
    let initialUrl = store.appStore.initialUrl;

    store.uiStore.isShowCategoryContainer = history.getCurrentLocation().pathname === "/" ? true : false;
    store.uiStore.isShowSidebar = false;

    history.listenBefore((location, callback) => {

        match({ routes, location: location.pathname }, (error: any, redirect: any, props: any) => {
            store.uiStore.isShowCategoryContainer = location.pathname === "/" ? true : false;
            store.uiStore.isShowSidebar = false;

            if (props) {
                return fetchData(store, props.components, props.params, props.location.query)
                    .then(() => {
                        callback(null);
                    })
                    .catch((err) => {
                        // tslint:disable-next-line:no-console
                        console.error("fetchData", err);
                        callback(err);
                    });
            }
            callback(null);
        });
    });

    history.listen((location) => {
        // store.appStore.toolbars = undefined;
    });

    return new Promise((resolve, reject) => {
        // for client render only.
        if (initialUrl === null) {
            const location = history.getCurrentLocation().pathname;
            match({ routes, location }, (error: any, redirect: any, props: any) => {
                if (props) {
                    resolve(fetchData(store, props.components, props.params, props.location.query));
                }
                resolve();
            });
            initialUrl = false;
        }
        resolve();
    });
}
