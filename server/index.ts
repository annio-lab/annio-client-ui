/* eslint-disable @typescript-eslint/no-var-requires */
// #region Global Imports
import next from 'next';
import express from 'express';
import path from 'path';
import i18nextMiddleware from 'i18next-http-middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
// #endregion Global Imports

// #region Local Imports
import routes from './routes';
import i18next from './i18n';
import devProxy from './proxy';
// #endregion Local Imports

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();

    server.use(express.static(path.join(__dirname, '../public')));
    server.use(i18nextMiddleware.handle(i18next));

    // add proxies
    Object.keys(devProxy).forEach(context => {
        server.use(createProxyMiddleware(context, devProxy[context]));
    });

    server.all('*', (req, res) => handler(req, res));

    server.listen(port);

    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'development' : process.env.NODE_ENV
        }`
    );
    console.log(
        `> API Service Server listening at ${process.env.NEXT_PUBLIC_API_URL}`
    );
});
