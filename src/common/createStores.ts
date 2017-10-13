import * as mobx from "mobx";
import * as Cookie from "universal-cookie";

import { AppStore, IAppState } from "common/stores/app.store";
import { AuthStore, IAuthState } from "common/stores/auth.store";
import { HomeStore, IHomeState } from "common/stores/home.store";
import { I18nStore, II18nState } from "common/stores/i18n.store";
import { RouterStore } from "common/stores/router.store";
import { IUiState, UiStore } from "common/stores/ui.store";

export function createStores(initialState: IState = {}, cookieHeader: any = "") {
    let cookie: Cookie;
    if (__SERVER__) {
        cookie = new Cookie(cookieHeader);
    } else  {
        cookie = new Cookie();
    }

    const appStore = new AppStore(initialState.appStore || {});
    const authStore = new AuthStore(cookie, initialState.authStore || {});
    const routerStore = new RouterStore();
    const uiStore = new UiStore(initialState.uiStore || {});
    const i18nStore = new I18nStore(cookie, initialState.i18nStore || {});
    const homeStore = new HomeStore(initialState.homeStore || {});

    return {
        appStore,
        authStore,
        i18nStore,
        routerStore,
        homeStore,
        uiStore,
    };
}

export function toJS(stores: IStores): IState {
    const jsObj = {};
    Object.keys(stores).forEach((key) => {
        if (stores[key].toJS) {
            jsObj[key] = stores[key].toJS();
        }
    });
    return mobx.toJS(jsObj);
}

export type IStores = IAppProps & IAuthProps & IUiProps & IRouterProps & IHomeProps;

export interface IState {
    appStore?: IAppState;
    authStore?: IAuthState;
    uiStore?: IUiState;
    i18nStore?: II18nState;
    homeStore?: HomeStore;
}

export {
    AppStore,
    AuthStore,
    UiStore,
    RouterStore,
    I18nStore,
    HomeStore,
};

export {
    IAppState,
    IAuthState,
    IUiState,
    II18nState,
    IHomeState,
};

export interface IAppProps { appStore?: AppStore; }
export interface IAuthProps { authStore?: AuthStore; }
export interface IUiProps { uiStore?: UiStore; }
export interface IRouterProps { routerStore?: RouterStore; }
export interface I18nProps { i18nStore?: I18nStore; }
export interface IHomeProps { homeStore?: HomeStore; }
