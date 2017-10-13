// https://github.com/gpbl/isomorphic500/blob/master/src/utils/IntlUtils.js

// Contains utils to download the locale data for the current language, eventually
// requiring the `Intl` polyfill for browser not supporting it
// It is used in client.js *before* rendering the root component.

import * as areIntlLocalesSupported from "intl-locales-supported";
import { addLocaleData } from "react-intl";

const IntlUtils = {
    // Returns a promise which is resolved when Intl has been polyfilled
    loadIntlPolyfill(locale: any): Promise<any> {
        if ((window as any).Intl && areIntlLocalesSupported(locale)) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            // tslint:disable-next-line:no-console
            console.log("Intl or locale data for %s not available, downloading the polyfill...", locale);

            // When building: create a intl chunk with webpack
            // When executing: run the callback once the chunk has been download.
            (require as any).ensure(["intl"], (require: any) => {
                require("intl"); // apply the polyfill
                // tslint:disable-next-line:no-console
                console.log("Intl polyfill for %s has been loaded", locale);
                resolve();
            }, "intl");
        });
    },

    // Returns a promise which is resolved as the required locale-data chunks
    // has been downloaded with webpack's require.ensure. For each language,
    // we make two different chunks: one for browsers supporting `intl` and one
    // for those who don't.
    // The react-intl locale-data is required, for example, by the FormattedRelative
    // component.
    loadLocaleData(locale: any) {
        const hasIntl = areIntlLocalesSupported(locale);

        // Make sure ReactIntl is in the global scope: this is required for adding locale-data
        // Since ReactIntl needs the `Intl` polyfill to be required (sic) we must place
        // this require here, when loadIntlPolyfill is supposed to be present
        require("expose-loader?ReactIntl!react-intl");

        return new Promise((resolve) => {
            switch (locale) {
                // thai
                case "th":
                case "th-TH":
                    if (!hasIntl) {
                        (require as any).ensure([
                            "intl/locale-data/jsonp/th",
                            "react-intl/locale-data/th",
                        ], (require: any) => {
                            require("intl/locale-data/jsonp/th");
                            addLocaleData(require("react-intl/locale-data/th"));
                            // tslint:disable-next-line:no-console
                            console.log("Intl locale-data for %s has been downloaded", locale);
                            resolve();
                        }, "locale-th");
                    } else {
                        (require as any).ensure([
                            "react-intl/locale-data/th",
                        ], (require: any) => {
                            addLocaleData(require("react-intl/locale-data/th"));
                            // tslint:disable-next-line:no-console
                            console.log("ReactIntl locale-data for %s has been downloaded", locale);
                            resolve();
                        }, "locale-th-no-intl");
                    }
                    break;
                // english
                default:
                    if (!hasIntl) {
                        (require as any).ensure([
                            "intl/locale-data/jsonp/en",
                        ], (require: any) => {
                            require("intl/locale-data/jsonp/en");
                            // tslint:disable-next-line:no-console
                            console.log("Intl locale-data for %s has been downloaded", locale);
                            resolve();
                        }, "locale-en");
                    } else {
                        resolve();
                    }
            }
        });
    },
};

export default IntlUtils;
