import path from 'path';
import { i18n } from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n, // Integrate i18n configuration for next-i18next
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('src');
    return config;
  },
};

export default nextConfig;
