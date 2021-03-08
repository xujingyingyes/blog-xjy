(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{323:function(t,v,a){"use strict";a.r(v);var _=a(0),s=Object(_.a)({},(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this,v=t.$createElement,a=t._self._c||v;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"网络协议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#网络协议"}},[t._v("#")]),t._v(" 网络协议")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2020/5/23/17240ccf5257ecd8?imageslim",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"tcp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp"}},[t._v("#")]),t._v(" TCP")]),t._v(" "),a("blockquote",[a("p",[t._v("传输控制协议（TCP，Transmission Control Protocol）是一种面向连接、可靠的、基于字节流的传输层通信协议，由 IETF 的 RFC 793 定义。")])]),t._v(" "),a("ul",[a("li",[t._v("基于流的设计")]),t._v(" "),a("li",[t._v("面向连接")]),t._v(" "),a("li",[t._v("丢包重传")]),t._v(" "),a("li",[t._v("保证数据顺序")])]),t._v(" "),a("h2",{attrs:{id:"udp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#udp"}},[t._v("#")]),t._v(" UDP")]),t._v(" "),a("blockquote",[a("p",[t._v("Internet 协议集支持一个无连接的传输协议，该协议称为用户数据报协议（UDP，User Datagram Protocol）。UDP 为应用程序提供了一种无需建立连接就可以发送封装的 IP 数据包的方法。RFC 768 描述了 UDP。")])]),t._v(" "),a("ul",[a("li",[t._v("UDP 是非连接协议，也就是不会和终端建立连接")]),t._v(" "),a("li",[t._v("UDP 包信息只有 8 个字节")]),t._v(" "),a("li",[t._v("UDP 是面向报文的。既不拆分，也不合并，而是保留这些报文的边界")]),t._v(" "),a("li",[t._v("UDP 可能丢包")]),t._v(" "),a("li",[t._v("UDP 不保证数据顺序")])]),t._v(" "),a("h2",{attrs:{id:"http"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[t._v("#")]),t._v(" HTTP")]),t._v(" "),a("ul",[a("li",[t._v("HTTP/0.9：GET，无状态的特点形成")]),t._v(" "),a("li",[t._v("HTTP/1.0：支持 POST，HEAD，添加了请求头和响应头，支持任何格式的文件发送，添加了状态码、多字符集支持、多部分发送、权限、缓存、内容编码等")]),t._v(" "),a("li",[t._v("HTTP/1.1：默认长连接，同时 6 个 TCP 连接，CDN 域名分片")]),t._v(" "),a("li",[t._v("HTTPS：HTTP + TLS（ "),a("strong",[t._v("非对称加密")]),t._v(" 与 "),a("strong",[t._v("对称加密")]),t._v(" ）\n"),a("ol",[a("li",[t._v("客户端发出 https 请求，请求服务端建立 SSL 连接")]),t._v(" "),a("li",[t._v("服务端收到 https 请求，申请或自制数字证书，得到公钥和服务端私钥，并将公钥发送给客户端")]),t._v(" "),a("li",[t._v("户端验证公钥，不通过验证则发出警告，通过验证则产生一个随机的客户端私钥")]),t._v(" "),a("li",[t._v("客户端将公钥与客户端私钥进行对称加密后传给服务端")]),t._v(" "),a("li",[t._v("服务端收到加密内容后，通过服务端私钥进行非对称解密，得到客户端私钥")]),t._v(" "),a("li",[t._v("服务端将客户端私钥和内容进行对称加密，并将加密内容发送给客户端")]),t._v(" "),a("li",[t._v("客户端收到加密内容后，通过客户端私钥进行对称解密，得到内容")])])]),t._v(" "),a("li",[t._v("HTTP/2.0：多路复用（一次 TCP 连接可以处理多个请求），服务器主动推送，stream 传输。")]),t._v(" "),a("li",[t._v("HTTP/3：基于 UDP 实现了 QUIC 协议\n"),a("ul",[a("li",[t._v("建立好 HTTP2 连接")]),t._v(" "),a("li",[t._v("发送 HTTP2 扩展帧")]),t._v(" "),a("li",[t._v("使用 QUIC 建立连接")]),t._v(" "),a("li",[t._v("如果成功就断开 HTTP2 连接")]),t._v(" "),a("li",[t._v("升级为 HTTP3 连接")])])])]),t._v(" "),a("p",[a("strong",[t._v("注：RTT = Round-trip time")])]),t._v(" "),a("h1",{attrs:{id:"tcp-与-udp-的区别和优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-与-udp-的区别和优缺点"}},[t._v("#")]),t._v(" TCP 与 UDP 的区别和优缺点")]),t._v(" "),a("h2",{attrs:{id:"tcp-与-udp-的总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-与-udp-的总结"}},[t._v("#")]),t._v(" TCP 与 UDP 的总结")]),t._v(" "),a("ol",[a("li",[t._v("TCP 面向连接；UDP 无连接，即发送数据前不需要建立连接；")]),t._v(" "),a("li",[t._v("TCP 提供可靠的数据传输，通过使用流量控制、序号、确认和定时器，TCP 确保正确的、按序的将数据从发送进程交付给接收进程；UDP 尽最大努力交付，即不保证可靠交付；")]),t._v(" "),a("li",[t._v("UDP 具有较好的实时性，工作效率比 TCP 高，适用于对高速传输和实施性比较高的通信或广播通信；")]),t._v(" "),a("li",[t._v("每一条 TCP 连接只能是点对点的；UDP 支持一对一、一对多、多对一和多对多的交互通信；")]),t._v(" "),a("li",[t._v("TCP 对系统资源要求较多，UDP 对系统资源要求较少。")])]),t._v(" "),a("h2",{attrs:{id:"udp-应用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#udp-应用场景"}},[t._v("#")]),t._v(" UDP 应用场景")]),t._v(" "),a("ol",[a("li",[t._v("面向数据报方式")]),t._v(" "),a("li",[t._v("网络数据大多为短消息")]),t._v(" "),a("li",[t._v("拥有大量的客户端")]),t._v(" "),a("li",[t._v("对数据安全性无特殊要求")]),t._v(" "),a("li",[t._v("网络负担非常重，但对响应速度要求高")])]),t._v(" "),a("h2",{attrs:{id:"tcp-如何提供可靠数据传输"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-如何提供可靠数据传输"}},[t._v("#")]),t._v(" TCP 如何提供可靠数据传输")]),t._v(" "),a("p",[t._v("通过流量控制、序号、确认和定时器，TCP 确保正确的、按序的将数据从发送进程交付给接收进程。")]),t._v(" "),a("h1",{attrs:{id:"tcp-发送方有三个与发送和重传相关的事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-发送方有三个与发送和重传相关的事件"}},[t._v("#")]),t._v(" TCP 发送方有三个与发送和重传相关的事件")]),t._v(" "),a("h2",{attrs:{id:"从上层应用程序接收数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从上层应用程序接收数据"}},[t._v("#")]),t._v(" 从上层应用程序接收数据")]),t._v(" "),a("p",[t._v("TCP 从上层应用程序接收数据，将数据封装在一个报文段中（含有第一个数据字节的流编号），然后交给 IP。")]),t._v(" "),a("h2",{attrs:{id:"定时器超时"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定时器超时"}},[t._v("#")]),t._v(" 定时器超时")]),t._v(" "),a("p",[t._v("超时后，TCP 重传超时报文，然后重启定时器。")]),t._v(" "),a("h2",{attrs:{id:"收到-ack"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#收到-ack"}},[t._v("#")]),t._v(" 收到 ACK")]),t._v(" "),a("p",[t._v("收到 ACK 后，将确认报文中确认号与发送方的 SendBase（最早未被确认的字节序号）比较。TCP 采取累积确认，所以确认号之前的字节都被接收方收到。")]),t._v(" "),a("p",[t._v("当确认号 > SendBase 时，则该 ACK 是在确认一个或多个先前未被确认的报文段，此时发送方更新 SendBase 值。")]),t._v(" "),a("p",[t._v("如果当有位被确认的报文段，TCP 重启定时器。")]),t._v(" "),a("h1",{attrs:{id:"tcp-协议在工作过程中的几种简单情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-协议在工作过程中的几种简单情况"}},[t._v("#")]),t._v(" TCP 协议在工作过程中的几种简单情况")]),t._v(" "),a("h2",{attrs:{id:"由于确认丢失而重传"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#由于确认丢失而重传"}},[t._v("#")]),t._v(" 由于确认丢失而重传")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2746191c92a49298daa6feedf48025b~tplv-k3u1fbpfcp-zoom-1.image?imageslim",alt:"img"}})]),t._v(" "),a("p",[t._v("如上图所示，B 发送给 A 的 ACK 丢失，引起了主机 A 的重传，B 在接收到重传数据报后根据序号得知这是重传报文，于是丢弃该报文，向 A 发送 ACK。")]),t._v(" "),a("h2",{attrs:{id:"连续发送的报文段-ack-延迟"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#连续发送的报文段-ack-延迟"}},[t._v("#")]),t._v(" 连续发送的报文段 ACK 延迟")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8100be1ee62c405f926e581d25dc012c~tplv-k3u1fbpfcp-zoom-1.image?imageslim",alt:"img"}})]),t._v(" "),a("p",[t._v("A 连续向 B 发送了两个报文段，但是它们的 ACK 都延迟了，导致定时器超时，于是最早的未被确认的报文段92被重传，接着它们的 ACK 到达，它们就不会被再次重传，A 收到确认后，就会将 SendBase 后移，并重启定时器。")]),t._v(" "),a("h2",{attrs:{id:"累积确认避免先前报文段重传"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#累积确认避免先前报文段重传"}},[t._v("#")]),t._v(" 累积确认避免先前报文段重传")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9df12afae9e44b08106a5fe018e3a20~tplv-k3u1fbpfcp-zoom-1.image?imageslim",alt:"img"}})]),t._v(" "),a("p",[t._v("A 还是向 B 连续发送两个报文段，但是第一个报文段的 ACK 丢失了，但是还在定时器超时之前，第二个报文段的 ACK 到达，因为 TCP 采取了累计确认，第二个报文段 ACK 到达，说明了第一个报文段是被正确接收了的，所以第一个报文段不会被重传。")]),t._v(" "),a("h1",{attrs:{id:"快速重传"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速重传"}},[t._v("#")]),t._v(" 快速重传")]),t._v(" "),a("p",[t._v("超时重传存在的问题之一是超时周期可能较长，当一个报文段丢失时，通过超时重传来恢复报文，就会增加端到端的时延。但是，可以通过检测收到冗余 ACK 来进行对丢失报文段的重传。至于为啥可以通过这样的方式来确信此报文段丢失的原因是：")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("接送方接到丢失报文段后的报文（也就是失序报文段）会将失序报文段缓存，并向发送方发送最近的未失序报文段的最大编号。")])]),t._v(" "),a("li",[a("p",[t._v("如果接收方连续接收多个失序报文，那么发送方将会受到对一个报文段的多个 ACK，由此发送方可知该 ACK 代表的报文段的后一个报文丢失了，于是，发送方重传丢失报文。")]),t._v(" "),a("p",[t._v("当发送方收到 3 个冗余的 ACK，就说明被确认过三次的报文段之后的那个报文段已经丢失，TCP 就执行快速重传，在丢失报文段定时器超时之前重传丢失报文段。")])])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5305e16117c4f9ca16a4d25b77182e6~tplv-k3u1fbpfcp-zoom-1.image?imageslim",alt:"img"}})]),t._v(" "),a("h1",{attrs:{id:"tcp-中是回退-n-步还是选择重传"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-中是回退-n-步还是选择重传"}},[t._v("#")]),t._v(" TCP 中是回退 N 步还是选择重传")]),t._v(" "),a("p",[t._v("根据前面对 TCP 描述，可以得知 TCP 确认是采用累积确认方式，并且对失序报文不会给出确认。这让 TCP 看起来像是一个 GBN 协议，但是与 GBN 不同的是，TCP 会缓存失序的分组。所以，TCP 提出的一种修改意见是选择确认（slective acknowledgment）[RFC 2018]，它允许 TCP 接收方有选择地确认失序报文段，而不是累积确认最后一个正确接收的有序报文段。当将该机制和选择重传机制结合起来使用时（即跳过重传那些已被接收方选择确认过的报文段），TCP 就像我们通常的SR协议。")]),t._v(" "),a("p",[t._v("因此，TCP 的差错恢复机制为GBN协议和SR协议的混合体。")]),t._v(" "),a("h1",{attrs:{id:"tcp-中流量控制与拥塞控制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-中流量控制与拥塞控制"}},[t._v("#")]),t._v(" TCP 中流量控制与拥塞控制")]),t._v(" "),a("p",[t._v("它们都是对发送方的遏制。")]),t._v(" "),a("h2",{attrs:{id:"流量控制（避免接收方缓存溢出问题）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#流量控制（避免接收方缓存溢出问题）"}},[t._v("#")]),t._v(" 流量控制（避免接收方缓存溢出问题）")]),t._v(" "),a("h3",{attrs:{id:"为什么要提供流量控制服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么要提供流量控制服务"}},[t._v("#")]),t._v(" 为什么要提供流量控制服务")]),t._v(" "),a("p",[t._v("简单地说，提供流控就是为了避免接收方缓存溢出问题。")]),t._v(" "),a("p",[t._v("接收方接收到数据后，会将其放入接收缓存中，待上层应用程序读取数据。但是上层应用可能忙于其他事务或者读取数据的速度比较慢，而发送方发送数据的太多，速率太快，此时就会导致接收方的缓存溢出。")]),t._v(" "),a("p",[t._v("流量控制也是一个速率匹配服务。")]),t._v(" "),a("h3",{attrs:{id:"tcp-如何提供流量控制服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp-如何提供流量控制服务"}},[t._v("#")]),t._v(" TCP 如何提供流量控制服务")]),t._v(" "),a("p",[t._v("这里为了从整体上看问题，我们假设，TCP接收方会丢弃失序的报文。")]),t._v(" "),a("p",[t._v("TCP让发送方A维护一个称为接收窗口（receive window）的变量来提供流量控制。这个窗口代表接收方B有多少可用的缓存空间")]),t._v(" "),a("p",[t._v("主机A和主机B之间建立TCP连接后，主机B为连接分配了一个接收缓存，用RcvBuffer表示")]),t._v(" "),a("p",[t._v("定义如下变量")]),t._v(" "),a("ul",[a("li",[t._v("LastByteRead：主机B的应用进程从缓存中取出的数据流最后一个字节的编号")]),t._v(" "),a("li",[t._v("LastByteRevd：主机B缓存的数据流的最后一个字节编号")])]),t._v(" "),a("p",[t._v("缓存不能溢出需满足 LastByteRevd - LastByteRead <= RevBuffer")]),t._v(" "),a("p",[t._v("接收窗口rwnd根据缓存可用空间设置：")]),t._v(" "),a("p",[t._v("rwnd = RevBuffer - [LastByteRevd-LastByteRead]")]),t._v(" "),a("p",[t._v("主机B通过把当前的rwnd放到它发送给主机A的报文段的接收窗口字段，已通知主机A当前它还有多少空间可用。 主机A始终跟踪两个LastByteSend和LastByteAcked，[LastByteSend-LastByteAcked]就是主机A中发送但未被确认的数据量。使这个值小于主机B的rwnd，就可以使主机B的缓存不会溢出。")]),t._v(" "),a("h2",{attrs:{id:"拥塞控制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拥塞控制"}},[t._v("#")]),t._v(" 拥塞控制")]),t._v(" "),a("p",[t._v("TCP 的发送方也可能会因为 IP 网络拥塞而被遏制，这种形式的控制被称为拥塞控制。")]),t._v(" "),a("p",[t._v("一般原理：发生拥塞控制的原因：资源（带宽、交换节点的缓存、处理机）的需求 > 可用资源")]),t._v(" "),a("h3",{attrs:{id:"拥塞的标志"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拥塞的标志"}},[t._v("#")]),t._v(" 拥塞的标志")]),t._v(" "),a("p",[t._v("重传计时器超时或接收到三个重复确认。")]),t._v(" "),a("h3",{attrs:{id:"慢启动与拥塞避免"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#慢启动与拥塞避免"}},[t._v("#")]),t._v(" 慢启动与拥塞避免")]),t._v(" "),a("ol",[a("li",[t._v("慢启动不是指cwnd（拥塞窗口）的增长速度慢（指数增长），而是指TCP开始发送设置cwnd=1。")]),t._v(" "),a("li",[t._v("思路：不要一开始就发送大量的数据，先探测一下网络的拥塞程度，也就是说由小到大逐渐增加拥塞窗口的大小。")]),t._v(" "),a("li",[t._v("为了防止cwnd增长过大引起网络拥塞，设置一个慢启动阈值\n"),a("ol",[a("li",[t._v("当 cnwd ＜ ssthresh，使用慢开始算法")]),t._v(" "),a("li",[t._v("当 cnwd = ssthresh，既可使用慢开始算法，也可以使用拥塞避免算法")]),t._v(" "),a("li",[t._v("当 cnwd ＞ ssthresh，使用拥塞避免算法")])])])]),t._v(" "),a("h3",{attrs:{id:"避免拥塞"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#避免拥塞"}},[t._v("#")]),t._v(" 避免拥塞")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("拥塞避免并非完全能够避免拥塞，是说在拥塞避免阶段将拥塞窗口控制为按线性规律增长，使网络比较不容易出现拥塞。")])]),t._v(" "),a("li",[a("p",[t._v("思路：让拥塞窗口cwnd缓慢地增大，即每经过一个往返时间RTT就把发送方的拥塞控制窗口加一。")]),t._v(" "),a("p",[t._v("无论是在慢开始阶段还是在拥塞避免阶段，只要发送方判断网络出现拥塞，就把慢开始门限设置为出现拥塞时的发送窗口大小的一半。然后把拥塞窗口设置为1，执行慢启动算法。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e80399f01de0483cbb7d33cfc014260f~tplv-k3u1fbpfcp-zoom-1.image?imageslim",alt:"img"}})])])]),t._v(" "),a("h3",{attrs:{id:"快重传与快恢复"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快重传与快恢复"}},[t._v("#")]),t._v(" 快重传与快恢复")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/283e82f189a8455facc330f34d1cb05b~tplv-k3u1fbpfcp-zoom-1.image?imageslim",alt:"img"}})]),t._v(" "),a("h4",{attrs:{id:"快重传"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快重传"}},[t._v("#")]),t._v(" 快重传")]),t._v(" "),a("ol",[a("li",[t._v("快重传要求接收方在收到一个失序的报文段后就立即发出重复确认（为的是使发送方及早知道有报文段没有到达对方）而不要等到自己发送数据时捎带确认。快重传算法规定，发送方只要一连收到三个重复确认就应当立即重传对方尚未收到的报文段，而不必继续等待设置的重传计时器时间到期。")]),t._v(" "),a("li",[t._v("由于不需要等待设置的重传计时器到期，能尽早重传未被确认的报文段，能提高整个网络的吞吐量。")])]),t._v(" "),a("h4",{attrs:{id:"快恢复（与快重传配合使用）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快恢复（与快重传配合使用）"}},[t._v("#")]),t._v(" 快恢复（与快重传配合使用）")]),t._v(" "),a("ol",[a("li",[t._v("采用快恢复算法时，慢启动只在TCP连接建立时和网络出现超时时才使用。")]),t._v(" "),a("li",[t._v("当发送方连续收到三个重复确认时，就执行“乘法减小”算法，把ssthresh门限减半。但是接下去并不执行慢启动算法。")]),t._v(" "),a("li",[t._v("考虑到如果网络出现拥塞的话就不会收到好几个重复的确认，所以发送方现在认为网络可能没有出现拥塞。所以此时不执行慢启动算法，而是将cwnd设置为ssthresh的大小，然后执行拥塞避免算法。")])]),t._v(" "),a("h3",{attrs:{id:"拥塞窗口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拥塞窗口"}},[t._v("#")]),t._v(" 拥塞窗口")]),t._v(" "),a("p",[t._v("发送方为一个动态变化的窗口叫做拥塞窗口，拥塞窗口的大小取决于网络的拥塞程度。发送方让自己的发送窗口=拥塞窗口，但是发送窗口不是一直等于拥塞窗口的，在网络情况好的时候，拥塞窗口不断的增加，发送方的窗口自然也随着增加，但是接受方的接受能力有限，在发送方的窗口达到某个大小时就不在发生变化了。")]),t._v(" "),a("h2",{attrs:{id:"拥塞控制和流量控制的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拥塞控制和流量控制的区别"}},[t._v("#")]),t._v(" 拥塞控制和流量控制的区别")]),t._v(" "),a("p",[t._v("拥塞控制是防止过多的数据注入到网络中，可以使网络中的路由器或链路不致过载，是一个全局性的过程。 流量控制是点对点通信量的控制，是一个端到端的问题，主要就是抑制发送端发送数据的速率，以便接收端来得及接收。")])])}],!1,null,null,null);v.default=s.exports}}]);