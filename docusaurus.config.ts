import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import { config as dotenvConfig } from 'dotenv';
import type * as Preset from '@docusaurus/preset-classic';

dotenvConfig();

const config: Config = {
  title: 'Misti',
  tagline: 'TON Static Analyzer',
  favicon: 'img/misti.svg',
  url: 'https://nowarp.io/',
  baseUrl: '/',
  organizationName: 'nowarp',
  projectName: 'misti',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  stylesheets: [
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      type: 'text/css',
      integrity: 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer',
    },
    {
      href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
      type: 'text/css',
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'tools/misti/docs',
          editUrl: 'https://github.com/nowarp/nowarp.github.io/tree/master/',
        },
        blog: {
          routeBasePath: 'blog',
          blogTitle: 'Blog - TON Security',
          blogDescription: 'Technical blog about TON security and toling',
          blogSidebarCount: 10,
          blogSidebarTitle: 'Latest Posts',
          postsPerPage: 5,
          showReadingTime: true,
          editUrl: 'https://github.com/nowarp/nowarp.github.io/tree/master/',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/navbar-fixes.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      ({
        trackingID: 'G-8VLF6VGHH5',
        anonymizeIP: true,
      }),
    ],
  ],
  themeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      contextualSearch: true,
    },
    customCss: [
      require.resolve('./src/css/custom.css'),
      require.resolve('./src/css/navbar-fixes.css'),
    ],
    navbar: {
      title: '',
      logo: {
        alt: 'Misti Logo',
        src: 'img/misti.svg',
        href: '/',
      },
      items: [
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Tools',
          position: 'left',
          items: [
            {
              label: 'Misti',
              to: '/tools/misti',
            },
            {
              label: 'Scanner',
              to: '/tools/scanner',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: [
            {
              label: 'API Reference',
              to: '/api',
            },
          ],
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          className: 'navbar-version-dropdown misti-only-dropdown',
          dropdownActiveClassDisabled: true,
          dropdownItemsBefore: [],
          dropdownItemsAfter: [],
          docsPluginId: 'default',
        },
      ],
    },
    footer: {
      style: 'dark',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
