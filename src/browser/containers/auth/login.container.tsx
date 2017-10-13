import * as React from "react";

import { LoginFormComponent } from "browser/components/auth";

export class LoginContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="container-fluid">
                <h3>Login</h3>

                <LoginFormComponent/>
            </div>
        );
    }
}
