import { action, autorun, observable } from "mobx";
import * as Cookie from "universal-cookie";

interface II18nState {
    lang?: string;
    messages?: { [key: string]: string };
}

class I18nStore implements II18nState {
    @observable
    lang?: string;

    @observable
    messages: { [key: string]: string } = {};

    constructor(private cookie: Cookie, initialState = {}) {
        Object.assign(this, initialState);
        autorun(() => {
            this.cookie.set("land", this.lang);
        });
    }

    @action
    changeLang(lang: string) {
        this.lang = lang;
    }

    toJS() {
        return {
            lang: this.lang,
            messages: this.messages,
        } as II18nState;
    }
}

export {
    II18nState,
    I18nStore,
};
