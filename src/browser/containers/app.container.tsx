import { inject, observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";

import * as config from "common/config";
import { I18nProps, IAppProps, IRouterProps, IUiProps } from "common/createStores";

@inject("i18nStore", "uiStore", "routerStore", "appStore")
@observer
export class AppContainer extends React.Component<IProps, {}> {
    render() {
        const head = config.app.head;
        const { i18nStore } = this.props;
        return (
            <div>
                <h1>MESCHOOL</h1>
                <Helmet {...head}>
                    <html lang={i18nStore.lang} />
                    <title>{config.app.title}</title>
                </Helmet>

                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

type IProps = I18nProps & IUiProps & IRouterProps & IAppProps;
