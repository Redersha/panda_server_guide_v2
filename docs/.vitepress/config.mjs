import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/panda_server_guide_v2/',
  title: "大熊猫服务器文档v2",
  description: "教程、指南与规则",
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
      { text: '安装与开始', link: '/install_and_start'},
      { text: '注意事项', link: '/notice'},
      { text: '插件与命令教程', 
        items: [
          { text: '插件与命令教程 - 章首简介', link: '/plugins/' },
          { text: '箱子商店', link: '/plugins/quickshop' },
          { text: '家系统', link: '/plugins/home' },
          { text: '传送系统', link: '/plugins/teleport' },
          { text: '区块漏斗', link: '/plugins/upgradeable_hoppers' },
          { text: '领地系统', link: '/plugins/lands' },
          { text: '领地战争', link: '/plugins/land_war' },
          { text: '星露谷作物', link: '/plugins/quality_crops' },
          { text: '星露谷钓鱼', link: '/plugins/stardew_fishing' }
        ]
      },
      { text: '进阶', link:'/advance/'},
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
/*
    sidebar: [
      
        {
          text: '1. 快速指南',
          link: '/quick_guides/',
          collapsed: false,
          items: [
            { text: '1.0 - 下载和开始', link: '/quick_guides/0_install_and_start'}
          ]
        },
      // 第二部分：注意事项
      {
        text: '2. 注意事项',
        link: '/notice',
      },
      
      // 第三部分：插件与命令
      {
        text: '3. 插件与命令',
        link: '/plugins/',
        collapsed: false,
        items: [
          { text: '3.1 - QuickShop - 箱子商店', link: '/plugins/quickshop' },
          { text: '3.2 - Home - 家系统', link: '/plugins/home' },
          { text: '3.3 - Teleport - 传送系统', link: '/plugins/teleport' },
          { text: '3.4 - Upgradeable Hoppers - 区块漏斗', link: '/plugins/upgradeable_hoppers' },
          { text: '3.5 - Lands - 领地系统', link: '/plugins/lands' },
          { text: '3.6 - Land War - 领地战争', link: '/plugins/land_war' },
          { text: '3.7 - Quality Crops - 星露谷作物', link: '/plugins/quality_crops' },
          { text: '3.8 - Stardew Fishing - 星露谷钓鱼', link: '/plugins/stardew_fishing' },
          { text: '3.9 - 交易指南', link: '/plugins/trade' }
        ]
      },
      
      // 第四部分：进阶指南
      {
        text: '4. 进阶',
        link: '/advance/',
        collapsed: true,
        items: [
          { text: '4.1 - 自定义唱片', link: '/advance/customize_disc' }
        ]
      }
    ],
    */
sidebar: {
      
      // 为 /plugins/ 路径配置侧边栏
      '/plugins/': [
        {
          text: '插件与命令',
          items: [
            { text: '章首简介', link: '/plugins/' },
            { text: '1 - QuickShop - 箱子商店', link: '/plugins/quickshop' },
            { text: '2 - Home - 家系统', link: '/plugins/home' },
            { text: '3 - Teleport - 传送系统', link: '/plugins/teleport' },
            { text: '4 - Upgradeable Hoppers - 区块漏斗', link: '/plugins/upgradeable_hoppers' },
            { text: '5 - Lands - 领地系统', link: '/plugins/lands' },
            { text: '6 - Land War - 领地战争', link: '/plugins/land_war' },
            { text: '7 - Quality Crops - 星露谷作物', link: '/plugins/quality_crops' },
            { text: '8 - Stardew Fishing - 星露谷钓鱼', link: '/plugins/stardew_fishing' }
          ]
        }
      ],
      
      // 为 /advance/ 路径配置侧边栏
      '/advance/': [
        {
          text: '进阶',
          items: [
            { text: '章首简介', link: '/advance/' },
            { text: '1 - 自定义唱片', link: '/advance/customize_disc' }
          ]
        }
      ],
      
      // 为根路径和其他页面配置侧边栏
      // 注意：这个配置会匹配所有不匹配上面特定路径的页面
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