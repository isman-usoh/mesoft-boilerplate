import { Form } from "mobx-react-form";
import * as validator from "validator";

import { isEmail, isLength, isNotEmpty } from "./validator";

const plugins = { vjf: validator };

const fields = {
    email: {
        label: "อีเมล์",
        placeholder: "อีเมล์",
        default: "",
        validators: [
            isNotEmpty("{label} ต้องไม่ว่าง"),
            isEmail("{label} ไม่ถูกต้อง"),
            isLength({ min: 6, max: 32 }, "{label} ต้องยาวระว่าง 6 ถึง 32 ตัวอักษร"),
        ],
    },
    password: {
        type: "password",
        label: "รหัสผ่าน",
        placeholder: "รหัสผ่าน",
        default: "",
        validators: [
            isNotEmpty("{label} ต้องไม่ว่าง"),
            isLength({ min: 6, max: 32 }, "{label} ต้องยาวระว่าง 6 ถึง 32 ตัวอักษร"),
        ],
    },
};

export interface IFormModel {
    email: string;
    password: string;
}

export class LoginForm extends Form {
    constructor() {
        super({ fields }, { plugins });
    }
}
