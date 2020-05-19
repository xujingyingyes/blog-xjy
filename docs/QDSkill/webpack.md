# webpack-xjy

[[toc]]
## 代码分割
按照配置的要求，把产出的分割为几段代码。

```js
// vue-cli2  -> npm run build 产出的js
app.js
vendor.js
manifest.js

// 如果没有分割，则只产出 app.js
```

### 为什么要代码分割 && 如何分割
* 多页面应用
 * 提取公共依赖
    > 把几个页面之中都用到的依赖给打包为一个单独的文件
    A页面有c.js             A页面
                打包后->            c.js(公共依赖)
    B页面有c.js             B页面
    >浏览器的缓存机制，第一次加载了c.js，再引用到的时候是从缓存里拿的
* 单页面应用(首屏加载太慢了)
 * 减少文件体积，拆分应用
    > 把需要异步加载的内容改成异步加载(c.js、d.js)

    A页面有c.js d.js   打包后->      A页面    d.js  c.js(公共依赖)

### 为了业务代码的纯净
* 有时不希望业务代码里混入第三方代码，或webpack配置代码。
> 把第三方的代码和webpack配置代码拆分为单独文件。  

### 所以一般这么打包
* 多页面应用
> 主业务代码+公共依赖+第三方包+webpack运行代码  
* 单页面应用
> 主业务代码(`app.js`) +异步模块+第三方包(`vendor.js`)+webpack运行代码(`manifest.js`)  
 
#### webpack分析
* webpack3
 * 通过commonsChunkPlugin 分割

* webpack4  
 * 多入口  
  * 多new几个new htmlWebpackPlugin和入口数量对上  
 * 单页面
  * 拆异步，拆第三方包，拆webpack
  > 异步引入：  
```js
    import(/*webpackChunkName:'123'*/"./sds.js"); // (自定义命名123)
    require.ensure([],function(){
        require("./asd.js");
    },"bbc") // 自定义命名bbc
```

### 开发搭建
#### 热更新
保持页面状态，不刷新的情况下更新
```js
- webpack.config.js文件内
1.hotmoduleReplacementPlugin()
2.devServer:{
    hot: true,// css是热更新
    hotOnly: true, // js模块也是热更新，禁用掉模块替换
    }
- app.js
if(module.hot){
    module.hot.accept() // 放在那个文件夹，表示所有更改都会有热更新的效果
}
```
#### webpack-dev-server是怎么搭建的
* express 开启服务  
* webpack-dev-middleware 开启开发模式中间件  
* webpack-hot-middle 中间件，处理热更新  
* http-proxy-middleware 中间件，处理请求转发，请求代理  
* connection-history-api-fallback 中间件，路径重写  

```js
- dev.js
const express = require("express");
const webpackDevMid = require("webpack-dev-middleware");
const webpackHotMid = require("webpack-hot-middleware");
const webpack = require("webpack");
const app = express();
const config = require("./webpack.config.js");
// express开启服务->用webpack模块打包好内容，->内容在我们express开启的服务上显示。
// 入口可能是多入口
Object.keys(config.entry).forEach((name) => { // 把入口写法改成下面这种，热更新才可以生效
    config.entry[name] = ['webpack-hot-middleware/client?noInfo=true&&reload=true'].concat(config.entry[name])
})
var compiler = webpack(config); // 拿到打包结果
// 拿到东西给到中间件
app.use(
    webpackDevMid(
        compiler,{ // 第二个参数可以配置模版，请求头响应头等
           
        }
    )
)
app.use(
    webpackHotMid(// 使用热更新中间件
        compiler,{
           overlayStyles: true // 支持css热更新
        }
    )
)
app.listen(2007) // 开启服务
```

## 插件和loader
### loader的本质是一个方法
* 处理逻辑
> 注册loader -> 对应得到文件内容给到loader -> loader方法处理内容 -> 方法return结果
* 常用loader
    * 编译相关
    > babel-loader ts-loader
    * 样式相关
    > style-loader css-loader less-loader postcss-loader
    * 文件相关
    > file-loader url-loader
### plugin的本质是监听生命周期
* 处理逻辑
> 注册plugin -> 插件接收到webpack编译过程 -> 监听某个生命周期 -> 当编译到达某个生命周期时会自动的调用插件的监听
* 特点
    * 参与打包整个过程
    * 打包优化和压缩
    * 配置编译时的变量
    * 极其灵活
* 常用plugins
    * 优化相关
    > CommonsChunkPlugin UglifyjsWebpackPlugin
    * 功能相关
    > ExtractTextWebpackPlugin HtmlWebpackPlugin HotModuleReplacementPlugin copyWebpackPlugin
## 热更新怎么工作的
客户端  <---(建立一个EventSource(websocket))----Express服务 <---(webpack监控文件状态，文件发生变动重新打包代码)--- webpack

服务发送一个消息给客户端，客户端通过ajax请求，请求新的打包结果

## 模块化开发(js，css)
### js模块化 进化过程
* 命名空间 -> 库名.类别名.方法名
```js
    var NameSpace = {};
    NameSpace.type = NameSpace.type || {};
    NameSpace.type.method = function () {
        
    }
```
* CommonJS -> 一个文件为一个模块
   * 通过module.exports暴露模块接口
   * 通过require引入模块
   * 同步执行
   * [规范说明](http://wiki.commonjs.org/wiki/Modules/1.1.1)
```js
    var mixin = require("merge-descriptors");
    var res = require("./response");
    exports = module.exports = crateApplication;
```
* AMD/CMD/UMD
    * AMD
        * Async Module Definition
        * 使用define定义模块
        * 使用require加载模块
        * 库：RequireJS
        * 依赖前置，提前执行
        [规范说明](https://github.com/amdjs/amdjs-api/wiki/AMD)
```js
    define(
        // 模块名 可以省略
        "alpha",
        // 依赖
        ["require", " exports", "beta"],
        // 模块输出
        function (require, exports, beta){
            exports.verb = function (){
                return beta.verb();
                // or:
                return require("beta").verb();
            }
        }
    );
```  
 
* CMD
    * Common Module Definition
    * 一个文件为一个模块
    * 使用define来定义一个模块
    * 使用require来加载一个模块
    * 库：SeaJS
    * 尽可能懒执行
    [规范说明](https://github.com/cmdjs/specification/blob/master/draft/module.md)

```js
// 所有模块都通过define来定义
define(
    function (require, exports, module){
        // 通过require 引入依赖
        var $ = require("jquery");
        var Spinning = require("./spinning");
        // 通过exports对外提供接口
        exports.doSomething = ...
        // 或者通过 module.exports提供整个接口
        module.exports = ...
    });
```
* UMD
    * Universal Module Definition
    * 通用解决方案
    * 三个步骤
        * 判断是否支持AMD
        * 判断是否支持CommonJS
        * 如果都没有，使用全局变量

```js

```
* ES6
    * EcmaScript Module
    * 一个文件一个模块
    * export暴露模块/import引入模块
```js
// default export and named export
import theDefault from "src/myl";
import {named1, named2} from "src/myl"
import theDefault, {named1, named2} from "src/myl";

// Renaming:import named1 as myNamed1
import {named1 as myNamed1, named2} from "src/myl";

//importing the module as an object
import * as myl from "src/myl";

//only load the module, don't import anything
import "src/myl";
```

### webpack支持
AMD，ES6MOdule，CommonJS

### css模块化
* css 设计模式
    * OOCSS
    > 面向对象的css，结构和设计的分离，容器和内容的分离。开发人员可以获得在不同地方使用的css类
    * SMACSS
    > 可扩展和模块化结构css的简称，减少代码量，简化代码的维护。
    base(元素，表格等) + layout(布局规则，顶部和页脚和边栏模块的大小) + module(模块内部的规则) + state(每一个模块的状态) + theme(主题) = SMACSS
    * Atomic CSS(原子css)
    > <div class="mt-10 w-100 h-15"></div>
    * MCSS
    * AMCSS-> 针对属性的
    * BEM
* CSS Modules


## 核心概念
entry 打包入口
output 打包输出文件名
loaders 处理其他类型的资源文件
plugins 压缩代码，混淆代码，代码分割，tree shacking
