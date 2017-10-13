declare var __CLIENT__: boolean;
declare var __SERVER__: boolean;
declare var __DEVELOPMENT__: boolean;
declare var __DEVTOOLS__: boolean;
declare var __INITIAL_STATE__: any;

declare var DB_HOST: string;
declare var DB_NAME: string;
declare var DB_USERNAME: string;
declare var DB_PASSWORD: string;

declare function $(element: any): any;
declare function jQuery(element: any): any;

interface Window {
    __CLIENT__: boolean;
    __SERVER__: boolean;
    __DEVELOPMENT__: boolean;
    __DEVTOOLS__: boolean;
    __INITIAL_STATE__: any;

    grecaptcha: any;
}

declare namespace NodeJS {
    export interface Global {
        __CLIENT__: boolean;
        __SERVER__: boolean;
        __DEVELOPMENT__: boolean;
        __DEVTOOLS__: boolean;

        DB_HOST: string;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
    }
}
