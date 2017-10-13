import "./register-form.scss";

import { inject, observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router";

import { Recaptcha } from "browser/components/recaptcha";
import * as config from "common/config";
import { I18nProps, IAuthProps, IRouterProps } from "common/createStores";
import { IFormModel, RegisterForm } from "common/forms/register.form";

@inject("authStore", "i18nStore", "routerStore")
@observer
export class RegisterFormComponent extends React.Component<IProps, IState> {
    private form: RegisterForm;

    constructor(props: any) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleRecaptchaCallback = this._handleRecaptchaCallback.bind(this);
        this.form = new RegisterForm();
        this.state = {
            process: false,
        };
    }

    _handleRecaptchaCallback(value: any) {
        this.form.$("recaptcha").resetValidation();
        this.form.update({ recaptcha: value });
    }

    _handleSubmit() {
        this.form.submit({
            onError: (form: RegisterForm) => { return; },
            onSuccess: (form: RegisterForm) => {
                const values = form.values<IFormModel>();
                this._handleRegister(
                    values.firstname,
                    values.lastname,
                    values.email,
                    values.password,
                    values.recaptcha,
                );
            },
        });
    }

    _handleRegister(firstname: string, lastname: string, email: string, password: string, gReacaptchaResponse: string) {
        this.setState({ process: true });
        this.props.authStore.handlerRegister(firstname, lastname, email, password, gReacaptchaResponse)
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
        const form = this.form;
        return (
            <div className="register-form">
                <div className="section-content">
                    <form autoComplete="on" className="form-horizontal">
                        {
                            form.error &&
                            <div className="form-group">
                                <small className="form-text text-danger">{form.error}</small>
                            </div>
                        }
                        <div className="form-group">

                            <label
                                className="col-sm-4 control-label"
                                htmlFor={form.$("firstname").id}
                                data-toggle="tooltip"
                                title={form.$("firstname").label}>{form.$("firstname").label}</label>

                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    {...form.$("firstname").bind() } />

                                {
                                    form.$("firstname").hasError &&
                                    <small className="form-text text-danger">{form.$("firstname").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">

                            <label
                                className="col-sm-4 control-label"
                                htmlFor={form.$("lastname").id}
                                data-toggle="tooltip"
                                title={form.$("lastname").label}>{form.$("lastname").label}</label>

                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    {...form.$("lastname").bind() } />
                                {
                                    form.$("lastname").hasError &&
                                    <small className="form-text text-danger">{form.$("lastname").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label
                                className="col-sm-4 control-label"
                                htmlFor={form.$("email").id}
                                data-toggle="tooltip"
                                title={form.$("email").label}>{form.$("email").label}</label>

                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    {...form.$("email").bind() } />
                                {
                                    form.$("email").hasError &&
                                    <small className="form-text text-danger">{form.$("email").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label
                                className="col-sm-4 control-label"
                                data-toggle="tooltip"
                                htmlFor={form.$("password").id}
                                title={form.$("password").label}>{form.$("password").label}</label>

                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    {...form.$("password").bind() } />

                                {
                                    form.$("password").hasError &&
                                    <small className="form-text text-danger">{form.$("password").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-8 col-sm-offset-4">
                                <Recaptcha
                                    sitekey={config.recaptcha.siteKey}
                                    language={this.props.i18nStore.lang}
                                    tabindex={4}
                                    size="400px"
                                    verifyCallback={this._handleRecaptchaCallback}
                                    expiredCallback={() => {
                                        form.$("recaptcha").reset();
                                        form.$("recaptcha").validate();
                                    }} />
                                {
                                    form.$("recaptcha").hasError &&
                                    <small className="form-text text-danger">{form.$("recaptcha").error}</small>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-8 col-sm-offset-4">
                                <button
                                    data-hittype="event"
                                    data-event-category="User"
                                    data-event-action="signup"
                                    disabled={this.state.process}
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={this._handleSubmit}>
                                    {
                                        this.state.process &&
                                        <i className="fa fa-spinner fa-pulse fa-fw"></i>
                                    }
                                    {
                                        this.state.process
                                            ? " กำลังลงทะเบียน..."
                                            : "ลงทะเบียน"
                                    }</button>
                            </div>
                        </div>
                        <div className="text-center">
                            <small>คลิก "ลงทะเบียน" แสดงว่ายอมรับ <Link to="/terms">เงื่อนไขการให้บริการ</Link> และ <Link to="/terms">ข้อตกลงการใช้งาน</Link></small>
                        </div>
                    </form>

                    <hr />

                    <p className="text-center">
                        มีบัญชีแล้ว <Link to="/login">ล็อกอินเดี้ยวนี้</Link>
                    </p>
                </div>
            </div>
        );
    }
}

interface IProps extends I18nProps, IAuthProps, IRouterProps {

}
interface IState {
    process: boolean;
}
