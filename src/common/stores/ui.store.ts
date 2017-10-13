import { action, observable } from "mobx";

interface IUiState {
    isShowCategoryContainer: boolean;
    isShowSidebar: boolean;
}

class UiStore implements IUiState {
    @observable
    isShowCategoryContainer: boolean = false;

    @observable
    isShowSidebar: boolean = false;

    constructor(initialState = {}) {
        Object.assign(this, initialState);
    }

    @action
    showCategoryContainer = (show: boolean) => {
        this.isShowCategoryContainer = show;
    }

    @action
    showSidebar = (show: boolean) => {
        this.isShowSidebar = show;
    }
}

export {
    IUiState,
    UiStore,
};
