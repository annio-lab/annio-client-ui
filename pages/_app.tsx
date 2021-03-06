// @flow
import React, { useEffect, useMemo } from "react";
import { AppProps } from "next/app";
import Head from 'next/head'

import { useTranslation, LOCALES_NAMESPACE } from "@server/i18n";
import "@public/styles/main.scss";
import { AppUtils } from "@app/utils";
import { ToastContainer } from 'react-toastify';

const WebApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { i18n } = useTranslation(LOCALES_NAMESPACE.COMMON);

    const i18nInitialized = useMemo(() => i18n.isInitialized, [i18n.isInitialized]);

    useEffect(() => {
        console.log('==== App Initialized ====');
        return (): any => {
            console.log('==== App Stopped ====');
        };
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Annio App" />
                <title>{AppUtils.AppName}</title>
            </Head>
            <div className="d-flex flex-column vh-100 vw-100">
                {i18nInitialized && (
                    <Component {...pageProps} />
                )}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </>
    );
};

export default WebApp;
