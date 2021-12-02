import { LOCALES } from '@server/i18n';

export class LocaleUtils {
    static getLanguageLabel(key: string): string {
        switch (key) {
            case LOCALES.EN:
                return 'English (U.S)';
            case LOCALES.VI:
                return 'Tiếng Việt';
            default:
                return 'unknown';
        }
    }

    static getCurrentLanguage(): string {
        const lang = localStorage.getItem('language');
        return lang ?? LOCALES.EN;
    }

    static changeCurrentLanguage(lang: string): void {
        localStorage.setItem('language', lang);
    }
}
