import { Form } from "mobx-react-form";
import * as validator from "validator";

import { isEmail, isLength, isNotEmpty } from "./validator";

const plugins = { vjf: validator };

const fields = {
    firstname: {
        label: "ชื่อ",
        default: "",
        validators: [
            isNotEmpty("{label} ต้องไม่ว่าง"),
            isLength({ min: 3, max: 32 }, "{label} ต้องยาวระว่าง 3 ถึง 32 ตัวอักษร"),
        ],
    },
    lastname: {
        label: "นามสกุล",
        default: "",
        validators: [
            isNotEmpty("{label} ต้องไม่ว่าง"),
            isLength({ min: 3, max: 32 }, "{label} ต้องยาวระว่าง 3 ถึง 32 ตัวอักษร"),
        ],
    },
    email: {
        label: "อีเมล์",
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
        default: "",
        validators: [
            isNotEmpty("{label} ต้องไม่ว่าง"),
            isLength({ min: 6, max: 32 }, "{label} ต้องยาวระว่าง 6 ถึง 32 ตัวอักษร"),
        ],
    },
    recaptcha: {
        label: "reCaptcha",
        validators: [
            isNotEmpty("{label} ต้องเลือก"),
        ],
    },
};

export interface IFormModel {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    recaptcha: string;
}

export class RegisterForm extends Form {
    constructor() {
        super({ fields }, { plugins });
    }
}
