import { syncHistoryWithStore } from "mobx-react-router";
import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { browserHistory, match, Router } from "react-router";

import IntlUtils from "browser/utils/intl-utils";

import { createRoutes } from "browser/createRoutes";
import { fetchDataOnLocationMatch } from "browser/helpers/fetchData";
import { Main } from "browser/main";
import { createStores } from "common/createStores";

const stores = createStores(window.__INITIAL_STATE__ || { i18nStore: { lang: document.documentElement.lang } });

// tslint:disable-next-line:ban-types
const renderApp = (appRoutes: Function) => {
    const routes = appRoutes(stores, match);
    const history = syncHistoryWithStore(browserHistory, stores.routerStore);

    fetchDataOnLocationMatch(history, routes, match, stores);

    render(
        <AppContainer>
            <Main stores={stores}>
                <Router history={browserHistory}>
                    {routes}
                </Router>
            </Main>
        </AppContainer>,
        document.getElementById("app"),
    );
};

if ((module as any).hot) {
    (module as any).hot.accept("browser/createRoutes", () => {
        const newRoutes = require("browser/createRoutes").createRoutes;
        renderApp(newRoutes);
    });
}

IntlUtils.loadIntlPolyfill(stores.i18nStore.lang)
    .then(IntlUtils.loadLocaleData.bind(null, stores.i18nStore.lang))
    .then(renderApp.bind(null, createRoutes))
    .catch(console.error);
