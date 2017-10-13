import { inject, observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router";

import { IAuthProps, IRouterProps } from "common/createStores";
import { IFormModel, LoginForm } from "common/forms/login.form";
import "./login-form.scss";

@inject("authStore", "routerStore")
@observer
export class LoginFormComponent extends React.Component<IProps, IState> {
    private form: LoginForm;

    constructor(props: any) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleKeyEnter = this._handleKeyEnter.bind(this);
        this.state = {
            process: false,
        };
        this.form = new LoginForm();
    }

    _handleKeyEnter(event: React.KeyboardEvent<any>) {
        if (event.charCode !== 13) { return; }

        this._handleSubmit();
    }

    _handleSubmit() {
        this.form.submit({
            onError: (form: LoginForm) => { return; },
            onSuccess: (form: LoginForm) => {
                const values = form.values<IFormModel>();
                this._handleLoginEmail(values.email, values.password);
            },
        });
    }

    _handleLoginEmail(email: string, password: string) {
        this.setState({ process: true });
        this.props.authStore.handlerLogin(email, password)
            .then(() => {
                this.setState({ process: false });

                const { location, replace } = this.props.routerStore;
                if (location.state && location.state.nextPathname) {
                    replace(location.state.nextPathname);
                } else {
                    replace("/");
                }
            })
            .catch((err) => {
                this.setState({ process: false });
                this.form.invalidate(err.message);
                this.form.$("password").clear();
            });
    }

    render() {
        return (
            <div className="login-form">
                <div className="section-content">
                    <form autoComplete="on" className="form-horizontal">
                        {
                            this.form.error &&
                            <div className="form-group">
                                <small className="form-text text-danger">{this.form.error}</small>
                            </div>
                        }

                        <div className="form-group">
                            <label
                                className="col-sm-4 control-label"
                                htmlFor={this.form.$("email").id}
                                data-toggle="tooltip"
                                title={this.form.$("email").label}>{this.form.$("email").label}</label>

                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    autoComplete="email"
                                    {...this.form.$("email").bind() } />

                                {
                                    this.form.$("email").hasError &&
                                    <small className="form-text text-danger">{this.form.$("email").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label
                                className="col-sm-4 control-label"
                                data-toggle="tooltip"
                                htmlFor={this.form.$("password").id}
                                title={this.form.$("password").label}>{this.form.$("password").label}</label>

                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    autoComplete="password"
                                    onKeyPress={this._handleKeyEnter}
                                    {...this.form.$("password").bind() } />

                                {
                                    this.form.$("password").hasError &&
                                    <small className="form-text text-danger">{this.form.$("password").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-8 col-sm-offset-4">
                                <button
                                    data-hittype="event"
                                    data-event-category="User"
                                    data-event-action="login"
                                    disabled={this.state.process}
                                    type="button"
                                    onClick={this._handleSubmit}
                                    className="btn btn-primary btn-block">
                                    {
                                        this.state.process &&
                                        <i className="fa fa-spinner fa-pulse fa-fw"></i>
                                    }
                                    {
                                        this.state.process
                                            ? " กำลังตรวจสอบ..."
                                            : "ล็อกอินด้วยอีเมล์"
                                    }</button>
                            </div>
                        </div>
                    </form>

                    <div className="clearfix">
                        <small>
                            <Link to="/forget-password" className="pull-right">ลืมรหัสผ่าน?</Link>
                        </small>
                    </div>
                    <hr />

                    <p className="text-center">
                        ยังไม่มีบัญชี <Link to="/register">สมัครเดี้ยวนี้</Link>
                    </p>
                </div>
            </div>
        );
    }
}

type IProps = IAuthProps & IRouterProps;

interface IState {
    process: boolean;
}
