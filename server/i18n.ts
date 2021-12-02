import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import FsBackend from 'i18next-fs-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

export const LOCALES = {
    EN: 'en',
    VI: 'vi',
};

export const LOCALES_NAMESPACE = {
    COMMON: 'common',
};

export { useTranslation };

i18next
    .use(ChainedBackend)
    .use(initReactI18next)
    .init({
        supportedLngs: [LOCALES.EN, LOCALES.VI],
        defaultNS: LOCALES_NAMESPACE.COMMON,
        fallbackNS: LOCALES_NAMESPACE.COMMON,
        fallbackLng: LOCALES.EN,
        saveMissing: true,
        load: 'languageOnly',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            backends: [FsBackend, HttpBackend],
            backendOptions: [
                {
                    expirationTime: 7 * 24 * 60 * 60 * 1000,
                    loadPath:
                        '/public/static/locales_cache/{{lng}}/{{ns}}.json',
                    addPath: '/public/static/locales_cache/{{lng}}/{{ns}}.json',
                },
                {
                    loadPath: '/locales/{{lng}}/{{ns}}.json',
                },
            ],
        },
        react: {
            useSuspense: false,
        },
    });

export default i18next;
