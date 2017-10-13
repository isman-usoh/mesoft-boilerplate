import { action, observable } from "mobx";

import { ITodoDTO } from "common/models/todo.dto";

interface IHomeState {
    loading: boolean;
    data?: ITodoDTO[];
}

class HomeStore implements IHomeState {
    @observable
    loading = false;
    @observable
    data: ITodoDTO[];

    constructor(initialState = {}) {
        Object.assign(this, initialState);
    }

    @action
    fetchTodo = () => {
        this.loading = true;
        this.data = null;
        return fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.loading = false;
                this.data = data as ITodoDTO[];
            })
            .catch((err) => {
                this.loading = false;
                // tslint:disable-next-line:no-console
                console.error(err);
            });
    }

    toJS() {
        return {
            loading: this.loading,
            data: this.data,
        } as IHomeState;
    }
}

export {
    IHomeState,
    HomeStore,
};
