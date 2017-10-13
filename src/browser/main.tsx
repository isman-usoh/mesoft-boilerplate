import { inject, observer, Provider } from "mobx-react";
import * as React from "react";
import { IntlProvider } from "react-intl";

import { I18nProps, IStores } from "common/createStores";

interface IProps extends React.Props<Main> {
    stores: IStores;
}

export class Main extends React.Component<IProps, {}> {
    render() {
        const stores = this.props.stores;
        return (
            <Provider {...stores}>
                <IntlProviderWrapper>
                    {this.props.children}
                </IntlProviderWrapper>
            </Provider>
        );
    }
}

// tslint:disable-next-line:max-classes-per-file
@inject("i18nStore")
@observer
export class IntlProviderWrapper extends React.Component<I18nProps, {}> {
    render() {
        const { lang } = this.props.i18nStore;
        return (
            <IntlProvider locale={lang}>
                {this.props.children}
            </IntlProvider>
        );
    }
}
