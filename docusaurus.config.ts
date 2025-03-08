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
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/tonsec_chat',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/nowarp/misti',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'API Reference',
              href: 'https://nowarp.io/api/',
            },
            // {
            //   label: 'Changelog',
            //   href: 'https://github.com/nowarp/misti/blob/master/CHANGELOG.md',
            // },
            // {
            //   label: 'Roadmap',
            //   href: 'https://github.com/nowarp/misti/milestones',
            // },
          ],
        },
      ],
      copyright: `
            <div style="display: flex; justify-content: center; align-items: center; text-align: center; width: 100%;">
                Copyright © ${new Date().getFullYear()}&nbsp;<a href="/" style="text-decoration: underline; text-decoration-style: dotted;">nowarp</a>&nbsp;&nbsp;|&nbsp;&nbsp;Supported by&nbsp;<a href="https://ton.foundation" style="text-decoration: underline; text-decoration-style: dotted;">TF</a><svg width="1.5em" height="1.5em" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: 8px;">
                  <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#0098EA"></path>
                  <path d="M21.4629 8.92969H10.5363C8.52724 8.92969 7.25388 11.0969 8.26459 12.8488L15.0081 24.5372C15.4482 25.3004 16.551 25.3004 16.9911 24.5372L23.736 12.8488C24.7453 11.0996 23.472 8.92969 21.4643 8.92969H21.4629ZM15.0026 21.0321L13.534 18.1897L9.99036 11.8518C9.75659 11.4461 10.0454 10.9264 10.5349 10.9264H15.0013V21.0334L15.0026 21.0321ZM22.0061 11.8504L18.4638 18.1911L16.9952 21.0321V10.925H21.4616C21.9511 10.925 22.2399 11.4448 22.0061 11.8504Z" fill="white"></path>
                </svg>
              </a>
            </div>
          `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
