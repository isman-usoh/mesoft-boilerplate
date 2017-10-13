import "./recaptcha.scss";

import * as React from "react";

interface IState {
    widgetId?: string;
    isSdkLoaded?: boolean;
}

interface IProps {
    sitekey: string;
    verifyCallback?: Function;
    onloadCallback?: Function;
    expiredCallback?: Function;
    theme?: string;
    type?: string;
    size?: number | string;
    tabindex?: number;
    language?: string;

    className?: string;
}

export class Recaptcha extends React.Component<IProps, IState> {
    private sdkTagId = "recaptcha";
    private key: number;

    static defaultProps = {
        theme: "light",
        type: "image",
        size: "normal",
        tabindex: 0,
        language: "en",
    };

    constructor(props: any) {
        super(props);

        this.state = {
            widgetId: "",
            isSdkLoaded: false,
        };
    }

    private initAsyncCallback() {
        (window as any).onloadRecaptchaCallback = () => {
            this.setState({ isSdkLoaded: true });
            this.recaptchaRender();
        };
    }

    private loadSdkAsynchronously() {
        const language = this.props.language;
        (function(d, s, id) {
            let js;
            const gs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            (js as any).src = `https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit&hl=${language}`;
            gs.parentNode.insertBefore(js, gs);
        }(document, "script", this.sdkTagId));
    }

    private recaptchaRender() {
        const { sitekey, theme, type, size, tabindex, verifyCallback, expiredCallback } = this.props;
        const widgetId = window.grecaptcha.render(`recaptcha-${this.key}`, {
            "sitekey": sitekey,
            "theme": theme,
            "type": type,
            "size": size,
            "tabindex": tabindex,
            "callback": verifyCallback || undefined,
            "expired-callback": expiredCallback || undefined,
        });
        this.setState({
            widgetId,
        });
    }

    reset() {
        if (__SERVER__) return;

        if (this.state.isSdkLoaded && this.state.widgetId) {
            window.grecaptcha.reset(this.state.widgetId);
        }
    }

    getResponse() {
        if (__SERVER__) return;

        if (this.state.isSdkLoaded && this.state.widgetId) {
            return window.grecaptcha.getResponse(this.state.widgetId);
        }
        return null;
    }

    componentWillMount() {
        if (__SERVER__) return;

        if (document.getElementById(this.sdkTagId)) {
            this.setState({ isSdkLoaded: true });
            setTimeout(() => {
                this.recaptchaRender();
            }, 300);
        } else {
            this.initAsyncCallback();
            this.loadSdkAsynchronously();
        }
    }
    render() {
        this.key = Number.parseInt((Math.random() * 1000).toString());
        return (
            <div id={`recaptcha-${this.key}`} className="g-recaptcha"></div>
        );
    }
}
