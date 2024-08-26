// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'rob18n',
  tagline: 'Your local internationalization manager',
  favicon: 'img/rob18n.png',

  // Set the production url of your site here
  url: 'https://rob18n.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rob18n', // Usually your GitHub org/user name.
  projectName: 'app', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      navbar: {
        title: 'rob18n',
        logo: {
          alt: 'rob18n logo',
          src: 'img/rob18n.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guideSidebar',
            position: 'right',
            label: 'Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'changelogSidebar',
            position: 'right',
            label: 'Changelog',
          },
          {
            href: 'https://github.com/rob18n/app',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/guide/introduction',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/rob18n/app',
              },
            ],
          },
        ],
        copyright: `<hr>Copyright © ${new Date().getFullYear()} rob18n - made by <a targete="_blank" href="http://nette-software.de">Nette Software</a>`,
      },
      prism: {
        theme: prismThemes.github
      },
    }),
};

export default config;
