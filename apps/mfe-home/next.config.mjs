import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe_home',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './HomeApp': './src/app/page.js'
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false }
        }
      })
    );
    return config;
  }
};

export default nextConfig;
