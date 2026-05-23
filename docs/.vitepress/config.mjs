import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/panda_server_guide_v2/',
  title: "大熊猫服务器文档v2",
  description: "教程、指南与规则",
  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark',
    },
  },
  themeConfig: {
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "full",
      },
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换至浅色",
    darkModeSwitchTitle: "切换至深色",

    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    nav: [
      
      { text: '首页', link: '/' },
      { 
        text: '正文', 
        link: '/main/notice', 
        activeMatch: '^/(main/install_and_start|main/notice|main/plugins|main/advance)(/|$)' 
      },
      { 
        text: '其他内容', 
        link: '/other/', 
        activeMatch: '^/other(/|$)' 
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
      // 为 /main/ 路径配置侧边栏
      '/main/': [
        {
          text: '0. 下载和开始',
          link: '/main/install_and_start',
        },
        {
          text: '1. 注意事项',
          link: '/main/notice',
        },
        {
          text: '2. 插件与命令',
          link: '/main/plugins/',
          items: [
            { text: '2.1 - QuickShop - 箱子商店', link: '/main/plugins/quickshop' },
            { text: '2.2 - Home - 家系统', link: '/main/plugins/home' },
            { text: '2.3 - Teleport - 传送系统', link: '/main/plugins/teleport' },
            { text: '2.4 - Upgradeable Hoppers - 区块漏斗', link: '/main/plugins/upgradeable_hoppers' },
            { text: '2.5 - Lands - 领地系统', link: '/main/plugins/lands' },
            { text: '2.6 - Land War - 领地战争', link: '/main/plugins/land_war' },
            { text: '2.7 - Quality Crops - 星露谷作物', link: '/main/plugins/quality_crops' },
            { text: '2.8 - Stardew Fishing - 星露谷钓鱼', link: '/main/plugins/stardew_fishing' },
          ]
        },
        {
          text: '3. 进阶',
          link: '/main/advance/',
          items: [
            { text: '3.1 - 自定义唱片', link: '/main/advance/customize_disc' }
          ]
        }
      ],
      
      // 为 /other/ 路径配置侧边栏
      '/other/': [
        {
          text: 'ex. 其他内容',
          link: '/other/',
          items: [
            { text: '关于服务器', link: '/other/about' },
            { text: '不同的账号形式 - 第三方、离线、正版', link: '/other/types_of_accounts' },
            { text: 'ex. 1 - 问问题的要求', link: '/other/asking_requirements' },
            { text: 'ex. 2 - 番外', link: '/other/extra' },
            { text: 'ex. 3 - 服务器宣传片', link: '/other/videos' },
            { text: '📷 服务器相册', link: '/other/albums' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Redersha/panda_server_guide_v2' }
    ],

    footer: {
      message: '本项目使用 MIT 协议。本文档是独立的玩家创作，与 Mojang Studios、Microsoft、中文 Minecraft Wiki 运营团队无任何隶属关系。',
      copyright: `Copyright © 2019-${new Date().getFullYear()} 大熊猫服务器`
    }
  }
})