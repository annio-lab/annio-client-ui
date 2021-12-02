export class HtmlUtils {
    static minify = (raw: string): string => {
        return (raw ?? '').replace(/(\r\n|\n|\r)/gm, '');
    };
}
