import Document, { Html, Head, Main, NextScript } from "next/document";
import { AppUtils } from "@app/utils";

class WebAppDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href={AppUtils.AppIcon} />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/fav/favicon_16x16.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/fav/favicon_32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="128x128"
                        href="/fav/favicon_128x128.png"
                    />

                    {/* manifest.json provides metadata used when your web app is installed on a
                    user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebAppDocument;
