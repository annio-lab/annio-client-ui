const { ANALYZE, PROXY_MODE, API_URL, NODE_ENV } = process.env;

const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: ANALYZE === 'true',
});
const path = require('path');
const {
  name: APP_SHORT_NAME,
  displayName: APP_NAME,
  version: APP_VERSION,
  icon: APP_ICON,
  description: APP_DESCRIPTION,
} = require('./package.json');

const nextConfig = {
  env: {
    PROXY_MODE,
    API_URL,
    APP_NAME,
    APP_SHORT_NAME,
    APP_ICON,
    APP_VERSION,
    APP_DESCRIPTION,
    IS_PROD: NODE_ENV === 'production',
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'public', 'static', 'styles')],
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, path: false, os: false };
    return config;
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
