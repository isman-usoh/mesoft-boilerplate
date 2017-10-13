import { observable } from "mobx";

interface IAppState {
    initialUrl?: string | boolean;
}

class AppStore implements IAppState {
    @observable
    initialUrl: string | boolean = null;

    constructor(initialState = {}) {
        Object.assign(this, initialState);
    }

    toJS() {
        return {
            initialUrl: this.initialUrl,
        } as IAppState;
    }
}

export {
    IAppState,
    AppStore,
};
