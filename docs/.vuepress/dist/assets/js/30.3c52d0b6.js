(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{211:function(t,a,e){"use strict";e.r(a);var s=e(0),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content"},[t._m(0),t._v(" "),e("p"),t._m(1),e("p"),t._v(" "),t._m(2),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.im/post/5da444ab6fb9a04e054d93d8",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考地址"),e("OutboundLink")],1)]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),t._m(18),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),t._v(" "),t._m(22),t._v(" "),e("p",[t._v("相同：")]),t._v(" "),e("ul",[e("li",[t._v("都是用来描述页面的结构；")]),t._v(" "),e("li",[t._v("都由标签、属性等构成；\n不同：")]),t._v(" "),e("li",[t._v("标签名字不一样，且小程序标签更少，单一标签更多；")]),t._v(" "),e("li",[t._v("多了一些wx:if 这样的属性以及 "+t._s()+"这样的表达式")]),t._v(" "),e("li",[t._v("WXML仅能在微信小程序开发者工具中预览，而HTML可以在浏览器内预览；")]),t._v(" "),e("li",[t._v("组件封装不同， WXML对组件进行了重新封装，")]),t._v(" "),e("li",[t._v("小程序运行在JS Core内，没有DOM树和window对象，小程序中无法使用window对象和document对象。")])]),t._v(" "),t._m(23),t._v(" "),e("p",[t._v("基础事件（BaseEvent）")]),t._v(" "),t._m(24),t._v(" "),t._m(25),t._v(" "),t._m(26),t._v(" "),t._m(27),t._v(" "),t._m(28),t._v(" "),t._m(29),t._v(" "),e("p",[t._v("wx.setStorageSync是以Sync结尾的API为同步API，使用时使用try-catch来查看异常，如果判定API为异步，可以在其回调方法success、fail、complete中进行下一步操作。")]),t._v(" "),e("p",[t._v("同步：")]),t._v(" "),t._m(30),e("p",[t._v("异步：")]),t._v(" "),t._m(31),t._m(32),t._v(" "),t._m(33),t._v(" "),t._m(34),t._v(" "),t._m(35),t._v(" "),t._m(36),t._v(" "),e("p",[t._v("首先要引入最新版的jweixin-x.x.x.js，然后")]),t._v(" "),t._m(37),t._m(38),t._v(" "),e("p",[t._v("使用wx.getUserInfo方法withCredentials为 true时 可获取encryptedData，里面有union_id(中文直译：闹泥哦)。后端需要进行对称解密。")]),t._v(" "),t._m(39),t._v(" "),t._m(40),t._v(" "),t._m(41),t._v(" "),e("p",[t._v("HTTPS 请求（wx.request）、上传文件（wx.uploadFile）、下载文件（wx.downloadFile) 和 WebSocket 通信（wx.connectSocket）")]),t._v(" "),t._m(42),t._v(" "),e("p",[t._v("函数用于将数据从逻辑层发送到视图层（异步）\nthis.setData(Object data, Function callback)")]),t._v(" "),e("p",[t._v("参数说明：\ndata：传一个object，是这次要改变的数据\ncallback：传一个function，是setData引起的界面更新渲染完毕后的回调函数")])])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("h1",{attrs:{id:"小程序-面试准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小程序-面试准备"}},[this._v("#")]),this._v(" 小程序-面试准备")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#面试准备："}},[t._v("面试准备：")])]),e("li",[e("a",{attrs:{href:"#_1、小程序的生命周期函数"}},[t._v("1、小程序的生命周期函数")])]),e("li",[e("a",{attrs:{href:"#_2、简述小程序原理"}},[t._v("2、简述小程序原理")])]),e("li",[e("a",{attrs:{href:"#_3、微信小程序与vue区别"}},[t._v("3、微信小程序与vue区别")])]),e("li",[e("a",{attrs:{href:"#_4、哪些方法可以用来提高微信小程序的应用速度"}},[t._v("4、哪些方法可以用来提高微信小程序的应用速度")])]),e("li",[e("a",{attrs:{href:"#_5、微信小程序的优劣势"}},[t._v("5、微信小程序的优劣势")])]),e("li",[e("a",{attrs:{href:"#_6、怎么解决小程序的异步请求问题"}},[t._v("6、怎么解决小程序的异步请求问题")])]),e("li",[e("a",{attrs:{href:"#_7、如何实现下拉刷新"}},[t._v("7、如何实现下拉刷新")])]),e("li",[e("a",{attrs:{href:"#_8、bindtap和catchtap的区别是什么"}},[t._v("8、bindtap和catchtap的区别是什么")])]),e("li",[e("a",{attrs:{href:"#_9、小程序页面间有哪些传递数据的方法"}},[t._v("9、小程序页面间有哪些传递数据的方法")])]),e("li",[e("a",{attrs:{href:"#_10、小程序wxml与标准的html的异同？"}},[t._v("10、小程序wxml与标准的html的异同？")])]),e("li",[e("a",{attrs:{href:"#_11、小程序简单介绍下三种事件对象的属性列表？"}},[t._v("11、小程序简单介绍下三种事件对象的属性列表？")])]),e("li",[e("a",{attrs:{href:"#_12、小程序对wx-if-和-hidden使用的理解？"}},[t._v("12、小程序对wx:if 和 hidden使用的理解？")])]),e("li",[e("a",{attrs:{href:"#_13、app-json-是对当前小程序的全局配置，讲述三个配置各个项的含义？"}},[t._v("13、app.json 是对当前小程序的全局配置，讲述三个配置各个项的含义？")])]),e("li",[e("a",{attrs:{href:"#_14、小程序同步api和异步api使用时注意事项？"}},[t._v("14、小程序同步API和异步API使用时注意事项？")])]),e("li",[e("a",{attrs:{href:"#_15、页面跳转方式。简述下-wx-navigateto-wx-redirectto-wx-switchtab-wx-navigateback-wx-relaunch-的区别"}},[t._v("15、页面跳转方式。简述下 wx.navigateTo(), wx.redirectTo(), wx.switchTab(), wx.navigateBack(), wx.reLaunch()的区别")])]),e("li",[e("a",{attrs:{href:"#_16、如何封装微信小程序的数据请求的？"}},[t._v("16、如何封装微信小程序的数据请求的？")])]),e("li",[e("a",{attrs:{href:"#_17、webview中的页面怎么跳回小程序中？"}},[t._v("17、webview中的页面怎么跳回小程序中？")])]),e("li",[e("a",{attrs:{href:"#_18、小程序关联微信公众号如何确定用户的唯一性？"}},[t._v("18、小程序关联微信公众号如何确定用户的唯一性？")])]),e("li",[e("a",{attrs:{href:"#_19、微信小程序的优劣势？"}},[t._v("19、微信小程序的优劣势？")])]),e("li",[e("a",{attrs:{href:"#_20、常用的小程序请求接口的方式"}},[t._v("20、常用的小程序请求接口的方式")])]),e("li",[e("a",{attrs:{href:"#_21、小程序更新页面的值"}},[t._v("21、小程序更新页面的值")])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"面试准备："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#面试准备："}},[this._v("#")]),this._v(" 面试准备：")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_1、小程序的生命周期函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、小程序的生命周期函数"}},[this._v("#")]),this._v(" 1、小程序的生命周期函数")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("onLoad 页面加载时触发。一个页面只会调用一次，可以在onLoad 的参数中获取打开当前页面路径中的参数"),a("br"),this._v("\nonShow() 页面显示/切入前台时触发"),a("br"),this._v("\nonReady() 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互"),a("br"),this._v("\nonHide() 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等"),a("br"),this._v("\nonUnload() 页面卸载时触发。如 redirectTo 或 navigateBack 到其他页面时")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_2、简述小程序原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、简述小程序原理"}},[this._v("#")]),this._v(" 2、简述小程序原理")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("微信小程序采用 JavaScript、WXML、WXSS 三种技术进行开发,本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口"),a("br"),this._v("\n微信的架构，是数据驱动的架构模式，它的 UI 和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现"),a("br"),this._v("\n小程序分为两个部分 webview和 appService 。其中 webview 主要用来展现UI ，appService 有来处理业务逻辑、数据及接口调用。它们在两个进程中运行，通过系统层 JSBridge 实现通信，实现 UI 的渲染、事件的处理")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_3、微信小程序与vue区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、微信小程序与vue区别"}},[this._v("#")]),this._v(" 3、微信小程序与vue区别")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[t._v("生命周期不一样，微信小程序生命周期比较简单")]),t._v(" "),e("li",[t._v("数据绑定也不同，微信小程序数据绑定需要使用{{}}，vue 直接:就可以 显示与隐藏元素，vue中，使用 v-if和 v-show")]),t._v(" "),e("li",[t._v("控制元素的显示和隐藏，小程序中，使用wx-if和hidden 控制元素的显示和隐藏")]),t._v(" "),e("li",[t._v("事件处理不同，小程序中，全用 bindtap(bind+event)，或者 catchtap(catch+event)绑定事件,vue：使用v-on:event 绑定事件，或者使用@event绑定事件")]),t._v(" "),e("li",[t._v("数据双向绑定也不也不一样在 vue中,只需要再表单元素上加上 v-model,然后再绑定 data中对应的一个值，当表单元素内容发生变化时，data中对应的值也会相应改变，这是 vue非常 nice 的一点。微信小程序必须获取到表单元素，改变的值，然后再把值赋给一个 data中声明的变量")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_4、哪些方法可以用来提高微信小程序的应用速度"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、哪些方法可以用来提高微信小程序的应用速度"}},[this._v("#")]),this._v(" 4、哪些方法可以用来提高微信小程序的应用速度")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("1、提高页面加载速度"),a("br"),this._v("\n2、用户行为预测"),a("br"),this._v("\n3、减少默认 data 的大小"),a("br"),this._v("\n4、组件化方案")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_5、微信小程序的优劣势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、微信小程序的优劣势"}},[this._v("#")]),this._v(" 5、微信小程序的优劣势")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[t._v("优势\n"),e("ul",[e("li",[t._v("即用即走，不用安装，省流量，省安装时间，不占用桌面 依托微信流量，天生推广传播优势 开发成本比 App 低")])])]),t._v(" "),e("li",[t._v("缺点\n"),e("ul",[e("li",[t._v("用户留存，即用即走是优势，也存在一些问题 入口相对传统 App 要深很多 限制较多,页面大小不能超过2M。不能打开超过10个层级的页面。")])])]),t._v(" "),e("li",[t._v("建议页面层级不要超过5层，因为小程序适合做简单的、用完即走的应用。")]),t._v(" "),e("li",[t._v("可以分包加载，整个小程序所有分包大小不超过12M")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_6、怎么解决小程序的异步请求问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6、怎么解决小程序的异步请求问题"}},[this._v("#")]),this._v(" 6、怎么解决小程序的异步请求问题")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("小程序支持大部分 ES6 语法")]),this._v(" "),a("li",[this._v("在返回成功的回调里面处理逻辑Promise异步")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_7、如何实现下拉刷新"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7、如何实现下拉刷新"}},[this._v("#")]),this._v(" 7、如何实现下拉刷新")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("首先在全局 config 中(app.json)的 window配置 enablePullDownRefresh ，")]),this._v(" "),a("li",[this._v("在 Page 中定义onPullDownRefresh 钩子函数,到达下拉刷新条件后，该钩子函数执行，发起请求方法 请求返回后，")]),this._v(" "),a("li",[this._v("调用wx.stopPullDownRefresh停止下拉刷新")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_8、bindtap和catchtap的区别是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8、bindtap和catchtap的区别是什么"}},[this._v("#")]),this._v(" 8、bindtap和catchtap的区别是什么")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("事件绑定的写法同组件的属性，以 key、value 的形式。")]),this._v(" "),a("li",[this._v("相同点：首先他们都是作为点击事件函数，就是点击时触发。在这个作用上他们是一样的，可以不做区分")]),this._v(" "),a("li",[this._v("不同点：他们的不同点主要是bindtap是不会阻止冒泡事件的，catchtap是阻值冒泡的")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_9、小程序页面间有哪些传递数据的方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9、小程序页面间有哪些传递数据的方法"}},[this._v("#")]),this._v(" 9、小程序页面间有哪些传递数据的方法")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("1、使用全局变量实现数据传递。在 app.js 文件中定义全局变量 globalData， 将需要存储的信息存放在里面"),a("br"),this._v("\n2、使用 wx.navigateTo与 wx.redirectTo 的时候，可以将部分数据放在 url 里面，并在新页面onLoad的时候初始化"),a("br"),this._v("\n3、使用本地缓存Storage 相关")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[t._v("wx.setStorage 所有数据存储上限为10MB 用户主动删除或存储空间原因被系统处理")]),t._v(" "),e("li",[t._v("wx.removeStorage 从本地缓存中移除")]),t._v(" "),e("li",[t._v("wx.getStorageInfo 异步获取当前storage的相关信息")]),t._v(" "),e("li",[t._v("wx.getStorage  从本地缓存中异步获取指定 key 的内容")]),t._v(" "),e("li",[t._v("wx.clearStorage(Object object) 清理本地数据缓存")]),t._v(" "),e("li",[t._v("后面加Sync 的是同步版本。")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_10、小程序wxml与标准的html的异同？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10、小程序wxml与标准的html的异同？"}},[this._v("#")]),this._v(" 10、小程序wxml与标准的html的异同？")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_11、小程序简单介绍下三种事件对象的属性列表？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11、小程序简单介绍下三种事件对象的属性列表？"}},[this._v("#")]),this._v(" 11、小程序简单介绍下三种事件对象的属性列表？")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[t._v("type:事件类型")]),t._v(" "),e("li",[t._v("timeStamp：事件生成时的时间戳")]),t._v(" "),e("li",[t._v("target：触发事件的组件的属性值集合")]),t._v(" "),e("li",[t._v("currentTarget：当前组件的一些属性集合\n自定义事件（CustomEvent）")]),t._v(" "),e("li",[t._v("detail\n触摸事件（TouchEvent）")]),t._v(" "),e("li",[t._v("touches")]),t._v(" "),e("li",[t._v("changedTouches")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_12、小程序对wx-if-和-hidden使用的理解？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_12、小程序对wx-if-和-hidden使用的理解？"}},[this._v("#")]),this._v(" 12、小程序对wx:if 和 hidden使用的理解？")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[t._v("wx:if有更高的切换消耗。 同vue中的v-if")]),t._v(" "),e("li",[t._v("hidden 有更高的初始渲染消耗。 同vue中的v-show")]),t._v(" "),e("li",[t._v("因此，如果需要频繁切换的情景下，用 hidden 更好，如果在运行时条件不大可能改变则wx:if 较好。")]),t._v(" "),e("li",[t._v("v-if第一次为假时不渲染。通过局部编译动态向DOM中增加删除。")]),t._v(" "),e("li",[t._v("v-show 第一次会渲染，通过css的display：none 来控制元素显示隐藏。")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_13、app-json-是对当前小程序的全局配置，讲述三个配置各个项的含义？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_13、app-json-是对当前小程序的全局配置，讲述三个配置各个项的含义？"}},[this._v("#")]),this._v(" 13、app.json 是对当前小程序的全局配置，讲述三个配置各个项的含义？")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("pages字段  —— 用于描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。编译时显示第一个路径的页面。")]),this._v(" "),a("li",[this._v("window字段 —— 小程序所有页面的顶部背景颜色，文字颜色定义在这里的")]),this._v(" "),a("li",[this._v("tab字段—小程序全局顶部或底部tab")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_14、小程序同步api和异步api使用时注意事项？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_14、小程序同步api和异步api使用时注意事项？"}},[this._v("#")]),this._v(" 14、小程序同步API和异步API使用时注意事项？")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  wx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeStorageSync")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'key'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do something when catch error")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("wx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeStorage")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'key'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("success")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("res")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_15、页面跳转方式。简述下-wx-navigateto-wx-redirectto-wx-switchtab-wx-navigateback-wx-relaunch-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_15、页面跳转方式。简述下-wx-navigateto-wx-redirectto-wx-switchtab-wx-navigateback-wx-relaunch-的区别"}},[this._v("#")]),this._v(" 15、页面跳转方式。简述下 wx.navigateTo(), wx.redirectTo(), wx.switchTab(), wx.navigateBack(), wx.reLaunch()的区别")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[t._v("wx.navigateTo()：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面 "),e("code",[t._v('<navigator open-type="navigateTo"/>')])]),t._v(" "),e("li",[t._v("wx.redirectTo()：关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面"),e("code",[t._v('<navigator open-type="redirectTo"/>')])]),t._v(" "),e("li",[t._v("wx.switchTab()：跳转到 abBar 页面，并关闭其他所有非 tabBar 页面  "),e("code",[t._v('<navigator open-type="switchTab"/>')]),t._v("或用户切换 Tab")]),t._v(" "),e("li",[t._v("wx.navigateBack()：关闭当前页面，返回上一页面或多级页面。可通过getCurrentPages() 获取当前的页面栈，决定需要返回几层 "),e("code",[t._v('<navigator open-type="navigateBack"/>')]),t._v("或用户按左上角返回按钮")]),t._v(" "),e("li",[t._v("wx.reLaunch()：关闭所有页面，打开到应用内的某个页面 "),e("code",[t._v('<navigator open-type="reLaunch"/>')])]),t._v(" "),e("li",[t._v("replace、push、go")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_16、如何封装微信小程序的数据请求的？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_16、如何封装微信小程序的数据请求的？"}},[this._v("#")]),this._v(" 16、如何封装微信小程序的数据请求的？")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("1、将所有的接口放在统一的js文件中并导出。"),a("br"),this._v("\n2、在app.js中创建封装请求数据的方法。"),a("br"),this._v("\n3、在子页面中调用封装的方法请求数据。")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_17、webview中的页面怎么跳回小程序中？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_17、webview中的页面怎么跳回小程序中？"}},[this._v("#")]),this._v(" 17、webview中的页面怎么跳回小程序中？")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("wx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("miniProgram"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("navigateTo")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\nurl"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/pages/login/login'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$params'")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_18、小程序关联微信公众号如何确定用户的唯一性？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_18、小程序关联微信公众号如何确定用户的唯一性？"}},[this._v("#")]),this._v(" 18、小程序关联微信公众号如何确定用户的唯一性？")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_19、微信小程序的优劣势？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_19、微信小程序的优劣势？"}},[this._v("#")]),this._v(" 19、微信小程序的优劣势？")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[e("p",[t._v("优势："),e("br"),t._v("\n1、无需下载，通过搜索和扫一扫就可以打开。")]),t._v(" "),e("p",[t._v("2、良好的用户体验：打开速度快。")]),t._v(" "),e("p",[t._v("3、开发成本要比App要低。")]),t._v(" "),e("p",[t._v("4、安卓上可以添加到桌面，与原生App差不多。")]),t._v(" "),e("p",[t._v("5、为用户提供良好的安全保障。小程序的发布，微信拥有一套严格的审查流程，不能通过审查的小程序是无法发布到线上的。")])]),t._v(" "),e("li",[e("p",[t._v("劣势："),e("br"),t._v("\n1、限制较多。页面大小不能超过1M。不能打开超过5个层级的页面。")]),t._v(" "),e("p",[t._v("2、样式单一。小程序的部分组件已经是成型的了，样式不可以修改。例如：幻灯片、导航。")]),t._v(" "),e("p",[t._v("3、推广面窄，不能分享朋友圈，只能通过分享给朋友，附近小程序推广。其中附近小程序也受到微信的限制。")]),t._v(" "),e("p",[t._v("4、依托于微信，无法开发后台管理功能。")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_20、常用的小程序请求接口的方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_20、常用的小程序请求接口的方式"}},[this._v("#")]),this._v(" 20、常用的小程序请求接口的方式")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"_21、小程序更新页面的值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_21、小程序更新页面的值"}},[this._v("#")]),this._v(" 21、小程序更新页面的值")])}],!1,null,null,null);a.default=r.exports}}]);