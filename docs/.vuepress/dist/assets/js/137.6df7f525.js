(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{319:function(t,_,v){"use strict";v.r(_);var a=v(0),s=Object(a.a)({},(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("div",{staticClass:"content"},[v("h1",{attrs:{id:"三次握手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三次握手"}},[t._v("#")]),t._v(" 三次握手")]),t._v(" "),v("ol",[v("li",[t._v("客户端发起请求，并将自己的状态设置为待连接状态；")]),t._v(" "),v("li",[t._v("服务端接收到请求，并返回响应，同时也将自己的状态设置为待连接状态；")]),t._v(" "),v("li",[t._v("客户端接收到响应之后，发出信息告诉服务端自己已经接收到请求，同时将自己的状态设置为已连接；")]),t._v(" "),v("li",[t._v("服务端接收到信息后，将自己的状态设置为已连接；")]),t._v(" "),v("li",[t._v("客户端和服务端可以正式开始通信。")])]),t._v(" "),v("h1",{attrs:{id:"四次挥手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#四次挥手"}},[t._v("#")]),t._v(" 四次挥手")]),t._v(" "),v("ol",[v("li",[t._v("客户端发送请求，通知服务端将要断开连接，同时将自己的状态设置为待断开状态；")]),t._v(" "),v("li",[t._v("服务器接收到请求之后，通知客户端，当前可能还有响应没有发送完；")]),t._v(" "),v("li",[t._v("服务端发送完所有响应之后，通知客户端所有响应均已发送，可以断开连接，同时将自己状态设置为待断开状态；")]),t._v(" "),v("li",[t._v("客户端接收到通知后，将自己的状态设置为断开状态，同时通知服务端自己已经断开；")]),t._v(" "),v("li",[t._v("服务端接收到通知后，也将自己的状态设置为断开状态；")]),t._v(" "),v("li",[t._v("服务端和客户端通信正式断开。")])]),t._v(" "),v("h1",{attrs:{id:"为什么建立连接是三次握手，关闭连接是四次挥手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#为什么建立连接是三次握手，关闭连接是四次挥手"}},[t._v("#")]),t._v(" 为什么建立连接是三次握手，关闭连接是四次挥手")]),t._v(" "),v("h2",{attrs:{id:"建立连接"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#建立连接"}},[t._v("#")]),t._v(" 建立连接")]),t._v(" "),v("p",[t._v("为了实现可靠数据传输，TCP 协议的通信双方都必须维护一个序列号，以标志发送出去的数据包中，哪些是已经被对方收到的。三次握手的过程即是通信双方相互告知序列号起始值，并确认对方已经收到了序列号起始值的必经步骤。")]),t._v(" "),v("p",[t._v("如果只是两次握手，至多只有连接发起方的起始序列号能被确认，另一方选择的序列号则得不到确认，防止已失效的连接请求报文发送到服务端引发错误。")]),t._v(" "),v("h2",{attrs:{id:"关闭连接"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#关闭连接"}},[t._v("#")]),t._v(" 关闭连接")]),t._v(" "),v("p",[t._v("关闭连接时，服务方收到对方的关闭请求时，仅仅表示对方不再发送数据了，但是仍然能够接收数据，而自己也未必全部数据都发送给对方了，所以己方可以立即关闭，也可以发送一些数据给对方后关闭。")]),t._v(" "),v("p",[t._v("所以之所以是四次挥手而不是三次挥手，则是需要确保数据能够完全完成传输。")])])}],!1,null,null,null);_.default=s.exports}}]);