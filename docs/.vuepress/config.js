module.exports = {
	title:"前端仙女徐",
  description:"徐静莹同学的个人博客",
	head:[
		['link',{rel:'icon',href:'/logo.ico'}]
    ],
  themeConfig: {
    editLinkText: "编辑此页",
    lastUpdated: "上次更新",
    sidebarDepth: 2,
    nav: [
      { 
        text: '首页', 
        link: '/' 
      }, // text：显示在导航栏上的文字；link：链接；items：二级菜单；
      { 
        text: '文章', 
        items:[ // items 可以嵌套多级
          { text: '前端' , link:'/QDSkill/'},
          { text: '框架' , link:'/frame/'},
        ]
      },
      { text: '每日三道题', link: '/dayThreeCode/' },
      { text: '面经', link: '/faceStorage/' },
    ],
    sidebar: { // 侧边栏
      // 前端
      '/QDSkill/': [{
        title: "QDSkill",
        children: [
          "vue",
          "react",
          "typescript",
          "webpack",
          "webpack-sg",
          "html和css3",
          "viewskills",
          "vueSource",
          "reactSource"
        ]
      }],
      // 框架
      '/frame/': [{
        title: "frame",
        children: [
          "egg",
          "小程序"
        ]
      }],
      // 每天三道题
      '/dayThreeCode/': [
        "05-13",
      ],
      // 面经
      '/faceStorage/': [
        {
          title: "faceStorage",
          children: [
            "2020年4月份面经",
            "小程序面试准备"
          ]
        }
      ]
    }
  }
}