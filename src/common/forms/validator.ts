import { Field, Form } from "mobx-react-form";
import * as validator from "validator";

interface IArgs {
    field: Field;
    form: Form;
}

export function isNotEmpty(errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (errorMsg) {
            msg = errorMsg.replace("{label}", args.field.label);
        } else {
            msg = `The ${args.field.label} field is not empty.`;
        }
        const isValid = validator.isEmpty(args.field.value + "");
        return [!isValid, msg];
    };
}

export function isRequire(errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (errorMsg) {
            msg = errorMsg.replace("{label}", args.field.label);
        } else {
            msg = `The ${args.field.label} field is required.`;
        }
        const isValid = validator.isEmpty(args.field.value + "");
        return [!isValid, msg];
    };
}

export function isEmail(errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (errorMsg) {
            msg = errorMsg.replace("{label}", args.field.label);
        } else {
            msg = `The ${args.field.label} format is invalid.`;
        }

        if (args.field.value === undefined || args.field.value === "") {
            return [true, msg];
        }

        const isValid = validator.isEmail(args.field.value);
        return [isValid, msg];
    };
}

export function isLength(option: { min?: number, max?: number }, errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (!errorMsg) {
            if (option && option.min && option.max) {
                msg = `The ${args.field.label} field length must be between ${option.min} and ${option.max}.`;
            } else if (option && option.min) {
                msg = `The ${args.field.label} field length mim ${option.min}.`;
            } else if (option && option.max) {
                msg = `The ${args.field.label} field length max ${option.min}.`;
            } else {
                msg = `The ${args.field.label} field length min 0.`;
            }
        } else {
            msg = errorMsg.replace("{label}", args.field.label);
        }

        if (args.field.value === undefined || args.field.value === "") {
            return [true, msg];
        }

        const isValid = validator.isLength(args.field.value, option);
        return [isValid, msg];
    };
}

export function isFloat(option: { min?: number, max?: number }, errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (!errorMsg) {
            if (option && option.min && option.max) {
                msg = `The ${args.field.label} field float must be between ${option.min} and ${option.max}.`;
            } else if (option && option.min) {
                msg = `The ${args.field.label} field mim ${option.min}.`;
            } else if (option && option.max) {
                msg = `The ${args.field.label} field max ${option.min}.`;
            } else {
                msg = `The ${args.field.label} field min 0.`;
            }
        } else {
            msg = errorMsg.replace("{label}", args.field.label);
        }

        if (args.field.value === undefined || args.field.value === "") {
            return [true, msg];
        }

        const isValid = validator.isFloat(args.field.value + "", option);
        return [isValid, msg];
    };
}

export function isInt(option: { min?: number, max?: number }, errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (!errorMsg) {
            if (option && option.min && option.max) {
                msg = `The ${args.field.label} field float must be between ${option.min} and ${option.max}.`;
            } else if (option && option.min) {
                msg = `The ${args.field.label} field mim ${option.min}.`;
            } else if (option && option.max) {
                msg = `The ${args.field.label} field max ${option.min}.`;
            } else {
                msg = `The ${args.field.label} field min 0.`;
            }
        } else {
            msg = errorMsg.replace("{label}", args.field.label);
        }

        if (args.field.value === undefined || args.field.value === "") {
            return [true, msg];
        }

        const isValid = validator.isInt(args.field.value + "", option);
        return [isValid, msg];
    };
}

export function isNumeric(errorMsg?: string) {
    return (args: IArgs) => {
        let msg;
        if (errorMsg) {
            msg = errorMsg.replace("{label}", args.field.label);
        } else {
            msg = `The ${args.field.label} field is number.`;
        }

        if (args.field.value === undefined || args.field.value === "") {
            return [true, msg];
        }

        const isValid = validator.isNumeric(args.field.value + "");
        return [isValid, msg];
    };
}
