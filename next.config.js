/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-default-export
export default {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    // https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint
    ignoreDuringBuilds: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
}
