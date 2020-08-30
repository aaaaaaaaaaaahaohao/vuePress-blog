module.exports = {
  title: 'my blog',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[],
    sidebar: [ 
      {
        title: '前端基础', children: []
      },
      {
        title: '微信小程序', children: ['/document/微信小程序/大数据setData性能优化']
      },
      {
        title: '有趣实践', children: ['/document/有趣实践/搭建个人博客']
      }
    ], // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};