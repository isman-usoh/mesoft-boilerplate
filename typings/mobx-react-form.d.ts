/// <reference types="react" />
/// <reference types="mobx" />


declare module "mobx-react-form" {
    import Mobx = require("mobx");

    export class Form {
        public readonly name: string | null;
        public readonly hasError: boolean;
        public readonly isValid: boolean;
        public readonly isDirty: boolean;
        public readonly isPristine: boolean;
        public readonly isDefault: boolean;
        public readonly isEmpty: boolean;
        public readonly error: string | null;
        public readonly fields: Mobx.ObservableMap<Field>;
        public readonly validator: Validator | null;

        public constructor();
        public constructor(unified: { fields: {} | Array<{}> }, name?: string | null);
        public constructor(separated: Form.ISeparatedProps, name?: string | null);
        public constructor(initial?: {}, name?: string | null);
        public constructor(option?: any, validator?: Validator.IConfig);

        public options(options: Options.IOptionsProps): Options.IOptionsProps;
        public options(option: string): any;

        public on(event: string, callback: (obj: { form: Form, path: string }) => any): void;

        public validate(opt?: {}, obj?: {}): Promise<boolean>;

        public invalidate(message?: string | null): void;

        public clear(): void;

        public reset(): void;

        public submit(obj?: { onSuccess?: (form: Form) => any, onError?: (form: Form) => any }): Promise<boolean>;
        public submit<T>(obj?: { onSuccess?: (form: Form) => T | Promise<T>, onError?: (form: Form) => any }): Promise<T>;

        public onSubmit(event: any, obj?: { onSuccess?: (form: Form) => any, onError?: (form: Form) => any }): void;

        public onClear(event: any): void;

        public onReset(event: any): void;

        public onAdd(event: any, key?: string | null): void;

        public onDel(event: any, key?: string | null): void;

        public values(): {};

        public values<T>(): T;

        public errors(): {};

        public labels(): {};

        public defaults(): {};

        public initials(): {};

        public init($fields?: {}): void;

        public update(fields: {}): void;

        public $(key: string): Field & React.HTMLAttributes<any>;

        public select(path: string, fields?: Mobx.ObservableMap<Field>, isStrict?: boolean): Field | undefined;

        public container(path?: string | null): Field | undefined;

        public check(computed: string, deep?: boolean): any;

        public get(prop?: null | string | string[]): {};

        public set(prop: string, data: any, recursion?: boolean): void;
        public set(data: {}): void;

        public map<T>(callback: (field: Field, index: number, fields: Field[]) => T): T[];
        public map<T>(path: string, callback: (field: Field, index: number, fields: Field[]) => T): T[];

        public forEach(iteratee: (field: Field, index: number, depth: number) => any,
            fields?: Mobx.ObservableMap<Field>,
            depth?: number): void;

        public add(path?: string | null): void;

        public del(path?: string | null): void;

        public makeField(obj: {
            key: string,
            path: string,
            state: State,
            data?: {},
            props?: {},
            update?: boolean,
        }): Field;
    }

    export class Field {
        public value?: any;
        public readonly label?: string;
        public readonly related?: any;
        public readonly disabled: boolean;
        public readonly defaultValue?: any;
        public readonly default?: any;
        public readonly initial?: any;
        public readonly focus: boolean;
        public readonly touched: boolean;
        public readonly changed: boolean;
        public readonly rules?: any;
        public readonly validate?: any;
        public readonly error: string | null;
        public readonly hasError: boolean;
        public readonly isValid: boolean;
        public readonly isDirty: boolean;
        public readonly isPristine: boolean;
        public readonly isDefault: boolean;
        public readonly isEmpty: boolean;
        public readonly fields: Mobx.ObservableMap<Field>;
        public readonly form?: Form | null;
        public readonly path?: string;
        public readonly key?: string;
        public readonly name?: string;
        public readonly extra?: any;
        public readonly options?: any[];

        public constructor(obj: {
            key: string,
            path: string,
            state: State,
            data?: {},
            props?: {},
            update?: boolean,
        });

        public bind(option?: any): any;

        public setInvalid(message: string, async?: boolean): void;

        public resetValidation(deep?: boolean): void;

        public clear(deep?: boolean): void;

        public reset(deep?: boolean): void;

        public showErrors(showErrors?: boolean): void;

        public sync(e: any): void;

        public onChange(e: any): void;

        public onToggle(e: any): void;

        public onFocus(): void;

        public onBlur(): void;

        public onClear(event: any): void;

        public onReset(event: any): void;

        public onAdd(event: any, key?: string | null): void;

        public onDel(event: any, key?: string | null): void;

        public values(): {};

        public errors(): {};

        public labels(): {};

        public defaults(): {};

        public initials(): {};

        public init($fields?: {}): void;

        public update(fields: any): void

        public $(key: string): Field | any[] | undefined;

        public select(path: string, fields?: Mobx.ObservableMap<Field>, isStrict?: boolean): Field | undefined;

        public container(path?: string | null): Field | undefined;

        public check(computed: string, deep?: boolean): any;

        public get(prop?: null | string | string[]): {};

        public set(prop: string, data: any, recursion?: boolean): void;
        public set(data: {}): void;

        public map<T>(callback: (field: Field, index: number, fields: Field[]) => T): T[];
        public map<T>(path: string, callback: (field: Field, index: number, fields: Field[]) => T): T[];

        public forEach(iteratee: (field: Field, index: number, depth: number) => any,
            fields?: Mobx.ObservableMap<Field>,
            depth?: number): void;

        public add(path?: string | null): void;

        public del(path?: string | null): void;
    }


    class Options {
        protected options: Options.IOptionsProps;

        public get(key?: string | null): any | Options.IOptionsProps;

        public set(options: Options.IOptionsProps): void;
    }

    class State {
        protected $struct: State.IStruct;
        protected initial: State.ISubstate;
        protected current: State.ISubstate;
        protected form: Form;
        protected options: Options;

        public struct(): State.IStruct;
        public struct(data: State.IStruct): void;

        public get(type: "initial" | "current", subtype: "props" | "fields"): {};

        public set(type: "initial" | "current", subtype: "props" | "fields", state: {}): void;
    }

    const Events: Events.IEvents;

    class Validator {
        public readonly promises: Validator.Promises;
        public readonly genericErrorMessage: string | null;

        protected options: Validator.IOptions;
        protected plugins: {
            vjf: boolean | VJF.IPluginProps;
            svk: boolean | SVK.IPluginProps;
            dvr: boolean | DVR.IPluginProps;
        };
        protected validators: {
            vjf: VJF | null;
            svk: SVK | null;
            dvr: DVR | null;
        };

        public constructor(obj?: {});

        public schema(): SVK.ISchema | {};

        public validateAll(o: { form: Form, showErrors?: boolean, related?: boolean }): void;

        public validateField(o: {
            form?: Form | null, field?: Field | null,
            key: string, showErrors?: boolean, related?: boolean
        }): void;

        public getDefaultErrorMessage(): string;

        public resetGenericError(): void;

        public invalidate(message?: string | null): void;

        protected relatedFieldValidation(form: Form, fields: Mobx.ObservableMap<Field>, showErrors: boolean): void;

        protected validateAllDeep(form: Form, fields: Mobx.ObservableMap<Field>,
            showErrors: boolean, related: boolean, path?: string): void;

        protected assignInitData(config?: Validator.IConfig): void;

        protected initializePlugins(config?: Validator.IConfig): void;
    }

    namespace Validator {
        export interface IConfig {
            options?: IOptions;
            plugins?: any;
        }
        export interface IOptions {
            showErrorsOnInit?: boolean;
            validateOnInit?: boolean;
            validateOnChange?: boolean;
            strictUpdate?: boolean;
            showErrorsOnUpdate?: boolean;
            defaultGenericError?: string | null;
            loadingMessage?: string | null;
            allowRequired?: boolean;
            ajv?: {};
        }
        export type Promises = Array<Promise<any>>;
    }

    class DVR {
        public readonly options: Validator.IOptions;

        protected promises: Validator.Promises;
        protected asyncRules: string[];
        protected validator: any | null;
        protected extend: Function | null;

        public constructor(plugin: DVR.IPluginProps, config?: DVR.IConfigProps);

        public validateField(field: Field, form: Form): void;

        public registerAsyncRule(key: string, callback: Function): void;

        public loadingMessage(): string;

        protected assignInitData(plugin: DVR.IPluginProps, config?: DVR.IConfigProps): void;

        protected extendValidator(): void;

        protected validateFieldSync(field: Field, form: Form, data: any): void;

        protected validateFieldAsync(field: Field, form: Form, data: any): void;

        protected handleAsyncPasses(field: Field, resolve: Function): void;

        protected handleAsyncFails(field: Field, validation: any, resolve: Function): void;

        protected executeAsyncValidation(field: Field): void;

        protected rules(rules?: string | string[], type?: "sync" | "async"): string[];
    }

    namespace DVR {
        export interface IPluginProps {
            "package"?: any;
            extend?: Function;
        }
        export interface IConfigProps {
            options?: Validator.IOptions;
            promises?: Validator.Promises;
        }
    }



    class SVK {
        public readonly schema: SVK.ISchema;

        public readonly options: Validator.IOptions;

        protected validate: any;
        protected promises: Validator.Promises;
        protected extend: Function | null;

        public constructor(plugin: SVK.IPluginProps, config?: SVK.IConfigProps);

        public validateField(field: Field): void;

        public loadingMessage(): string;

        protected assignInitData(plugin: SVK.IPluginProps, config?: SVK.IConfigProps): void;

        protected initAJV(plugin: SVK.IPluginProps): void;

        protected handleSyncError(field: Field): void;

        protected handleAsyncError(field: Field, errors: any): void;

        protected executeAsyncValidation(field: Field): void;

        protected parseValues(values: any): any;
    }

    namespace SVK {
        export interface IPluginProps {
            "package"?: any;
            extend?: Function;
        }
        export interface ISchema {
        }
        export interface IConfigProps {
            options?: Validator.IOptions;
            schema?: ISchema;
            promises?: Validator.Promises;
        }
    }


    class VJF {
        public readonly options: Validator.IOptions;

        protected validator: any | null;

        public constructor(plugin: VJF.IPluginProps, config: VJF.IConfigProps);

        public validateField(field: Field, form: Form): void;

        public loadingMessage(): string;

        protected collectData($fn: Function, field: Field, form: Form): void;

        protected executeValidation(field: Field): void;

        protected executeAsyncValidation(field: Field): void;

        protected handleFunctionResult($fn: Function, field: Field, form: Form): void;
    }

    namespace VJF {
        export type IPluginProps = {} | any;
        export interface IConfigProps {
            options?: Validator.IOptions;
            promises?: Validator.Promises;
        }
    }


    namespace Events {
        export type Key = "clear" | "reset" | "update" | "validate";

        export interface IRunning {
            clear: boolean;
            reset: boolean;
            update: boolean;
            validate: boolean;
        }

        export interface IEvents {
            getRunning(key?: Key | null): boolean | IRunning;
            setRunning(key: Key, flag: boolean, path?: string): void;
            path(key: Key): string | null;
            running(events: Key[]): boolean;
        }
    }

    namespace Options {
        export interface IOptionsProps {
            showErrorsOnInit?: boolean; // false
            validateOnInit?: boolean; // true
            validateOnChange?: boolean; // true
            strictUpdate?: boolean; // false
            showErrorsOnUpdate?: boolean; // true
            defaultGenericError?: string | null; // null
            loadingMessage?: string | null; // null
            allowRequired?: boolean; // false
        }
    }

    namespace Form {
        export interface ISeparatedProps {
            fields?: {} | string[];
            values?: {};
            labels?: {};
            defaults?: {};
            disabled?: {};
            related?: {};
            validate?: {};
            rules?: {};
            schema?: {};
        }
    }

    namespace State {
        export type IStruct = string[];

        export interface ISubstate {
            readonly props: {};
            readonly fields: {};
        }
    }
}