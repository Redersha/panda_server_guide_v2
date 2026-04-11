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
      { text: '关于服务器', link: '/about'},
      { text: '赞助服务器', link: '/sponser'},
      { text: 'README', link: '/README'},
      {
        text: '相关链接', // 创建一个下拉菜单
        items: [
          { text: 'Minecraft 官网', link: 'https://www.minecraft.net/', target: '_blank' },
          { text: '中文Minecraft Wiki', link: 'https://zh.minecraft.wiki/', target: '_blank' },
          { text: 'CraftEngine 文档', link: 'https://xiao-momi.github.io/craft-engine-wiki/zh-Hans/', target: '_blank' },
          { text: 'PCL启动器（GitHub）', link: 'https://github.com/Meloong-Git/PCL', target: '_blank' },
          { text: '下载PCL启动器（爱发电）', link: 'https://ifdian.net/p/0164034c016c11ebafcb52540025c377', target: '_blank' },
          { text: '服务器在mcmod找服玩的页面', link: 'https://play.mcmod.cn/sv20185385.html', target: '_blank'}
        ]
      }
    ],
    sidebar: [      
      // 第二部分：注意事项
      {
        text: '注意事项',
        link: '/notice/',
        collapsed: true,
        items: [
          { text: '须知、规则', link: '/notice/notice' },
        ]
      },
      
      // 第三部分：插件与命令
      {
        text: '插件与命令',
        link: '/plugins/',
        collapsed: true,
        items: [
          { text: 'QuickShop - 箱子商店', link: '/plugins/quickshop' },
          { text: 'Home - 家系统', link: '/plugins/home' },
          { text: 'Teleport - 传送系统', link: '/plugins/teleport' },
          { text: 'Upgradeable Hoppers - 区块漏斗', link: '/plugins/upgradeable_hoppers' },
          { text: 'Lands - 领地系统', link: '/plugins/lands' },
          { text: 'Land War - 领地战争', link: '/plugins/land_war' },
          { text: 'Quality Crops - 星露谷作物', link: '/plugins/quality_crops' },
          { text: 'Stardew Fishing - 星露谷钓鱼', link: '/plugins/stardew_fishing' },
          { text: '交易指南', link: '/plugins/trade' }
        ]
      },
      
      // 第四部分：进阶指南
      {
        text: '进阶',
        link: '/advance/',
        collapsed: true,
        items: [
          { text: '自定义唱片', link: '/advance/customize_disc' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Redersha/panda_server_guide_v2' }
    ],
    // .vitepress/config.mts
    footer: {
      message: '本项目使用CC BY-SA 4.0 协议。本文档是独立的玩家创作，与 Mojang Studios、Microsoft、中文 Minecraft Wiki 运营团队无任何隶属关系。',
      copyright: `Copyright © 2019-${new Date().getFullYear()} 大熊猫服务器`
    }
  }
})