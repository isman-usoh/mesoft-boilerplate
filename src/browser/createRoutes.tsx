import * as React from "react";
import { IndexRoute, RedirectFunction, Route, RouterState } from "react-router";

import { IStores } from "common/createStores";

import { AppContainer } from "browser/containers/app.container";
import { HomeContainer } from "browser/containers/home.container";
import { NotFoundContainer } from "browser/containers/notfound.container";
import { PrivateContainer } from "browser/containers/private.container";

import {
    LoginContainer,
    RegisterContainer,
} from "browser/containers/auth";

export function createRoutes(stores: IStores) {

    function requireAuth(nextState: RouterState, replace: RedirectFunction) {
        if (!stores.authStore.authenticated) {
            const { pathname, search } = nextState.location;
            replace({
                pathname: `/login?next=${pathname}${search}`,
                state: { nextPathname: nextState.location.pathname },
            });
        }
    }

    return (
        <Route path="/" component={AppContainer}>
            <IndexRoute component={HomeContainer} />

            <Route path="login" component={LoginContainer} />
            <Route path="register" component={RegisterContainer} />
            <Route path="private" component={PrivateContainer} onEnter={requireAuth} />

            <Route path="*" component={NotFoundContainer} />
        </Route>
    );
}
