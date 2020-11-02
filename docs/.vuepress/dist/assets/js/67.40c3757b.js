(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{245:function(e,t,v){"use strict";v.r(t);var _=v(0),a=Object(_.a)({},(function(){var e=this.$createElement;this._self._c;return this._m(0)}),[function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("div",{staticClass:"content"},[v("h1",{attrs:{id:"从原理上说"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#从原理上说"}},[e._v("#")]),e._v(" 从原理上说")]),e._v(" "),v("p",[e._v("Vue 的数据绑定依赖数据劫持 "),v("code",[e._v("Object.defineProperty()")]),e._v(" 中的 "),v("code",[e._v("getter")]),e._v(" 和 "),v("code",[e._v("setter")]),e._v("，更新视图使用的是 "),v("strong",[e._v("发布订阅模式（eventEmitter）")]),e._v(" 来监听值的变化，从而让 "),v("code",[e._v("virtual DOM")]),e._v(" 驱动 Model 和 View 的更新，利用 "),v("code",[e._v("v-model")]),e._v(" 这一语法糖能够轻易实现双向的数据绑定，这种模式被称为 "),v("code",[e._v("MVVM: M <=> VM <=> V")]),e._v("，但本质上还是 "),v("code",[e._v("State -> View -> Actions")]),e._v(" 的单向数据流，只是使用了 "),v("code",[e._v("v-model")]),e._v(" 不需要显式地编写 "),v("code",[e._v("View")]),e._v(" 到 "),v("code",[e._v("Model")]),e._v(" 的更新。")]),e._v(" "),v("p",[e._v("React 则需要依赖 "),v("code",[e._v("onChange/setState")]),e._v(" 模式来实现数据的双向绑定，因为它在诞生之初就是设计成单向数据流的。")]),e._v(" "),v("h1",{attrs:{id:"组件通信的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#组件通信的区别"}},[e._v("#")]),e._v(" 组件通信的区别")]),e._v(" "),v("p",[e._v("父子之间都可以通过 "),v("code",[e._v("props")]),e._v(" 绑定 "),v("code",[e._v("data")]),e._v(" 或 "),v("code",[e._v("state")]),e._v(" 进行传值，又或者通过绑定回调函数来传值。")]),e._v(" "),v("p",[e._v("兄弟之间都可以通过 "),v("strong",[e._v("发布订阅模式")]),e._v(" 来写一个 "),v("strong",[e._v("EventBus")]),e._v(" 来监听值的变化。")]),e._v(" "),v("p",[e._v("跨层级：React 可以通过 "),v("code",[e._v("React.context")]),e._v(" 来进行跨层级通信；Vue 则可以使用 "),v("code",[e._v("provide/inject")]),e._v(" 来实现跨层级注入数据。")]),e._v(" "),v("h1",{attrs:{id:"模版渲染方式的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#模版渲染方式的区别"}},[e._v("#")]),e._v(" 模版渲染方式的区别")]),e._v(" "),v("p",[e._v("React 在 JSX 中使用原生的 JS 语法来实现插值，条件渲染，循环等。")]),e._v(" "),v("p",[e._v("Vue 则需要依赖指令进行，更容易上手，但封装程度更高，调试成本更大，难以定位 Bug。")]),e._v(" "),v("h1",{attrs:{id:"性能差异"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#性能差异"}},[e._v("#")]),e._v(" 性能差异")]),e._v(" "),v("p",[e._v("在 React 中组件的更新渲染是从数据发生变化的根组件开始往子组件逐层渲染，而组件的生命周期中有 "),v("code",[e._v("shouldComponentUpdate")]),e._v(" 这一钩子函数可以给开发者优化组件在不需要更新的时候不要更新。")]),e._v(" "),v("p",[e._v("Vue 通过 watcher 监听到数据的变化之后，通过自己的 diff 算法，在 virtualDOM 中直接以最低成本更新视图。")])])}],!1,null,null,null);t.default=a.exports}}]);