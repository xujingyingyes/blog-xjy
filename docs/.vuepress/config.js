module.exports = {
    title: "前端仙女徐",
    description: "徐静莹同学的个人博客",
    head: [
        ['link', {
            rel: 'icon',
            href: '/logo.ico'
        }]
    ],
    themeConfig: {
        editLinkText: "编辑此页",
        lastUpdated: "上次更新",
        sidebarDepth: 2,
        nav: [{
                text: '首页',
                link: '/'
            }, // text：显示在导航栏上的文字；link：链接；items：二级菜单；
            {
                text: '文章',
                items: [ // items 可以嵌套多级
                    {
                        text: '前端',
                        link: '/QDSkill/'
                    },
                    {
                        text: '框架',
                        link: '/frame/'
                    },
                    {
                        text: '前后端通信',
                        link: '/frontEndCommunication/'
                    },
                    {
                        text: '性能优化',
                        link: '/performanceOptimization/'
                    }
                ]
            },
            {
                text: '每日三道题',
                link: '/dayThreeCode/'
            },
            {
                text: '面经',
                link: '/faceStorage/'
            },
            {
                text: '算法',
                link: '/algorithm/'
            },
        ],
        sidebar: { // 侧边栏
            // 前端
            '/QDSkill/': [{
                title: "前端技能",
                children: [
                    "vue",
                    "react",
                    "typescript",
                    "webpack",
                    "webpack-sg",
                    "html和css3",
                    "viewskills",
                    "vueSource",
                    "reactSource",
                    "js/前端设计模式",
                    "js/js基础",
                    "js/jsWebAPI",
                    "js/模块化",
                    "js/运行环境",
                    "js/es6",
                    "js/深入闭包",
                    "js/zepto源码解读",
                    "js/JS高级",
                    "js/微前端",
                ]
            }],
            // 框架
            '/frame/': [{
                title: "框架学习记录",
                children: [
                    "egg",
                    "小程序",
                    "TypeScript 的优点",
                    "Virtual DOM",
                    "Vue和React的区别",
                    "AST"
                ]
            }],
            // 前后端通信
            '/frontEndCommunication/': [{
                title: "前后端通信",
                children: [
                    'nginx',
                    'HTTPS的握手过程',
                    'HTTPS',
                    'HTTP版本',
                    'HTTP状态码',
                    'HTTP相关',
                    'HTTP报文',
                    'DNS服务器',
                    'Cookie的SameSite属性',
                    'CDN加速原理',
                    '网络协议',
                    '网络传输过程',
                    '三次握手四次挥手',
                    '前后端鉴权',
                    '零距离接触websocket',
                    '跨域',
                    '对称加密和非对称加密'
                ]
            }],
            // 性能优化
            '/performanceOptimization/': [{
                title: '性能优化',
                children: [
                    '聊聊如何搭建高性能网站',
                    '浏览器缓存',
                    '性能优化',
                    '异步加载',
                    'React性能优化',
                    'Web图片优化',
                    'webpack 性能优化'
                ]
            }],
            // 每天三道题
            '/dayThreeCode/': [
                "05-13",
            ],
            // 面经
            '/faceStorage/': [{
                title: "面经",
                children: [
                    "2020年4月份面经",
                    "小程序面试准备"
                ]
            }],
            // 算法
            '/algorithm/': [{
                title: "算法",
                children: [
                    "算法前置",
                    "并查集",
                    "动态规划",
                    "二叉树",
                    "二分法",
                    "复杂度",
                    "哈希表",
                    "回溯算法",
                    "矩阵",
                    "链表",
                    "排序算法",
                    "双指针",
                    "贪心算法",
                    "栈和队列",
                    "字符串",
                    "刷题套路/第零章、必读系列/动态规划题解套路框架",
                    "刷题套路/第零章、必读系列/回溯算法解题套路框架",
                    "刷题套路/第零章、必读系列/教你几招算法笔试题的套路",
                    "刷题套路/第零章、必读系列/经典动态规划：子集背包问题",
                    "刷题套路/第零章、必读系列/学习算法和刷题的框架思维",
                    "刷题套路/第零章、必读系列/一个方法团灭股票买卖问题",
                    "刷题套路/第零章、必读系列/一首诗让你把滑动窗口算法变成默写题",
                    "刷题套路/第零章、必读系列/一首诗让你闭着眼睛也能写对二分搜索",
                    "刷题套路/第零章、必读系列/BFS算法解题套路框架",
                    "刷题套路/动态规划系列/动态规划答疑篇",
                    "刷题套路/动态规划系列/动态规划设计：最大子数组",
                    "刷题套路/动态规划系列/动态规划设计：最长递增子序列",
                    "刷题套路/动态规划系列/动态规划题解套路框架",
                    "刷题套路/动态规划系列/状态压缩：对动态规划进行降维打击",
                    "刷题套路/数据结构系列/二叉树的序列化与反序列化",
                    "刷题套路/数据结构系列/手把手带你刷二叉树（一期）",
                    "刷题套路/数据结构系列/手把手带你刷二叉树（二期）",
                    "刷题套路/数据结构系列/手把手带你刷二叉树（三期）",
                ]
            }]
        }
    }
}