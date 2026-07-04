import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: 'PanSou',
  description: '高性能网盘资源搜索 API 服务，支持 TG 搜索和自定义插件搜索',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'PanSou',

    nav: [
      { text: '使用指南', link: '/guide/' },
      { text: 'API 文档', link: '/api/' },
      { text: '插件生态', link: '/plugins/' },
      { text: '开发者', link: '/dev/' },
      {
        text: '更多',
        items: [
          { text: 'GitHub', link: 'https://github.com/fish2018/pansou' },
          { text: '常见问题', link: 'https://github.com/fish2018/pansou/issues/46' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '项目介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: 'Docker 部署', link: '/guide/docker' },
            { text: '源码编译', link: '/guide/source' },
            { text: '配置说明', link: '/guide/configuration' },
            { text: 'Nginx 参考配置', link: '/guide/nginx' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: 'API 总览', link: '/api/' },
            { text: '搜索接口', link: '/api/search' },
            { text: '链接检测', link: '/api/check' },
            { text: '认证接口', link: '/api/auth' },
            { text: '健康检查', link: '/api/health' },
          ],
        },
      ],
      '/plugins/': [
        {
          text: '插件生态',
          items: [
            { text: '插件总览', link: '/plugins/' },
            { text: 'QQPD 插件', link: '/plugins/qqpd' },
            { text: 'Gying 插件', link: '/plugins/gying' },
            { text: '微博插件', link: '/plugins/weibo' },
          ],
        },
      ],
      '/dev/': [
        {
          text: '开发者文档',
          items: [
            { text: '概览', link: '/dev/' },
            { text: '系统架构', link: '/dev/architecture' },
            { text: '插件开发指南', link: '/dev/plugin-guide' },
            { text: '二级缓存设计', link: '/dev/cache' },
            { text: '排序算法', link: '/dev/sorting' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fish2018/pansou' },
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2024 fish2018',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/fish2018/pansou/edit/main/docs-site/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  mermaid: {
    // mermaid 主题跟随系统
  },
}))
