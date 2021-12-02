export class AppUtils {
    static AppName = process.env.APP_NAME ?? '-';
    static AppVersion = process.env.APP_VERSION ?? '-';
    static AppIcon = process.env.APP_ICON ?? '-';
    static AppDescription = process.env.APP_DESCRIPTION ?? '';
}
