const devProxy: { [key: string]: {} } = {
    '/api': {
        target: process.env.NEXT_PUBLIC_API_URL,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
    },
};

export default devProxy;
