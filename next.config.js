const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import 'src/app/styles/global-imports.scss';`,
  }
}

module.exports = nextConfig;
