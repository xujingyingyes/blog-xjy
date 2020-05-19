# html5和css3的新特性
[[toc]]

## html5的新特性

### 1、语义化元素
|  标签   | 描述  |
|  ----  | ----  |
| header  | 定义文档的头部区域 |
| footer  | 定义文档的尾部区域 |
| nav  | 导航 |
| section  | 定义文档中的节(section、区段) |
| article  | 定义页面独立的内容区域 |
| aside  | 定义页面的侧边栏内容 |
| detailes  | 用于描述文档或文档某个部分的细节 |
| summary  | 标签包含details元素的标题 |
| dialog  | 定义对话框，比如提示框 |


 块级元素以及行内元素：
![alt 属性文本](https://user-gold-cdn.xitu.io/2019/11/10/16e533ddb4e65252?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)  

### 2、input输入类型，这些特性提供了更好的输入控制和验证：

|  input的描述   | 描述  |
|  ----  | ----  |
| color  | 主要用于选颜色 |
| date  | 从一个日期选择器选择一个日期 |
| datetime  | 选择一个日期(UTC时间) |
| email  | 包含e-mail地址的输入域 |
| month  | 选择一个月份 |
| number  | 数值的输入域 |
| range  | 一定范围内数字值的输入区域 |
| search  | 用于搜索域 |
| tel  | 定义输入电话号码字段 |
| time  | 选择一个时间 |
| url  | url地址的输入域 |
| week  | 选择周和年 |  

### 3、新增表单元素

|  表单元素   | 描述  |
|  ----  | ----  |
| datalist  | 元素规定输入域的选项列表，使用 `input` 元素的 list 属性与 `datalist`元素的 id 绑定 |
| keygen  | 提供一种验证用户的可靠方法，标签规定用于表单的密钥对生成器字段。 |
| output  | 用于不同类型的输出，比如计算或脚本输出 |   

### 4、HTML5 新增的表单属性

 * placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
 * required 属性，是一个 boolean 属性。要求填写的输入域不能为空
 * pattern 属性，描述了一个正则表达式用于验证`input` 元素的值。
 * min 和 max 属性，设置元素最小值与最大值。
 * step 属性，为输入域规定合法的数字间隔。
 * height 和 width 属性，用于 image 类型的 `input` 标签的图像高度和宽度。
 * autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。
 * multiple 属性 ，是一个 boolean 属性。规定`input` 元素中可选择多个值。

### 5、视频和音频

HTML5 提供了播放音频文件的标准，即使用 `audio` 元素。

```js
    <audio controls>
        <source src="horse.ogg" type="audio/ogg">
        <source src="horse.mp3" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
    </audio> 
    // control 属性供添加播放、暂停和音量控件。
    // 在<audio> 与 </audio> 之间你需要插入浏览器不支持的<audio>元素的提示文本 。
    //<audio> 元素允许使用多个 <source> 元素. <source> 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件　
    //目前, <audio>元素支持三种音频格式文件: MP3, Wav, 和 Ogg
```

HTML5 规定了一种通过 `video`元素来包含视频的标准方法。

```js
    <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        您的浏览器不支持Video标签。
    </video>
    // control 提供了 播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法。
    // video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。与 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。
    // video 元素支持多个source 元素. 元素可以链接不同的视频文件。
    // 浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）
```

### 6、Canvas绘图

> 标签只是图形容器，必须使用脚本来绘制图形。

* 创建一个画布，一个画布在网页中是一个矩形框，通过 `canvas` 元素来绘制。
    默认情况下 元素没有边框和内容。

```js
    <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
    </canvas>　　
```

* 标签通常需要指定一个id属性 (脚本中经常引用), width 和 height 属性定义的画布的大小，使用 style 属性来添加边框。你可以在HTML页面中使用多个 `canvas` 元素使用Javascript来绘制图像，canvas 元素本身是没有绘图能力的。  
所有的绘制工作必须在 JavaScript 内部完成

```js 
    <script>　　
        var c=document.getElementById("myCanvas");　　
        var ctx=c.getContext("2d");　　
        ctx.fillStyle="#FF0000";　　
        ctx.fillRect(0,0,150,75);
    </script>　　
```

`getContext("2d")`对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。  
设置 `fillStyle` 属性可以是CSS颜色，渐变，或图案。  
fillStyle默认设置是#000000（黑色）。  
`fillRect(x,y,width,height)` 方法定义了矩形当前的填充方式。  
意思是：在画布上绘制 150x75 的矩形，从左上角开始 (0,0)。  

Canvas - 路径  

在Canvas上画线，我们将使用以下两种方法：  
`moveTo(x,y)` 定义线条开始坐标  
`lineTo(x,y)` 定义线条结束坐标  
绘制线条我们必须使用到 "ink" 的方法，就像stroke()  

```js 
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();
```

定义开始坐标(0,0), 和结束坐标 (200,100). 然后使用 stroke() 方法来绘制线条  

Canvas - 文本

使用 canvas 绘制文本，重要的属性和方法如下：  　　

```js
    // font - 定义字体　　
    // fillText(text,x,y) - 在 canvas 上绘制实心的文本　　
    // strokeText(text,x,y) - 在 canvas 上绘制空心的文本 

    // 使用 fillText():
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");ctx.font="30px Arial";
    ctx.fillText("Hello World",10,50);
```
使用 "Arial" 字体在画布上绘制一个高 30px 的文字（实心）  

Canvas - 渐变  

渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色。  
以下有两种不同的方式来设置Canvas渐变：  
` createLinearGradient(x,y,x1,y1) - 创建线条渐变 `  
`createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变 `  
当我们使用渐变对象，必须使用两种或两种以上的停止颜色。  
` addColorStop() `方法指定颜色停止，参数使用坐标来描述，可以是0至1.  
    
```js
    // 使用渐变，设置fillStyle或strokeStyle的值为渐变，然后绘制形状，如矩形，文本，或一条线。
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    // Create gradient
    var grd=ctx.createLinearGradient(0,0,200,0);
    grd.addColorStop(0,"red");
    grd.addColorStop(1,"white");
    // Fill with gradientctx.fillStyle=grd;
    ctx.fillRect(10,10,150,80);复制代码　　创建了一个线性渐变，使用渐变填充矩形
```
  
Canvas - 图像

```js
    // 把一幅图像放置到画布上, 使用 drawImage(image,x,y) 方法
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("scream");
    ctx.drawImage(img,10,10); 
```  

把一幅图像放置到了画布上.

### 7、SVG绘图

* SVG是指`可伸缩`的`矢量`图形
* SVG 与 Canvas两者间的区别:
* SVG 是一种`使用 XML 描述 2D 图形的语言`。
* Canvas 通过` JavaScript 来绘制 2D 图形`。
* SVG 基于 XML，这意味着 SVG DOM 中的`每个元素都是可用的`。您可以为某个元素附加 JavaScript 事件处理器。
* 在 SVG 中，`每个被绘制的图形`均被视为`对象`。如果 SVG 对象的属性`发生变化`，那么浏览器能够自动`重现图形`。
* Canvas 是`逐像素`进行渲染的。在 canvas 中，一旦图形被绘制完成，它就`不会继续得到浏览器的关注`。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

### 8、地理定位

> HTML5 Geolocation（地理定位）用于定位用户的位置。

```js
    window.navigator.geolocation {
        getCurrentPosition:  fn  //  用于获取当前的位置数据
        watchPosition: fn  // 监视用户位置的改变
        clearWatch: fn   // 清除定位监视
    }　　　
```
　　获取用户定位信息：

```js
    navigator.geolocation.getCurrentPosition(    
        function(pos){
            console.log('用户定位数据获取成功')　　　　
            console.log(arguments);　　　　
            console.log('定位时间：',pos.timestamp)　　　　
            console.log('经度：',pos.coords.longitude)　　　　
            console.log('纬度：',pos.coords.latitude)　　　　
            console.log('海拔：',pos.coords.altitude)　　　　
            console.log('速度：',pos.coords.speed)
        },   
        //定位成功的回调function(err){ console.log('用户定位数据获取失败') }　　
        //console.log(arguments);
    }        
    //定位失败的回调
```

### 9、拖放API

>拖放是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。  
拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。  
* 拖放的源对象(可能发生移动的)可以触发的事件——3个： 
    `dragstart`：拖动开始  
    `drag`：拖动中  
    `dragend`：拖动结束  
    整个拖动过程的组成： `dragstart*1 + drag*n + dragend*1`
* 拖放的目标对象(不会发生移动)可以触发的事件——4个：  
    `dragenter`：拖动着进入  
    `dragover`：拖动着悬停  
    `dragleave`：拖动着离开  
    `drop`：释放  
    整个拖动过程的组成1： `dragenter*1 + dragover*n + dragleave*1`  
    整个拖动过程的组成2： `dragenter*1 + dragover*n + drop*1`  
    `dataTransfer`：用于数据传递的“拖拉机”对象；  
    在拖动源对象事件中使用`e.dataTransfer`属性`保存`数据：  
    `e.dataTransfer.setData( k, v )`  
    在拖动目标对象事件中使用`e.dataTransfer`属性`读取`数据：  
    `var value = e.dataTransfer.getData( k )`  

### 10、WebWorker　

> 当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成.  　
    web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。  

首先检测浏览器是否支持 

```js
    Web Workerif(typeof(Worker)!=="undefined"){
        // 是的! Web worker 支持!
        // 一些代码.....
    }else{
        // //抱歉! Web Worker 不支持
    }
```

下面的代码检测是否存在 worker，如果不存在，- 它会创建一个新的 web worker 对象，然后运行 "demo_workers.js" 中的代码

```js
    if(typeof(w)=="undefined"){w=new Worker("demo_workers.js");}
```

然后我们就可以从 web worker 发送和接收消息了。向 web worker 添加一个 "onmessage" 事件监听器：

```js 
    w.onmessage=function(event){document.getElementById("result").innerHTML=event.data;};
```

当 web worker 传递消息时，会执行事件监听器中的代码。event.data 中存有来自 event.data 的数据。当我们创建 web worker 对象后，它会继续监听消息（即使在外部脚本完成之后）直到其被终止为止。
如需终止 web worker，并释放浏览器/计算机资源，使用 terminate() 方法。  
   　
* 完整的 Web Worker 实例代码
```js
    <!DOCTYPE html>
    <html>
    <body>
        <p>Count numbers: <output id="result"></output></p>
        <button onclick="startWorker()">Start Worker</button> 
        <button onclick="stopWorker()">Stop Worker</button>
        <br><br>
    <script>
        var w;
        function startWorker () {
            if (typeof(Worker) !== "undefined") {
                if (typeof(w) == "undefined") {
                    w = new Worker("demo_workers.js");
                }
                w.onmessage = function (event) {
                    document.getElementById("result").innerHTML = event.data;
                };
            } else {
                document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";
            }
        }
        function stopWorker() { 
            w.terminate();
        }
    </script>
    </body>
    </html>
```
　　创建的计数脚本，该脚本存储于 "demo_workers.js" 文件中
```js 
    var i=0;
    function timedCount() {
        i=i+1;
        postMessage(i);
        setTimeout("timedCount()",500);
    }
    timedCount(); 
```
### 11、WebStorage　

> 使用HTML5可以在本地存储用户的浏览数据。早些时候,本地存储使用的是cookies。但是Web 存储需要更加的安全与快速. 这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能。数据以 键/值 对存在, web网页的数据只允许该网页访问使用。  

客户端存储数据的两个对象为：
* localStorage - 没有时间限制的数据存储
* sessionStorage - 针对一个 session 的数据存储, 当用户关闭浏览器窗口后，数据会被删除。　　
    在使用 web 存储前,应检查浏览器是否支持 localStorage 和sessionStorage
```js
    if(typeof(Storage)!=="undefined") {
        // 是的! 支持 localStorage  sessionStorage 对象!
        // 一些代码.....
    } else {
        // 抱歉! 不支持 web 存储。
    }
```
不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：
* 保存数据：localStorage.setItem(key,value);
* 读取数据：localStorage.getItem(key);
* 删除单个数据：localStorage.removeItem(key);
* 删除所有数据：localStorage.clear();
* 得到某个索引的key：localStorage.key(index);

### 12、WebSocket　

WebSocket是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。
```js
    <!DOCTYPE HTML>
    <html>
    <head>
    <meta charset="utf-8">
    <title>W3Cschool教程(w3cschool.cn)</title>
        <script type="text/javascript">
            function WebSocketTest() {
                if ("WebSocket" in window) {
                    alert("您的浏览器支持 WebSocket!");
                    // 打开一个 web socket
                    var ws = new WebSocket("ws://localhost:9998/echo");
                    ws.onopen = function() {
                        // Web Socket 已连接上，使用 send() 方法发送数据
                        ws.send("发送数据");
                        alert("数据发送中...");
                    };
                    ws.onmessage = function (evt) { 
                        var received_msg = evt.data;
                        alert("数据已接收...");
                    };
                    ws.onclose = function(){ 
                        // 关闭 websocket
                        alert("连接已关闭..."); 
                    };
                } else {
                    // 浏览器不支持 WebSocket
                    alert("您的浏览器不支持 WebSocket!");
                }
            }
        </script>
    </head>
    <body>
        <div id="sse">
            <a href="javascript:WebSocketTest()">运行 WebSocket</a>
        </div>     
    </body>
    </html>
```

## css3的新特性

### 1、CSS3 选择器

选择器示例示例说明CSS


### 2、CSS3 边框（Borders）
> 用 CSS3 ，你可以创建圆角边框，添加阴影框，并作为边界的形象而不使用设计程序  

|  属性   | 说明  |  CSS |
|  ----  | ----  | ---- |
| border-image | 设置所有边框图像的速记属性。 | 3 |
| border-radius| 一个用于设置所有四个边框- *-半径属性的速记属性 | 3 |
| box-shadow| 附加一个或多个下拉框的阴影 | 3 |

```css
    div{ 
        border:2px solid; 
        border-radius:25px; 
        box-shadow: 10px 10px 5px #888888; 
        border-image:url(border.png) 30 30 round; 
    }
```

### CSS3 背景 

> CSS3中包含几个新的背景属性，提供更大背景元素控制。

|  顺序   | 描述  |  CSS |
|  ----  | ----  | ---- |
| background-clip | 规定背景的绘制区域 | 3 |
| ackground-origin| 规定背景图片的定位区域。 | 3 |
| background-size| 规定背景图片的尺寸 | 3 |
```css
    div{ 
        background:url(img_flwr.gif); 
        background-repeat:no-repeat; 
        background-size:100% 100%; 
        background-origin:content-box;
    } 
    // 多背景 
    body{ 
        background-image:url(img_flwr.gif),url(img_tree.gif); 
    }
```


### CSS3 渐变

> CSS3 定义了两种类型的渐变（gradients）：  
* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向  
```css 
    background: linear-gradient(direction, color-stop1, color-stop2, ...);
```
* 径向渐变（Radial Gradients）- 由它们的中心定义       
```css 
    background: radial-gradient(center, shape size, start-color, ..., last-color);
```

### CSS3 文本效果 



### CSS3 字体 

> 以前CSS3的版本，网页设计师不得不使用用户计算机上已经安装的字体。使用CSS3，网页设计师可以使用他/她喜欢的任何字体。当你发现您要使用的字体文件时，只需简单的将字体文件包含在网站中，它会自动下载给需要的用户。您所选择的字体在新的CSS3版本有关于`@font-face`规则描述。您"自己的"的字体是在 CSS3 `@font-face` 规则中定义的。  
```css
    <style>
        @font-face{
            font-family: myFirstFont;
            src: url(sansation_light.woff);
        }
        div{
            font-family:myFirstFont;
        }
    </style>
```
### CSS3 转换和变形 

#### 2D新转换属性

以下列出了所有的转换属性:  
`transform`:适用于2D或3D转换的元素,  
`transform-origin`允许您更改转化元素位置

#### 2D 转换方法

`matrix(n,n,n,n,n,n)`:定义 2D 转换，使用六个值的矩阵。  
`translate(x,y)`:定义 2D 转换，沿着 X 和 Y 轴移动元素。  
`translateX(n)`:定义 2D 转换，沿着 X 轴移动元素。  
`translateY(n)`:定义 2D 转换，沿着 Y 轴移动元素。  
`scale(x,y)`:定义 2D 缩放转换，改变元素的宽度和高度。  
`scaleX(n)`:定义 2D 缩放转换，改变元素的宽度。  
`scaleY(n)`:定义 2D 缩放转换，改变元素的高度。  
`rotate(angle)`:定义 2D 旋转，在参数中规定角度。  
`skew(x-angle,y-angle)`:定义 2D 倾斜转换，沿着 X 和 Y 轴。  
`skewX(angle)`:定义 2D 倾斜转换，沿着 X 轴。  
`skewY(angle)`:定义 2D 倾斜转换，沿着 Y 轴。   

#### 3D转换属性

`transform`:向元素应用 2D 或 3D 转换。  
`transform-origin`:允许你改变被转换元素的位置。  
`transform-style`:规定被嵌套元素如何在 3D 空间中显示。  
`perspective`:规定 3D 元素的透视效果。  
`perspective-origin`:规定 3D 元素的底部位置。  
`backface-visibility`:定义元素在不面对屏幕时是否可见。  

#### 3D 转换方法

`matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n):`:定义 3D 转换，使用 16 个值的 4x4 矩阵。  `translate3d(x,y,z)`:定义 3D 转化。  
`translateX(x)`:定义 3D 转化，仅使用用于 X 轴的值。  
`translateY(y)`:定义 3D 转化，仅使用用于 Y 轴的值。  
`translateZ(z)`:定义 3D 转化，仅使用用于 Z 轴的值。  
`scale3d(x,y,z)`:定义 3D 缩放转换。  
`scaleX(x)`:定义 3D 缩放转换，通过给定一个 X 轴的值。  
`scaleY(y)`:定义 3D 缩放转换，通过给定一个 Y 轴的值。  
`scaleZ(z)`:定义 3D 缩放转换，通过给定一个 Z 轴的值。  
`rotate3d(x,y,z,angle)`:定义 3D 旋转。  
`rotateX(angle)`:定义沿 X 轴的 3D 旋转。  
`rotateY(angle)`:定义沿 Y 轴的 3D 旋转。  
`rotateZ(angle)`:定义沿 Z 轴的 3D 旋转。  
`perspective(n)`:定义 3D 转换元素的透视视图。   

### CSS3 过渡

`transition`:简写属性，用于在一个属性中设置四个过渡属性。    
`transition-property`:规定应用过渡的 CSS 属性的名称。  
`transition-duration`:定义过渡效果花费的时间。默认是 0。    
`transition-timing-function`:规定过渡效果的时间曲线。默认是 "ease"。    
`transition-delay`:规定过渡效果何时开始。默认是 0。    
```css 
    div{
        transition-property: width;
        transition-duration: 1s;
        transition-timing-function: linear;
        transition-delay: 2s;/* Safari */
        -webkit-transition-property:width;
        -webkit-transition-duration:1s;
        -webkit-transition-timing-function:linear;-
        webkit-transition-delay:2s;
    }
```

### CSS3 动画 
 
> 要创建CSS3动画，你需要了解`@keyframes`规则。`@keyframes`规则是创建动画。 `@keyframes`规则内指定一个CSS样式和动画将逐步从目前的样式更改为新的样式。
 
### 实例
当动画为 25% 及 50% 时改变背景色，然后当动画 100% 完成时再次改变：  
```css
@keyframes myfirst{
    0% {
        background: red;
    }
    25% {
        background: yellow;
    }
    50% {
        background: blue;
    }
    100% {
        background: green;
    }
}
```  
下面的表格列出了 `@keyframes` 规则和所有动画属性：  

`@keyframes`:规定动画。  
`animation`:所有动画属性的简写属性，除了 `animation-play-state` 属性。  
`animation-name`:规定 `@keyframes `动画的名称。  
`animation-duration`:规定动画完成一个周期所花费的秒或毫秒。默认是 0。  
`animation-timing-function`:规定动画的速度曲线。默认是 "ease"。  
`animation-delay`:规定动画何时开始。默认是 0。  
`animation-iteration-count`:规定动画被播放的次数。默认是 1。  
`animation-direction`:规定动画是否在下一周期逆向地播放。默认是 "normal"。  
`animation-play-state`:规定动画是否正在运行或暂停。默认是 "running"。    
```css
div{
    animation-name: myfirst;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
    /* Safari and Chrome: */
    -webkit-animation-name: myfirst;
    -webkit-animation-duration: 5s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-delay: 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-play-state: running;
}
```

### CSS3 多列
下表列出了所有 CSS3 的多列属性：
属性描述
`column-count`:指定元素应该被分割的列数。  
`column-fill`:指定如何填充列。  
`column-gap`:指定列与列之间的间隙。  
`column-rule`:所有`column-rule-*` 属性的简写。  
`column-rule-color`:指定两列间边框的颜色。  
`column-rule-style`:指定两列间边框的样式。  
`column-rule-width`:指定两列间边框的厚度。  
`column-span`:指定元素要跨越多少列。  
`column-width`:指定列的宽度。  
`columns`:设置`column-width` 和 `column-count` 的简写。  

### CSS3 盒模型

在 CSS3 中, 增加了一些新的用户界面特性来调整元素尺寸，框尺寸和外边框，主要包括以下用户界面属性：  
* `resize`：none | both | horizontal | vertical | inherit   
* `box-sizing`: content-box | border-box | inherit  
* `outline`:outline-color outline-style outline-width outine-offset  
`resize`:属性指定一个元素是否应该由用户去调整大小。  
`box-sizing` :属性允许您以确切的方式定义适应某个区域的具体内容。  
`outline-offset` :属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。  
 
 ### CSS3伸缩布局盒模型(弹性盒) 

CSS3 弹性盒（ `Flexible Box` 或 `flexbox`），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。  
引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间.。  
下表列出了在弹性盒子中常用到的属性:  
属性描述  
`display`:指定 HTML 元素盒子类型。  
`flex-direction`:指定了弹性容器中子元素的排列方式。  
`justify-content`:设置弹性盒子元素在主轴（横轴）方向上的对齐方式。  
`align-items`:设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式。  
`flex-wrap`:设置弹性盒子的子元素超出父容器时是否换行。  
`align-content`:修改 flex-wrap 属性的行为，类似 align-items, 但不是设置子元素对齐，而是设置行对齐。  
`flex-flow`: `flex-direction` 和 `flex-wrap` 的简写。  
`order`:设置弹性盒子的子元素排列顺序。  
`align-self`:在弹性子元素上使用。覆盖容器的 `align-items` 属性。  
`flex`:设置弹性盒子的子元素如何分配空间。  
### CSS3 多媒体查询

从 CSS 版本 2 开始，就可以通过媒体类型在 CSS 中获得媒体支持。如果您曾经使用过打印样式表，那么您可能已经使用过媒体类型。清单 1 展示了一个示例。
#### 清单 1. 使用媒体类型

```js 
    <link rel="stylesheet" type="text/css" href="site.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="print.css" media="print" />
```

#### 清单 2. 媒体查询规则

```css 
    @media all and (min-width: 800px) { ... }
```

* `@media all` 是媒体类型，也就是说，将此 CSS 应用于所有媒体类型。
* `(min-width:800px)` 是包含媒体查询的表达式，如果浏览器的最小宽度为 800 像素，则会告诉浏览器只运用下列 CSS。

#### 清单 3. `and` 条件

```css 
    @media (min-width:800px) and (max-width:1200px) and (orientation:portrait) { ... }
```  

#### 清单 4. `or`关键词

```css
    @media (min-width:800px) or (orientation:portrait) { ... }
```

#### 清单 5. 使用 `not`

```css
    @media (not min-width:800px) { ... }
```
> 参考：https://juejin.im/post/5cbffe386fb9a0322564c0e5#heading-1