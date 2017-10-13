import * as React from "react";

import { RegisterFormComponent } from "browser/components/auth";

export class RegisterContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="container-fluid">
                <h3>Register</h3>

                <RegisterFormComponent/>
            </div>
        );
    }
}
