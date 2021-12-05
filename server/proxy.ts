const devProxy: { [key: string]: {} } = {
    '/api': {
        target: process.env.API_URL,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
    },
};

export default devProxy;
