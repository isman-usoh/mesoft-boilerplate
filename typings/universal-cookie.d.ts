
declare module "universal-cookie" {
    class Cookies {
        constructor(cookieHeader?: string|object);
        /**
         * Set a cookie value
         * @param name cookie name
         * @param value save the value and stringify the object if needed
         * @param options Support all the cookie options from RFC 6265
         */
        set(name: string, value: any, options?: SetOption);
        /**
         * Get a cookie value
         * @param name  cookie name
         * @param options 
         */
        get(name: string, options?: GetOption): any;
        /**
         * Get all cookies
         * @param options
         */
        getAll(options?: GetOption): any;

        remove(name: string, options?: SetOption)
    }

    interface SetOption {
        /**
         * cookie path, use / as the path if you want your cookie to be accessible on all pages
         */
        path?: string; 
        /**
         * absolute expiration date for the cookie
         */
        expires?: Date | boolean;
        /**
         * relative max age of the cookie from when the client receives it in second
         */
        maxAge?: number; 
        /**
         * domain for the cookie (sub.domain.com or .allsubdomains.com)
         */
        domain?: string;
        /**
         * Is only accessible through HTTPS?
         */
        secure?: boolean;
        /**
         * Is only the server can access the cookie?
         */
        httpOnly?: boolean
    }
    interface GetOption {
        /**
         * do not convert the cookie into an object no matter what
         */
        doNotParse?: boolean;
    }

    namespace Cookies { }

    export = Cookies;
}