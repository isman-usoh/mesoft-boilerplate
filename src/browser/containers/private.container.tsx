import * as React from "react";

export class PrivateContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="container-fluid">
                <h3>Private</h3>
            </div>
        );
    }
}
