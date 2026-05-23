---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "大熊猫服务器文档 v2"
  text: "教程、指南与更多"
  tagline: <mark>Java Edition 1.21.11</mark> / 服务器始于2019 / Q276051457
  actions:
    - theme: brand
      text: ⚡️【新手必看】安装和开始
      link: /main/install_and_start
    - theme: alt
      text: 插件与命令教程
      link: /main/plugins/
    - theme: alt
      text: 进阶
      link: /main/advance/

features:
  - icon: ℹ️
    title: 关于服务器
    details: 使用Purpur插件服核心的高版本生存服，适合养老、唠嗑。点击此卡片查看详情。
    link: /other/about
  - icon: 👬
    title: 氛围友好
    details: 服务器没有熊孩子，氛围友好。我们支持玩家互帮互助、建立群体（领土、国家）
  - icon: 🎮
    title: 娱乐性
    details: 精心设计的额外内容，在不改变原版内容的前提下，进一步提升娱乐性
  - icon: 👤 
    title: 支持非正版玩家
    details: 我们关闭了在线验证，这样就算你使用第三方（如LittleSkin）或离线账号也可以登陆服务器。点击此卡片查看详情。
    link: /other/types_of_accounts
  - icon: ⚖️
    title: 保障玩家权利
    details: 账号被盗、他人恶意行为、物品纠纷、领地纠纷、玩家冲突均可直接在群里反应。群友们会发力的。点击此卡片查看详情。
    link: /main/notice

---

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem; padding: 10rem 0;">
  <ServerStatus />
  <LiquidGlass text="服务器相册" link="/other/albums" />
</div>