declare module "intl-locales-supported" {
    const areIntlLocalesSupported: (localesMyAppSupports: string[]) => boolean
    export = areIntlLocalesSupported
}
