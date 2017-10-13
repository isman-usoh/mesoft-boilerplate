import { action, autorun, computed, observable } from "mobx";
import * as Cookie from "universal-cookie";

import { AuthApi, IUserInfoDTO  } from "common/apis";

const api = new AuthApi();

interface IAuthState {
    accessToken?: string;
    userInfo?: IUserInfoDTO;
}

class AuthStore implements IAuthState {
    @observable
    loading: boolean = false;
    @observable
    accessToken: string = this.cookie.get("pq_auth_token");
    @observable
    userInfo: IUserInfoDTO;

    constructor(private cookie: Cookie, initialState = {}) {
        Object.assign(this, initialState);

        if (this.accessToken && this.userInfo === undefined) {
            api.authInfo({ headers: this.httpHeader })
                .then((userInfo) => {
                    this.userInfo = userInfo;
                })
                .catch((err) => {
                    this.accessToken = undefined;
                    this.userInfo = undefined;
                    window.location.reload();
                });
        }

        autorun(() => {
            if (this.accessToken) {
                this.cookie.set("pq_auth_token", this.accessToken, {
                    path: "/",
                    secure: !__DEVELOPMENT__,
                    expires: this.userInfo ? new Date(this.userInfo.expiredTime as any) : undefined,
                });
            } else {
                this.cookie.remove("pq_auth_token");
            }

            if (this.userInfo) {
                this.cookie.set("pq_user_id", this.userInfo.id, {
                    path: "/",
                    secure: !__DEVELOPMENT__,
                    expires: this.userInfo ? new Date(this.userInfo.expiredTime as any) : undefined,
                });
            } else {
                this.cookie.remove("pq_user_id");
            }
        });
    }

    @action
    handlerLogout = async () => {
        if (!window.confirm("ยืนยันการออกจากระบบ")) { return; }

        this.loading = true;
        try {
            this.accessToken = null;
            this.cookie.remove("auth_token", {
                path: "/",
                secure: !__DEVELOPMENT__,
                expires: this.userInfo ? new Date(this.userInfo.expiredTime as any) : undefined,
            });
            this.userInfo = null;
            await api.authLogout({ headers: this.httpHeader });
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log("logout$error", error);
        } finally {
            this.loading = false;
        }
    }

    @action
    handlerLogin = async (email: string, password: string) => {
        this.loading = true;
        try {
            const userInfo = await api.authLogin({ email, password });
            this.accessToken = userInfo.accessToken;
            this.userInfo = userInfo;
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error("login$error", error);
            throw new Error("อีเมล์ หรือ รหัสผ่าน ไม่ถูกต้อง");
        } finally {
            this.loading = false;
        }
    }

    @action
    handlerRegister = async (firstname: string, lastname: string, email: string, password: string, gRecaptchaResponse: string) => {
        this.loading = true;
        try {
            const userInfo = await api.authRegister({ firstname, lastname, email, password });
            this.accessToken = userInfo.accessToken;
            this.userInfo = userInfo;
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error("register$error", error);
            throw new Error("ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            this.loading = false;
        }
    }

    @computed
    get displayName() {
        if (this.accessToken && this.userInfo) {
            return this.userInfo.name;
        }
        return "";
    }

    @computed
    get authenticated() {
        return this.accessToken ? true : false;
    }

    @computed
    get httpHeader() {
        if (this.accessToken) {
            return {
                Authorization: `Bearer ${this.accessToken}`,
            };
        } else {
            return {};
        }
    }

    toJS() {
        return {
            authToken: this.accessToken,
            userInfo: this.userInfo,
        } as IAuthState;
    }
}

export {
    IAuthState,
    AuthStore,
};
