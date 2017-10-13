import { inject, observer } from "mobx-react";
import * as React from "react";

import { IHomeProps, IStores } from "common/createStores";

@inject("homeStore")
@observer
export class HomeContainer extends React.Component<IProps, {}> {

    // Support Server and Client render
    static fetchData(args: { store: IStores, params: any, query: any }) {
        return args.store.homeStore.fetchTodo();
    }

    // Support Client render only
    // componentWillMount() {
    //     this.props.homeStore.fetchTodo();
    // }

    render() {
        const { homeStore } = this.props;
        return (
            <div className="container-fluid">
                <h3>Home Todo</h3>

                {homeStore.loading &&
                    <p>Loading...</p>
                }
                {!homeStore.loading && homeStore.data &&
                    <div>
                        {
                            homeStore.data.map((todo, index) => {
                                let style = {};
                                if (todo.completed) {
                                    style = { textDecoration: "line-through" };
                                }
                                return <p key={index} style={style}>{todo.id} {todo.title}</p>;
                            })
                        }
                    </div>
                }

            </div>
        );
    }
}

type IProps = IHomeProps;
