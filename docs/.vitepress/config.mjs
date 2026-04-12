import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/panda_server_guide_v2/',
  title: "大熊猫服务器文档v2",
  description: "教程、指南与规则",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '快速指南', link: '/quick_guides/'},
      { text: '注意事项', link: '/notice'},
      { text: '插件与命令教程', link: '/plugins/'},
      { text: '进阶', link:'/advance/'},
      {
        text: '关于服务器',
        // 修正：为下拉菜单项添加主入口链接。这里将其指向“关于服务器”页面，或者指向'/about/'
        link: '/about',
        items: [
          { text: '关于服务器', link: '/about'},
          { text: '赞助服务器', link: '/sponser'}
        ]
      },
      {
        text: '相关链接',
        items: [
          // 修正：根据链接内容，填充了相关链接地址
          { text: 'Minecraft 官网', link: 'https://www.minecraft.net/', target: '_blank' },
          { text: '中文Minecraft Wiki', link: 'https://zh.minecraft.wiki/', target: '_blank' },
          { text: 'CraftEngine 文档', link: 'https://xiao-momi.github.io/craft-engine-wiki/zh-Hans/', target: '_blank' },
          { text: 'PCL启动器（GitHub）', link: 'https://github.com/Meloong-Git/PCL', target: '_blank' },
          { text: '下载PCL启动器（爱发电）', link: 'https://ifdian.net/p/0164034c016c11ebafcb52540025c377', target: '_blank' },
          { text: '服务器在mcmod找服玩的页面', link: 'https://play.mcmod.cn/sv20185385.html', target: '_blank'},
          { text: '本项目的README', link: '/README'}
        ]
      }
    ],

    sidebar: {
      '/quick_guides/': 'auto',
      '/plugins/': 'auto',
      '/advance/': 'auto',
      // 关键修复：为根路径 '/' 添加默认侧边栏，以匹配首页、/notice、/about、/sponser 等独立页面
      '/': [
        {
          text: '文档导航',
          items: [
            { text: '首页', link: '/' },
            { text: '注意事项', link: '/notice' },
            { text: '关于服务器', link: '/about' },
            { text: '赞助服务器', link: '/sponser' },
            { text: '快速指南', link: '/quick_guides/' },
            { text: '插件与命令教程', link: '/plugins/' },
            { text: '进阶', link: '/advance/' },
            { text: '本项目的README', link: '/README' }
          ]
        }
      ]
    },

    socialLinks: [
      // 修正：修复了错误的 GitHub 链接
      { icon: 'github', link: 'https://github.com/Redersha/panda_server_guide_v2' }
    ],
    footer: {
      message: '本项目使用CC BY-SA 4.0 协议。本文档是独立的玩家创作，与 Mojang Studios、Microsoft、中文 Minecraft Wiki 运营团队无任何隶属关系。',
      copyright: `Copyright © 2019-${new Date().getFullYear()} 大熊猫服务器`
    }
  }
})