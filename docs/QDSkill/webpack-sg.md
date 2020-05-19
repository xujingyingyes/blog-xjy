# webpack-sg
> 给js准备的一个打包工具，可以把很多个模块打包成很少的一些静态文件，有自己的特性叫代码分割。代码分割可以使项目中在加载过程中去加载当时只需要的静态文件。 模块通过loader区处理各种各样的文件，模块可以使用Commone.js、AMD、ES6，通过loader处理，css文件，less文件，JSON，less，vue....

[[toc]]
- 安装
  - yarn add webpack webpack-cli -D(webpack 必安装的2个)
  - webpack可以进行0配置(npx webpack  默认会打包下文件src)

## 手动配置
- 创建webpack.config.js(文件名字默认的)
- 如果要修改webpack.config.js名字 就只能通过 pack.json 
  - 打包 "build":"webpack --config webpack.config.xxx.js"
  - 开启静态服务 "dev": "webpack-dev-server"
```js
path = require('path')
//生成html插件
let HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer:{// 开发服务器的配置 默认8080
    port:3000, // 端口
    open:true, // 直接在浏览器打开
    progress:true,// 开启进度条
    contentBase:'./dist',//开启服务 指定路径
    compress:true//压缩
  },
  mode:"development",//模式 production development
  entry:{
    //ss 入口的名字
    ss:path.join(__dirname,'src/index.js')
  },//入口
  output:{
    //打包后的文件名 [name]指向 entry的ss 若只有路径 默认是main [hash:8] 后面会带一串字符 :8 长度是8  
    filename:'[name].[hash:8].js',
    path:path.join(__dirname,'dist'),//路径必须是一个绝对路径
  },
  plugins:[
    //数组放着所有的webpack插件
    new HTMLWebpackPlugin({
      template:'./src/index.html', //模板 路径
      filename:'index.html', // 生成的文件名字
      minify:{
        removeAttributeQuotes:true,// 删除html ""
        collapseWhitespace:true,// 生成一行
      },
      hash:true,//引入的文件生成hash
    })
  ],
  module:{
    // 模块
    rules:[//规则
      {
        // css-loader 主要解析 @import这类语法的
        // style-loader 他是把css  插入到head的标签底部
        // loader用法  一个用字符串 多个用[],顺序默认从右向左执行,从下向上
        //             还可以写成对象
        test:/\.css$/,
        use:[
          {
            loader:'style-loader',
            options:{//修改插入的方式
              insertAt:'top'
            }
          },
            'css-loader'
        ]
      },
      {
        // less 安装 yarn add less less-loader -D
        test:/\.less$/,
        use:[
          {
            loader:'style-loader',
            options:{//修改插入的方式
              insertAt:'top'
            }
          },
            'css-loader',
            'less-loader'//把less -> css
        ]
      }
    ]
  }
}
```

### css处理
  - 创建一个postcss.config.js

```js
// postcss.config.js
module.exports = {
  plugins:[require('autoprefixer')]
}

//  yarn add mini-css-extract-plugin -D  处理css
//  optimize-css-assets-webpack-plugin 压缩css
//  uglifyjs-webpack-plugin 压缩js
//  yarn add postcss-loader autoprefixer 处理css前缀
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UgligyJs = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization:{//优化
    minimizer:[
      new OptimizeCss(), //压缩css
      new UgligyJs({
        cache:true,
        parallel:true,
        sourceMap:true
      }),//压缩js js需要babel处理不然会报异常
    ]
  },
  module:{
    rules:[
      {
        test:/.css$/,
        user:[
          MiniCssExtractPlugin.loader,// 和style-loader的区别 他是用插件抽离了在放到页面中
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',//把less -> css
          'postcss-loader',
        ]
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'main.css'
    })
  ]
}
```

### js
- babel
```js
  // yarn add babel-loader @babel/core @babel/preset-env
  // babel-loader 将语法转换
  // @babel/core 核心模块
  // @babel/preset-env 将高级的语法转换成 低级
  // @babel/plugin-proposal-class-properties 处理es7 
  
  // 下面两个是一起的
  // yarn add  @babel/plugin-transform-runtime -D //处理 generator
  // yarn add @babel/runtime //生成依赖 

  // yarn add @babel/polyfill  //生成依赖  处理实例上的方法 'xx'.includes('a')
  
  // yarn add eslint eslint-loader -D 
  module:{
    // 模块
    rules:[//规则 顺序默认从右向左执行,从下向上
      {
        test:/\.js$/,
        use:{
          loader:'eslint-loader',
          options:{
            enforce:'pre'//设置执行顺序 previoues提前 默认是普通 post后面
          }
        },
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{// 用babel-loader 需要把es6->es5
            presets:['@babel/preset-env'],// 这个是大插件的集合
            plugins:[// 可选
              ["@babel/plugin-proposal-decorators",{"legacy":true}],//处理装饰器
              ['@babel/plugin-proposal-class-properties',{"loose":true}],//处理class
              "@babel/plugin-transform-runtime"

            ]

          }
        }
      },
    ]
  }
```

### jquery&&全局问题
```js
  // 引入第三方模块 cnpm i -S jquery
  1、 expose-loader 暴露到window上  //window.$可以获取到
    cnpm i -D expose-loader
    rules:[
      {
        test:require.resolve('jquery'),
        use:'expose-loader?$'
      }
    ]

  2、  webpack 插件的ProvidePlugin属性
      let webpack = require('webpack')
      new webpack.ProvidePlugin({
        //提供插件 在每个模块中都注入$
        $:'jquery'
      })
  3、cnd引入 import $ from 'jquery' jquery不打包
    externals:{
      jquery:"$"
    }  
```

### 图片处理
- 1、在js中创建图片来引入
- 2、在css引入 backgroud('url')
- 3、<img src='' alt=''/>
```js
  // js引入 import logo from './1.jpeg'; 会将图片转换成hash戳
  // 打包:默认会在内部生成一张图片 到build目录下  把生成的图片名字返回回来
  // file-loader 不用了 
  {
    test:/\.(png|jpeg|gif)$/,
    use:'file-loader'
  },
  // url-loader 多用这个
  //  url-loader 可以处理base64 当我们图片小于多少K用base64 来转化 否则用file-loader产生真实的图片
  {
    test:/\.(png|jpeg|gif)$/,
    use:{
      loader:'url-loader',
      options:{
        limit:200*1024,
        outputPath:'img/'
      }
    }
  },
  // html-withimg-loader处理html里面引入图片
  {
    test:/.html$/,
    use:'html-withimg-loader'
  },
```

### 文件分类打包
```js
  // css /css 就是文件夹
  new MiniCssExtractPlugin({
    filename:'/css/main.css'
  }),
  // img   outputPath:'img/' 指定输出文件 base64就不会打包进来
  {
    test:/\.(png|jpeg|gif)$/,
    use:{
      loader:'url-loader',
      options:{
        limit:1,
        outputPath:'img/'
      }
    }
  },
  // 公共路径 打包出来 都会带这个
  output:{
    publicPath:'http//www.xxx.com'
  }
  // 或者只在图片上加公共路径
    {
    test:/\.(png|jpeg|gif)$/,
    use:{
      loader:'url-loader',
      options:{
        limit:1,
        outputPath:'img/',
         publicPath:'http//www.xxx.com'
      }
    }
  },
```

## 高级配置

### 多页配置
```js
let path = require('path');
let HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  //多入口
  mode:'development',
  entry:{
    home:'./src/index.js',
    other:'./src/other.js',
  },
  output:{
    // [name] 就是一个变量 代表 entry的key值
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    // 默认都会引入到html里面,要加chunks
    new HTMLWebpackPlugin({
      template:'./index.html',
      filename:'home.html',
      chunks:['home']
    }),
    new HTMLWebpackPlugin({
      template:'./index.html',
      filename:'other.html',
      chunks:['other']
    })
  ]
}
```
### source-map
- devtool：
  - 1、source-map
    - 源码映射 会单独生成一个source map文件 会标识 当前报错的列和行 打包会生成一个文件 大而全
  - 2、eval-source-map
    - 不会产生单独的文件 但是可以显示行和列 
  - 3、cheap-module-source-map
    - 不会产生列 但是是一个单独的映射文件
  - 4、cheap-module-eval-source-map
    - 不会产生文件 集成在打包后的文件 不会产生列
```js
let path = require('path');
let HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'development',
  entry:{
    home:'./src/index.js',
  },
  devtool:'source-map',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      }
    ]
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HTMLWebpackPlugin({
      template:'./index.html',
      filename:'other.html',
    })
  ]
}
```
### watch&&监控打包
- watch作用监控打包 修改代码就会重新打包
```js
  watch:true,
  watchOptions:{// 监控的选项
    poll:1000, // 每秒问我 1000次
    aggregateTimout:500, // 防抖 我一直输入代码 停止输入后的500
    ignored:/node_modules/  // 不需要进行监控那个文件 
  }
```

### 小插件
- cleanWebpackPlugin
  - clean-webpack-plugin
- copyWebpackPlugin
  - copy-webpack-plugin
- bannerPlugin内置的 
```js
  //删除dist文件
  let CleanWebpackPlugin =  require('clean-webpack-plugin')
  plugins:[
      new CleanWebpackPlugin(),    
  ]
  //拷贝文件
  let CopyWebpackPlugin = require('copy-webpack-plugin')
  plugins:[
      new CopyWebpackPlugin([
        {from:'./doc',to:'./'}
      ]),    
  ]
  // 版权声明
  let webpack = require('webpack')
    plugins:[
      new webpack.BannerPlugin('make xxxx')//打包的js文件都加入()内的话 
  ]
```

### 跨域
- 重写的方式 把请求代理到express 服务器
```js
devServer:{// 开发服务器的配置 默认8080
    port:3000, // 端口
    open:true, // 直接在浏览器打开
    progress:true,// 开启进度条
    contentBase:'./dist',//开启服务 指定路径
    compress:true//压缩
  // 1代理
  proxy:{//配置代理
    '/api':{
      target:'http://localhost:3000',
      pathRwerite:{
        'api':''// api会被替换成""
      }
    }
  },
  //2 模拟数据
  before(app){//提供的方法 钩子
    app.get('/user',(req,res)=>{
      res.json({name:'xxx'})
    })
  },
  //3 在服务端 不用代理 在服务端启动webpack 端口用服务端端口
  // yarn add webpack-dev-middleware  可以在服务端启动webapck
  // express 启动服务 连带着开启webpack
  let express = rquire('express')
  let app = express();
  let webpack = require('webpack');
  // 中间件
  let middle = require('webpack-dev-middleware')
  let config = require('./webpacl.config.js')
  let compiler =  webpack(config)

  app.middle(compiler)

  app.get('/user',(req,res)=>{
    res.json({name:'xxx'})
  })
  app.listen(3000)
}
```
### resolve&&解析
```js
  resolve:{
    // 解析 当我们import第三方模块 先去那儿找 
    modules:[path.join(__dirname,'node_modules')],
    // 引入文件没有加后缀 会按照这个数组配置查找
    extensions:['.js','.css','.json','.vue']
    // 文件入口 默认是index.js 
    mainFiles:[],
    //  当我们 import 'bootstrap'
    mainFields:['style','main'],//默认找pack.json 的main 这个配置会先去找style选项
    //  当我们 import 'bootstrap' 他会去找'bootstrap/dist/css/bootstrap.css'
    alias:{//别名 
      boostrap:'bootstrap/dist/css/bootstrap.css'
    }

  }
```
### 环境变量
- 在js中直接获取的值
```js
let webpack = require('webpack')
plugins:[
  new webpack.DefinePlugin({
    // DEV:`1+1`,console.log(DEV)//2
    // DEV:`'1+1'`,console.log(DEV)//1+1
    DEV:JSON.stringify('dev')
  })
]
```
### 区分不用环境&&合并webpack
- webpack-merge
 - 这个插件就是用来合并的
```js
  //创建 webpack.prod.js
  let {smart} = require('webpack-merge')
  let base = require('./webpack.base.js')
  module.exports = smart(base,{
    mode:'production'
  })

  //创建 webpack.dev.js
  let {smart} = require('webpack-merge')
  let base = require('./webpack.base.js')
  module.exports = smart(base,{
    mode:'development'
  })

  // 执行
  npm run build -- --config webpack.dev.js
  npm run build -- --config webpack.prod.js
```
## 优化
- noParse
  - 不解析第三方库
- exclude/include
  - 解析的时候 排除哪些/包含哪些
- IgnorePlugin
  - 引入包的时候 忽略哪些文件
```js
module:{
  //遇到很大的库 在知道他没有其他依赖的同时 可以不用解析他,节省时间
  noParse:/jquery/, 
  rules:{
    {
      test:/\.js&/
      exclude:/node_modules/,//js解析的时候 不去找node_modules
      include:path.join('src'),//include 解析的时候直接去src  一般二选一
    }
  }
}
// IgnorePlugin
// 使用moment的时候  所有的语言包可以引入了 给可以给他忽略 在手动所需要的语言
  // js中
  import moment from 'moment';
  //手动引入所需要的语言
  import 'moment/locale/zh-cn';

let webpack = require('webpack')
plugins:[
  new webpack.IgnorePlugin('/\.\/locale/',/moment/)
]
```

### 动态连接库
- 以react为例 先将react react-dom 打包出来 剩下的修改在打包
- 创建动态连接库
```js
// 创建 webpack.config.react.js
let path = require('path')
let webpack = require('webpack')
module.exports = {
  mode:'development',
  entry:{
    react:['react','react-dom'],
  }
  output:{
    finame:'_dll_[name].js',//产生的文件名字
    path:path.join(__dirname,'dist'),
    library:'_dll_[name]', //打包的文件就是 let ab={内容}
    libraryTarget:'var',
    /*
       不会挂到 var  会是exports[a] = function(){}()
       如果是commonjs 会是 var a  = function(){}()
       如果是commonjs2  会是module.exports = function(){}()
       如果是this   就是this[a] = function(){}()
       global 默认是window[a] = function(){}()
       var 是 var a  = function(){}()
    */ 
  },
  plugins:[
    // 动态连接库的清单 会生成一个manifest.json文件
    new webpack.Dllplugin({//规定好的 name = library
      name:'_dll_[name]',
      path:path.resolve(__dirname,'dist','manifest.json')
    })
  ]
}
```
- index.html 引入
```html
<script src='/_dll_react.js'></script>
```

- 引入动态连接库
```js
// 主配置 webpack.config.js 
let webpack = require('webpack')
plugins:[
  new webpack.DllReferencePlugin({
    manifest:path.resolve(__dirname,'dist','manifest.json')
  })
]
```
### 多线程打包
- happypack
```js
let Happypack = require('happypack')
module:{
  reule:[
    {
      test:/\.js$/,
      use:'Happypack/loader?id=js'
    }
  ]
}
plugins:[
  // css 也类似
  new Happypack({
    id:'js',
    use:{
      loader:'babel-loader',
      options:{// 用babel-loader 需要把es6->es5
        plugins:[// 可选
          '@babel/preset-env',
          '@babel/preset-react'
          ]
      }
  })
]
```

### webpack自带优化
- tree-shaking
- scope hosting
```js
// import 在生成环境下 会自动去除掉没用的代码(引用了 但是没有用到)
// 原理 tree-shaking 把没用到的代码 自动删除掉

// es6模块(require引入)会把结果放到defult上 打包的时候 不管用没用 都会打包进来

// scope hosting 作用域
let a = 1;
let b = 2;
let c = 3;
let d = a+b+c;// 在webpack中会自动省略一些 可以简化的代码
console.log(d)
```
### 抽离公共代码
```js
module.exports = {
  optimization:{// 分割代码块
    cacheGroups:{//缓存组
      common:{//公共的模块
        chunks:'initial',
        minSize:0,
        minChunks:2,//引用多2次以上就会抽离
      },
      vendor:{//第三方单独抽出
        priority:1,// 权重 增加
        test:/node_modules/,//把你抽离出来
        chunks:'initial',
        minSize:0,
        minChunks:2
      }
    }
  }
}
```
### 懒加载
-  @babel/plugin-syntax-dynamic-import
  - import('./xx.js') 返回的是一个then
  - vue.js 和 react 懒加载都基于这个
```js
// 页面点击 的时候 资源才加载进来
let button = document.createElement('button');
button.innerHTML = 'hello';
button.addEventListener('click',()=>{
  // es6 草案中的语法 jsonp实现动态加载文件
  // 会生成一个单独的js
  import('./source.js').then(data=>{
    console.log(data.default,'这里面才是结果')
  })
})
document.body.appendChild(button)

{
  test:/\.js$/,//默认查找所有的js
  use:{
    loader:'babel-loader',
    options:{
      presets:['@babel/preset-env'],
      // 插件安装 在js配置就可以了
      plugins:[
        "@babel/plugin-syntax-dynamic-import"
      ]

    }
  },
},
```

### 热更新
- 默认更新页面内容 页面会刷新
- 热更新 不会刷新页面 只会局部更新
  - import只能在顶部引用 不能在函数内引用
- require引入的数据都是 default属性下
```js
// 使用
import xx from './xxx.js';
if(module.hot){
  module.hot.accept('./source',()=>{
    // 更新成功 再次引入
    let str = require('./source')
  })
}

// 配置
devServer:{
  hot:true
},
plugins:[
  new webpack.HotModuleReplacementPlugin(),//热更新插件
  new webpack.NamedModulesPlugin(),//打印更新的模块路径
]
```

## tapable 
- SyncHook 同步
- SyncBailHook 遇到返回值是undefined 才继续执行
- SyncWaterfallHook 瀑布 上一个函数有返回值就会传递给下一个做参数
- SyncLoopHook 循环执行 遇到某个不返回undefined的监听函数会多次执行
- 同步
```js
// 同步
let {SyncHook, SyncBailHook,SyncWaterfallHook,} = require('tapable')

class Lesson1{
  constructor(){
    this.hooks = {
      // 必须传递一个值过去
      arch:new SyncHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
    }),
    this.hooks.arch.tap('react',function(name){
      console.log('react',name)
    })
  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson1();
l.tap() //注册这两个事件
l.start('xxxxxxxx') //启动钩子


// 阻塞
class Lesson2{
  constructor(){
    this.hooks = {
      arch:new SyncBailHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
      // return '想停止学习'
      //如是返回 undefined 就继续执行
    }),
    this.hooks.arch.tap('react',function(name){
      console.log('node',name)
    })
  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson2();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// 瀑布
class Lesson3{
  constructor(){
    this.hooks = {
      arch:new SyncWaterfallHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)//xx
      return '想停止学习'
      //如是返回 undefined 就继续执行
    }),
    this.hooks.arch.tap('react',function(name){
      console.log('node',name)//想停止学习
    })
  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson4();
l.tap() //注册这两个事件
l.start('xx') //启动钩子


class Lesson{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new SyncLoopHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
      return ++ this.index === 3? 'undefined' :'随便'
      //如是返回不是undefined 就一直循环 
    })

  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson4();
l.tap() //注册这两个事件
l.start('xx') //启动钩子
```
- 异步
- AsyncParallelHook 异步并行 等cb都执行完成 才会打印end
- AsyncSeriesHook 异步穿行 一个个执行
- AsyncSeriesWaterfallHook 异步有关联 上一个返回非undefined值 下一个才会执行 否则直接end
- tapable库 注册三种方法 tap(同步) tapAsync(cb) tapPromise(注册是promise) 
  - 对应调用的方法 call callAsync promise
```js
// 异步 并行钩子 需要等待所有的并发异步事件执行后在执行回调方法
// 注册方法 分为 tap/tapAsync 
let {AsyncParallelHook,AsyncSeriesHook} = require('tapable')
class Lesson1{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncParallelHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapAsync('node',(name,cb)=>{
     setTimeout(()=>{
       console.log('node',name)
       cb()
     },1000)
    })
  }
  start(...args){
    this.hooks.arch.callAsync(...args,function(w){
      console.log('end')
    })
  }
}

let l = new Lesson2();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// 异步串行
class Lesson{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncParallelHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapPromise('node',(name)=>{
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('node',name)
        resolve()
      },1000)
     })
    })

  }
  start(...args){
    this.hooks.arch.promise(...args).then(()=>{
      console.log('end')
    })
  }
}

let l = new Lesson2();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

class Lesson3{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncSeriesHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapPromise('node',(name)=>{
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('node',name)
        resolve()
      },1000)
     })
    })

  }
  start(...args){
    this.hooks.arch.promise(...args).then(()=>{
      console.log('end')
    })
  }
}

let l = new Lesson3();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// AsyncSeriesWaterfallHook 异步
class Lesson4{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapPromise('node',(name)=>{
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('node',name)
        resolve('1')
      },1000)
     })
    })
    this.hooks.arch.tapPromise('react',(name)=>{
      return new Promise((resolve,reject)=>{
       setTimeout(()=>{
         console.log('react',name)
         resolve()
       },1000)
      })
     })
  }
  start(...args){
    this.hooks.arch.promise(...args).then(()=>{
      console.log('end')
    })
  }
}

let l = new Lesson4();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

```
## resolveLoader解析loader路径的
```js
resolveLoader:{
  // 第三方模块默认 查找的位子
  modules:['node_modules',path.resolve(__dirname,'loaders')]
  // 配置别名
  alias:{
    // 在loader中使用 loader1 就指向 __dirname/loaders/loaders1.js
    loader1:path.resolve(__dirname,'loaders','loaders1')
  }
}
```

## 手写webapck
- npx webpack  
  - 会去找node_modules/.bin/webpack

- 制作webpack包(下面有)
- npm link webpack-pack 就引入到本地了 他会出现在node_modules/.bin/webpack-pack
- 直接运行 npm webpack-pack 就可以运行webpack-pack里面的代码(类似npx webpack 打包一样)
- 获取cmd输入命名行的路径=> proccess.cwd() 
- 本地生成npm包(类似 webpack)
```js
 创建本地文件  npm init -y

 创建 bin/webpack-pack.js
  输入=>
  #! /usr/bin/env node
  console.log('12')

  package.json
  输入=>
  "bin": {
    "webpack-pack": "./bin/webpack-pack.js"
  }
  
  运行 npm link
```
- 制作 webpack-pack
- webpack-pack/bin/index 入口文件
```js
#! /usr/bin/env node
// 1、获取webpack.config.js 配置文件
let path = require('path');

// 2、通过当前执行命令的目录 解析除webpack.config.js 在那儿执行就在那儿找webpack.config.js
let config = require(path.resolve('webpack.config.js')) 

// 主的类 Compiler 编译
let Compiler = require('../lib/Compiler.js')

// 根据用户创建的配置文件 进行编译
let compiler = new Compiler(config)

compiler.hooks.entryOption.call()

compiler.run()//开始运行
```
- webpack-pack/lib/Compiler 
- babylon 解析（parse）
  - Babylon 是 Babel 的解析器。最初是 从Acorn项目fork出来的。Acorn非常快，易于使用。
- @babel/traverse 
  - Babel Traverse（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点。我们可以和 Babylon 一起使用来遍历和更新节点。
- @babel/generator
  - Babel Generator模块是 Babel 的代码生成器，它读取AST并将其转换为代码和源码映射
- webpack流程 
  - 1、获取配置文件(webpack.config.js)
  - 2、获取所有的资源(this.getSource =>只针对 require 引入的文件)
  - 3、buildMoudle 函数 获取每一个 绝对路径(moduleId)对应的代码(sourceCode) ast解析(this.parse)
  - 4、ejs配合模板渲染数据 ejs.render()
  - 5、根据配置文件的output 路径 将获取的数据写入
```js
// ejs 用来拼接字符串
// tapable 用来发布订阅
let path = require('path');
let fs = require('fs');
//  下面4个功能 ast  1) 转换树 2) 遍历树 3)更改树  4)输出代码
let babylon = require('babylon'); // 转换成树
let traverse = require('@babel/traverse').default; // 遍历树
let t = require('@babel/types'); // 更改树 es模块需要 多.default
let generator = require('@babel/generator').default;

let ejs = require('ejs');
let {SyncHook} = require('tapable')

class Compiler{
  constructor(config){
    // 配置文件
    this.config = config
    // 需要获取当前执行命令的绝对路径
    this.root = process.cwd()
    // 找到配置文件中的入口
    this.entry = config.entry
    // 入口文本的id
    this.entryId;
    //所有的依赖列表
    this.modules = {},

    this.hooks = {
      entryOption: new SyncHook(),
      run: new SyncHook(),
      compile:new SyncHook(),
      afterCompile:new SyncHook(),
      afterPlugins:new SyncHook(),//插件都执行完成后调用此方法
      emit:new SyncHook(),//文件发射出来了
      done:new SyncHook()
    }
    if(Array.isArray(config.plugins)){
      config.plugins.forEach(p=>{
        // 每个插件都需要有一个apply方法
        p.apply(this);//每个插件都能拿到compiler对象
      })
    }
    this.hooks.afterPlugins.call();

  }
  getSource(modulePath){//获取资源
    // 需要判断 modulePath 是否是less文件
    // 获取规则
    let rules = this.config.module.rules;//所有的规则
    let content = fs.readFileSync(modulePath,'utf8');
    for(let i=0;i<rules.length;i++){
      let rule = rules[i]
      let {test,use} = rule
      let len = use.length - 1;//默认定位到最后一个loader
      if(test.test(modulePath)){
        // 这个路径需要用loader来解析
        function normalLoader(){
          // loader 可以是一个路径 本质是一个函数
          let loader = require(use[len--]);
          content = loader(content);
          if(len>=0){
            normalLoader();//递归来解析loader
          }
        }
        normalLoader()

      }
    }
    return content
  }
  // 创建模块
  // 第一个是绝对路径 第二个是否是主入口
  buildMoudle(modulePath,isEntry){
    // 文件源代码
    let source = this.getSource(modulePath)
    // modulePath 目前是绝对路径 path.relative在绝对路径中找相对路径
    let moduleId = './' + path.relative(this.root , modulePath)
    // console.log('==',moduleId,'-',source)
    if(isEntry){
      //如果是主模块
      this.entryId = moduleId
    }
    // AST语法解析 写一个专门的方法来解析源代码
    // 处理当前模块的父路径 path.dirname
    // sourceCode就是转换后的代码
    let {sourceCode,dependencies} = this.parse(source,path.dirname(moduleId)) // 取到的就是./src
    this.modules[moduleId] = sourceCode;
    // 需要拿到当前文件的依赖 递归搜索依赖
    dependencies.forEach(dep=>{
      this.buildMoudle(path.join(this.root,dep))
    });
    // console.log('sourceCode',dependencies)
  }
  // yarn add babylon @babel/traverse @babel/generator @babel/types
  parse(source,parentPath){
    let ast = babylon.parse(source)
    let dependencies = [];//存放依赖关系的
    traverse(ast,{
      CallExpression(p){
        let node = p.node;
        // 找到require
        if(node.callee.name === 'require'){ //取到名字
          node.callee.name = '__webpack_require__';
          let moduleName = node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName)?'':'.js')
          moduleName = './' + path.join(parentPath,moduleName)
          // 把依赖添加进去
          dependencies.push(moduleName)
          // 替换变量名
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code;
    return {sourceCode,dependencies}
    // ast 1) 转换树 2) 遍历树 3)更改树  4)输出代码
    // esprima es-travarse esCodegen(webpack用的这个) 语法转换
    // babel(babylon  @babel/traverse  @babel/types @babel/generator) 对应上面的1-4
  }
  // 开始运行
  run(){
    this.hooks.run.call()
    // 1、创建模块 需要根据当前的绝对路径
    this.hooks.compile.call()
    this.buildMoudle(path.resolve(this.root,this.entry),true);
    this.hooks.afterCompile.call()
    // console.log(this.entryId,this.modules)
    // 2、创建完后 把成功的文件写出来
    this.emitFile();//发射文件
    this.hooks.emit.call();
    this.hooks.done.call()
  }
  emitFile(){
    // 模板内容
    let content = this.getSource(path.resolve(__dirname,'temp.ejs'))
    // 
    let str = ejs.render(content,{
      modules:this.modules,
      entryId:this.entryId
    }) 
    // 写入打包到的文件中
    let main = path.join(this.config.output.path,this.config.output.filename);
    fs.writeFileSync(main,str)

  }
}

module.exports = Compiler
```

- webpack-pack/lib/temp.ejs 
```js
 (function(modules){
  var installedModules = {};
  function __webpack_require__(moduleId){
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] ={
      i: moduleId,
      l: false,
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
   
    module.l = true;

    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "<%-entryId%>");

 })({
    <%for(let key in modules){%>
      "<%-key%>":
      (function (module,exports,__webpack_require__){
        eval(`<%-modules[key]%>`);
      }),
    <%}%>
 })

```

## 手写loader
- loader组成 pitch + normal
  - loader里面的 
    - this.resourcePath 获取匹配到文件的路径
    - loaderUtils = require('loader-utils')  options = loaderUtils.getOptions(this); options 是当前webpack配置的选项
      - let filename = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source})  根据图片格式生成图片路径
      - this.emitFile(filename,source) // 发射文件
    - 同步 用return source 返回数据  异步用 cb = this.async()  cb(err,source) 返回数据
    - validateOptions = require('schema-utils') 创建骨架 用来比较传递进来的骨架是否类似
    - loader 默认是字符串  当前loader.raw = true 将字符串转换成二进制流

```js
// 3个loader
// loader1 文件
function loader1 (source){ //normal
  console.log('1111')
  return source
}
loader1.pitch = ()=>{ //pitch
  console.log('loader1')
}

module.exports = loader1

// loader2 文件
function loader1 (source){
  console.log('222')
  return source
}
loader1.pitch = ()=>{
  console.log('loader3')
}

module.exports = loader1


// loader3 文件
function loader1 (source){
  console.log('333')
  return source
}
loader1.pitch = ()=>{
  console.log('loader3')
}
module.exports = loader1


rules:[
  {
    test:/.js$/,
    use:{
      loader:['loader1','loader2','loader3']
    }
  }
]
// 正常情况下没有pitch 执行顺序应该是 loader3=>loader2=>loader1=>
// 加入pitch loader1.pitch => loader2.pitch => loader3.pitch =>loader3=>loader2=>loader1
/* 
  pitch作用 
  若返回一个 字符串 那么跳过后面的pitch 和跳过当前的loader 进入下一个loader
  比如 loader2.pitch return一个字符串 loader1.pitch => loader2.pitch =>loader1 (loader3.pitch =>loader3=>loader2 不会执行)
*/
```
- 写法
- 顺序问题 从右到左 从下到上
- loader的分类 
  - pre 在前面(enforce:pre,enforce来设置顺序)
  - post 在后面
  - normal 中间的
  - 顺序pre->normal->inline->post
  - inline-loader 内联loader 在代码中使用 不在webacpk内配置
```js
//1 、
rules:[
  {
    test:/.js$/,
    use:{
      loader:['loader1','loader2','loader3']
    }
  }
]
//2 、
rules:[
  {
    test:/.js$/,
    use:{
      loader:'loader1'
    }
  },
    {
    test:/.js$/,
    use:{
      loader:'loader2'
    }
  },
    {
    test:/.js$/,
    use:{
      loader:'loader3'
    }
  }
]
3、
// 创建 inline.js
function inlineLaoder (source){
  console.log('inline------------------',source)
  return source
}
module.exports = inlineLaoder

// index.js
let a = require('!!inline!./1.js')
// 内联loader 只有在引用的时候处理 其他情况下不处理  在前面家前缀有不同的效果 inline loader不会每个文件都处理
// -! 不会让文件 在去通过pre + normal loader来处理了
// ! 没有normal
// !! 上面都不要 只要inline 来处理
```

- loader 接受content('文件内容')
  - 1、loader 都是函数 参数就是所有文件的内容
  - 2、最后一个loader需要 返回一个js脚本的字符串 去执行
  - 3、每个loader只做一件内容 为了使loader在个人难过场景链式使用
  - 4、每一个loader都是一个模块
  - 5、每个loader都是无状态的 确保loader在不同模块转换之间不保持状态
```js
//  原理 
 getSource(modulePath){//获取资源
    // 需要判断 modulePath 是否是less文件
    // 获取规则
    let rules = this.config.module.rules;//所有的规则
    let content = fs.readFileSync(modulePath,'utf8');
    for(let i=0;i<rules.length;i++){
      let rule = rules[i]
      let {test,use} = rule
      let len = use.length - 1;//默认定位到最后一个loader
      if(test.test(modulePath)){
        // 这个路径需要用loader来解析
        function normalLoader(){
          // loader 原理
          let loader = require(use[len--]);
          // content 文件内容
          content = loader(content);
          if(len>=0){
            normalLoader();//递归来解析loader
          }
        }
        normalLoader()
      }
    }
    return content
  }
```
- 实现自己的loader 
  - 作用:每个文件都加上自己想要注释的内容
- banner-loader
```js
// banner-loader 编写
let loaderUtils = require('loader-utils')
// loaderUtils可以获取loader下面的options
let validateOptions = require('schema-utils')
// 创建骨架 用来比较传递进来的骨架是否类似
let fs = require('fs')
function loader(source){
  // 是否开启缓存
  this.cacheable(false)
   let options =  loaderUtils.getOptions(this)
   // 异步用this.async返回 否则直接用return
   let cb = this.async()
   let schema = {
     type:'object',
     properties:{
       text:{
         type:'string',
       },
       filename:{
         type:'string'
       }
     }
   }
   validateOptions(schema,options,'banner-loader')
   if(options.filename){
     // 自动添加文件依赖  webapck开启watch:true 作用 依赖文件变化wenpack会重新打包
     this.addDependency(options.filename)
     fs.readFile(options.filename,'utf8',(err,data)=>{
        cb(err,`/**${data}**/${source}`)
      })
    }else{
      cb(null,`/**${options.text}**/${source}`)
    }
}
module.exports = loader;

//  webapck配置
watch:true,
module:{
  rules:[
    {
      test:/\.js$/,
      use:{
        loader:'banner-loader',
        options:{
          presets:{
            text:'珠峰',
          },
          filename:path.resolve(__dirname,'banner.js')
        }
      }
    }
}
// 创建banner.js文件  输入=> songge
```
- babel-loader实现
  - yarn add @babel/core @babel/preset-env
```js
let babel = require('@babel/core')
let loaderUtils = require('loader-utils')
function loader(source){
  // this 当前上下文
  let options =  loaderUtils.getOptions(this);
  let cb = this.async();
  babel.transform(source,{
    ...options,
    sourceMap:true,
    filename: this.resourcePath.split('/').pop()
  },(err,result)=>{
    cb(err,result.code.result.map)
  })
}
module.exports = loader
```
- less-loader 
```js
  // less 模块
  let less = require('less');
  function loader(source){
    let css;
    // 转换的过程,同步 
    less.render(source,(err,output)=>{
      css = output.css
    });
    // css = css.replace(/\n/g,'\n')
    return css
  }
  module.exports = loader
```

- style-loader
```js
function loader(source){ //source less-loader转换后的结果
  //最终的loader需要 返回一个js脚本的字符串
  let str = `
  let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style)
  `
  return str
}
module.exports = loader
```
- file-loader
```js
let loaderUtils = require('loader-utils')

// 他要导出一个路径
function loader(source){
  console.log('source',source)
  // 根据图片格式生成图片路径
  let filename = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source})
  this.emitFile(filename,source);// 发射文件
  return `module.exports = "${filename}"`
}
loader.raw = true // 将源码转换成二进制
module.exports = loader
```
-url-loader
```js

let loaderUtils = require('loader-utils')
let mime = require('mime')
function loader(source){
  let options = loaderUtils.getOptions(this);
  let limit = options.limit
  if(limit && limit >source.length){
    // this.resourcePath 文件路径
    return `module.exports = "data:${mime.getType(this.resourcePath)};
    base64,${source.toString('base64')}"`
  }else{
    return require('./file-loader').call(this,source)
  }
}
loader.raw = true
module.exports = loader
// base64 格式 data:image/jpeg;base64,xxxxx;
```

## webpack 流程
- 1、webpack.config.js 解析 成一个对象
- 2、compiler编译 compiler=webpack(options); webapck初始化
  - a、创建Compiler对象
  - b、注册NodeEnvironmentPlugin插件
  - c、挂在options中的plugins插件
  - d、使用webpackOtptionApply初始化基础插件
- 3、run(开始编译)
  - a、调用compile开启编译
  - b、创建Compilation对象
    - 1、负责整体编译过程
    - 2、内部保留对compiler对象引用this.compiler
    - 3、this.entries入口
    - 4、this.modules 所有模块
    - 5、this.chunks 代码块
    - 6、this.assets 所有的资源
    - 7、template
- 4、buildMoudle分析入口文件创建模块对象
  - 1、获取所有资源
  - 2、AST语法解析 
  - 3、递归搜索依赖
- 5、emitFile();//发射文件

## 手写plugin
- 插件都是类 作用监听每个钩子上的事件
  - 每个插件都要有一个apply 方法
  - 插件都是类 this 就是compile对象

```js
  //原理
  if(Array.isArray(config.plugins)){
    config.plugins.forEach(p=>{
      // 每个插件都需要有一个 apply 方法
      p.apply(this);//每个插件都能拿到 compiler(this) 对象
    })
  }
```
- 同步&&异步插件
```js
// 同步
class DonePlugin {
  apply(compiler){
    compiler.hooks.done.tap('DonePlugin',(stats)=>{
      console.log('编译完成~~')
    })
  }
}

module.exports = DonePlugin
// 异步
class AsyncPlugin {
  apply(compiler){
    console.log('222222222222')
    compiler.hooks.emit.tapAsync('AsyncPlugin',(compliation,cb)=>{
        setTimeout(()=>{
          console.log('编译完成~~22')
          cb()
        },1000)
    });
    compiler.hooks.emit.tapPromise('AsyncPlugin',(compliation)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log('编译完成~~333')
          resolve()
        },1000)
      })
  });
  }
}

module.exports = AsyncPlugin
```

```js
class P1  {
  apply(compiler){
    compiler.hooks.done.tap('p1',()=>{
      console.log('done')
    })
  }
}
class P2  {
  apply(compiler){
    compiler.hooks.afterCompile.tap('p2',()=>{
      console.log('afterCompile')
    })
  }
}
  plugins:[
    new P1(),
    new P2()
  ]
```
- FileListPlugin 显示文件名字 和大小插件
```js
class FileListPlugin{
  constructor({filename}){
    this.filename = filename
  }
  apply(compiler){
    // 文件已经准备好了 要进行发射
    compiler.hooks.emit.tap('compiler',(compilcation)=>{
        let assets = compilcation.assets;
        // assets 存放所有打包资源 打包之后 就是bundle.js文件和index.html文件 后面添加 就直接打包添加的文件
        // 格式[ [bundle.js,{}],[index.html,{}] ]
        let content = `## 文件名 资源大小 \r\n `
        Object.entries(assets).forEach(([filename,statObj])=>{
          content += `- ${filename}  ${statObj.size()} \r\n`
        })
        // 资源对象 下面的就是打包出来的文件
        assets[this.filename] = {
          source(){
            return content
          },
          size(){
            return content.length
          }
        }
    })
  }
}
module.exports = FileListPlugin
```
- InlineSourcePlugin 把外链的标签 变成内联的标签
```js
// 把外链的标签 变成内联的标签
const HtmlWebpackPlugin = require('html-webpack-plugin')
class InlineSourcePlugin{
  constructor(match){
    this.match = match;//正则
  }
  progressTage(tag,compilation){// 处理某一个数据
    let newTag,url;
    if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
      newTag= {
        tagName:'style'
      }
      url = tag.attributes.href
    }
    if(tag.tagName === 'scfript' && this.reg.test(tag.attributes.src)){
      newTag= {
        tagName:'scfript'
      }
      url = tag.attributes.src
    }
    if(url){
      newTag.innerHTML = compilation.assets[url].source();//文件的内容放到innerHTML属性上面
      delete compilation.assets[url];// 删除掉原来应生成的资源
      return newTag
    }
    return tag;
  }
  progressTages(){// 处理引入标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.progressTage(headTag,compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.progressTage(bodyTag,compilation));
    });
    return {...data, headTags, bodyTags}
  }
  apply(compiler){
    // 要通过webpackPlugin来实现这个功能
    compiler.hooks.compilation.tap('MyPlugin',(compilation)=>{
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync
      ('alterPlugin',(data,cb)=>{
        data = this.progressTages(data);
        cb(null,data)
      })     
    })
  }
}
```
# webpack(基础)
[[toc]]

## base
- webacpk是啥
  -  WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
- webpack核心成员
  - Entry 入口,入口文件
  - Module 模块,一个文件对于一个模块,Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
  - Chunk 代码块,一个 Chunk 由多个模块组合而成，用于代码合并与分割
  - Loader 模块转换器,用于把模块原内容转换成新的内容
  - Plugin 拓展插件,在webpack构建的生命周期中 注入拓展逻辑 来改变构建结果
  - Output 输出结果
- webpack 基本搭建(基于webpack4)
  - npm install webpack webpack-cli -D
  - 创建src目录和dist/index.html(里面引入打包后的文件)
  - 创建webpack.config.js
  ```js
    let {join} = require('path')
    let htmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
      mode:'none',
      entry:join(__dirname,'./src/index.js'),
      output:{
        path:join(__dirname,'dist'),
        filename:'[name].js'
      },
      plugins:[
        new htmlWebpackPlugin({
          template:join(__dirname,'./src/index.html'),
          filename:'index.html'
        })
      ]
    }
  ```
  
## 个个击破
  <!-- - 配置开发服务器
  ```js
    npm i webpack-dev-server –D

    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8080
     }
  ```
    - contentBase 配置开发服务运行时的文件根目录
    - host：开发服务器监听的主机地址
    - compress 开发服务器是否启动gzip等压缩
    -  port：开发服务器监听的端口
  - 在package.json 配置脚本
  - --open 是启动后打开浏览器
  ```js
    "scripts": {
      "build": "webpack --mode development",
      "dev": "webpack-dev-server --open --mode development "
    }
  ``` -->
### loader?
  - 通过使用不同的Loader,Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等
  - test:正则匹配 拓展名
  - use:loader名称
  - include/exclude:屏蔽或者包含处理的文件夹  
  - query 为loader提供额外的设置选项
- 四种写法
  ```js
  // loader 
  {
    test: /\.css/,
    loader:['style-loader','css-loader']
  }
  // use
  {
    test: /\.css/,
    use:['style-loader','css-loader']
  }
  // use+loader
  {
    test: /\.css/,
    include: path.resolve(__dirname,'src'),
    exclude: /node_modules/,
    use: [{
        loader: 'style-loader',
        options: {
            insertAt:'top'
        }
    },'css-loader']
  }
  // 行内loader 
  import 'style-loader!css-loader!./index.css'
  ```
### 处理html
  ```js
    npm i html-webpack-plugin -D

    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定的模板名字
      filename: 'index.html', // 产出的文件名
      hash: true, // 为了避免缓存,可以在产出的资源后面添加hash值
      chunks: ['common', 'index', 'login', ], //引入多个js文件 默认是乱序, 要加入的配置(manual 手动) 才安排数组顺序加入
      chunksSortMode: 'manual', // 对引入代码块进行排序 
    })
  ```
<!-- ### 处理图片
  - file-loader 解决CSS等文件中的引入图片路径问题
  - url-loader 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝

  
  ``` -->
### 处理css
  - mini-css-extract-plugin 将css单独提取出来 link自动引入
    - filename 打包入口文件
    - chunkFilename 用来打包import('module')方法中引入的模块
    - 参考 js 异步加载 类似
  - style-loader 将文件引入(内连)
  - css-loader 的作用是处理css中的 @import 和 url 这样的外部资源
  - less-loader less/node-sass sass-loader 处理sass和less
  - `purgecss-webpack-plugin  glob`,一般与 glob、glob-all 配合使用, 必须和 mini-css-extract-plugin配合使用,可以去除未使用的 css
    - 注意:使用的时候 一般是处理 js 里面的样式文件  html 模板里面的处理不了
  - postcss-loader autoprefixer 增加前缀   
    - 用法
    - 在处理css 里面增加一个`postcss-loader`处理器
    - 第二个增加一个配置文件 postcss.config.js 或者用 options添加配置
```js
const purgecssWebpackPlugin =  require('purgecss-webpack-plugin')
let MiniCssExtractPlugin =  require('mini-css-extract-plugin')
    plugins: [
      //参数类似于webpackOptions.output
      new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename:'[id].css'
      })
    ]
    {
      test: /\.css/,
      include: path.resolve(__dirname,'src'),
      exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      },'css-loader']
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    },
    {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    // 增加前缀
    {
      test: /\.css$/, // 如果用到import 或者 require 文件 是css
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    },
    // postcss.config.js
    module.exports = {
      plugins: [require('autoprefixer')]
    }
    new purgecssWebpackPlugin({
      paths:glob.sync(`${path.join(__dirname,'src')}/**/*` ,{nodir:true})// 不匹配目录，只匹配文件
    })
```
### rem2px
- rem2px `px2rem-loader lib-flexible`
  - 计算 font-size
  - 这个逻辑代码 尽量放到head 标签中 在页面绘制前加载
  - remUnit 配置 代表页面 1rem 是多少 物理像素  通常将页面划分10个rem 所以这里一般是页面的宽度的十分之一
  - dpr 指物理像素(手机像素)比逻辑像素(css像素)
```js
{
  test:/\.css/,
  use:['style-loader','css-loader',{
    loader:'px2rem-loader',
    options:{
      remUnit:75,//1個rem是75像素 若宽度是375px 则被转换成5
      remPrecesion:8//rem的精度 保留8位
    }
  }]
}

let docEle = document.documentElement
function setRemUnit(){
  // docEle.style.fontSize = docEle.clientWidth/5 + 'px'
  docEle.style.fontSize = '10vw'
}
setRemUnit()
window.addEventListener('resize',setRemUnit)
```
### 在html中引入文件
- 在html中引入文件 他会通过 html-webpack-plugin 转换 这里可以通过固定的语法 加载`${}`
  - `raw-loader`加载文件原始内容
```html
<head>
  <!-- 引入html文件 -->
  ${require('raw-loader!./mate.html').default}
  <!-- 引入css文件 !!是忽略其他loader处理 -->
  <style>
  ${require('!!raw-loader!./inline.css').default}
  </style>
  <script>
    // html-webpack-plugin 能识别${}
    // 源文件交给raw-loader(行内loader)处理
    // raw-loader 加载文件原始内容
    ${require('raw-loader!../node_modules/lib-flexible/flexible.js').default} 
  </script>
</head>
```
### 处理图片
- file-loader 将图片复制到打包文件内 生成一个新的图片名字
- url-loader 内置了file-loader 添加配置 如果图片小于limit 他会变成base64字符串
- html-withimg-loader 在html中使用图片
```js
{
  test:/\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
    use:[
    {
      loader:'url-loader',
      options:{
        limit:10*1024,
        // name 修改名字 可以处理路径
        name:'img/[name].[hash].[ext]',
        // outputPath 专门处理路径
        outputPath: 'images',
        publicPath:'../images'
      }
    }
  ]
}
```
```js
{
  test: /\.(html|htm)$/,
  use: 'html-withimg-loader'
}
```
### 压缩图片
- `image-webpack-loader`可以帮助我们对图片进行压缩和优化(image-webpack-loader windows下载有问题)
```js
{
  test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
}
```

### 处理字体
- 配置loader
```js
{
 test:/\.(woff|ttf|eot|svg|otf)$/,
     use:{
        loader:'url-loader',
        options:{//如果要加载的图片大小小于10K的话，就把这张图片转成base64编码内嵌到html网页中去
          limit:10*1024,
          outputPath: 'images',
          publicPath:'../images'
       }
   }
 },
```
- 使用字体文件
```js
@font-face {
    src: url('./fonts/HabanoST.otf') format('truetype');
    font-family: 'HabanoST';
}

.welcome {
    font-size:100px;
    font-family: 'HabanoST';
}
```

### 处理js
- cnpm i -D babel-loader @babel/core @babel/preset-react @babel/preset-env
- cnpm i -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
- @ 代表一类库
- 配置有两种写法 下面是options配置 还可以创建一个.babelrc文件 将options里的对象 复制过
- `cnpm i -S @babel/plugin-transform-runtime @babel/runtime`  @babel/plugin-transform-runtime 是插件 他会依赖@babel/runtime
- options 里面内容尽量放到 .babelrc文件 测试 不然会报错(测试)
- eslint 处理代码校验 `cnpm i eslint eslint-loader babel-eslint -D`  配合vscode插件`eslint`保存自动处理代码 
  - eslint 是核心库 eslint-loader loader作用 babel-eslint 转义高级语法
  - 创建配置文件 .eslintrc.js
  - [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
  - airbnb需要的 `cnpm i eslint-config-airbnb eslint-loader eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y -D`
  - 安裝好 eslint 插件 和 配置 .eslintrc.js文件 不需要开启webpack就可以代码修复
  - 在.eslintrc.js文件配置和可以eslint插件一起使用  在webpack里面loader 内配置 仅仅在是 打包的时候 用
```js
{
    test: /\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options:{
         "presets": ["@babel/preset-env","@babel/preset-react"],
         "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
         ]
        }
    },
    include: path.join(__dirname,'src'),
    exclude:/node_modules/
},
{
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      "presets": [ // 插件的集合
        "@babel/preset-env", //转义ES6 ES7
        "@babel/preset-react", //转义 jsx语法
      ],
      "plugins": [ // 每个插件代表一个规则 需要传递参数 就写成数组
        ["@babel/plugin-proposal-decorators", { legacy: true }],// 处理装饰器语法
        ["@babel/plugin-proposal-class-properties", { loose: true }],//处理类的属性 
        // loose松散模式 
        ['@babel/plugin-transform-runtime',{
              corejs:false,
              helpers:true,
              regenerator:true,
              useESModules:true
            }]
      ]
    }
  }
}
/*
class A{
    static a=1
}
let a = new A()
console.log('index111',a,A.a)
*/
{
  loader:'eslint-loader',
  include: join(__dirname, './src')
  // exclude: /node_modules/
}
//.eslintrc
module.exports = {
  "parser":"babel-eslint",// 把源码转成语法树的工具
  "extends":"airbnb",// 继承airbnb规则
  env:{ //指定运行环境
    browser:true,
    node:true
  },
  rules:{
    "linebreak-style":"off",
    "indent": ["error", 4],//缩进风格
    "quotes": ["error", "double"],//引号类型 
    "semi": ["error", "always"],//关闭语句强制分号结尾
    "no-console": "error",//禁止使用console
    "arrow-parens": 0 //箭头函数用小括号括起来
    }
};
```
### css压缩&&js压缩
- mode设置`development`是不压缩的,`production`打包的时候自动压缩
- 用terser-webpack-plugin替换掉uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题
- 注意项 mode必须设置production,此外配置了optimization选项原有的js 在production 打包压缩会失效,要手动引起插件开启
```js
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");// 压缩css
  
  optimization: { // 这里放优化的内容
    minimizer: [ //表示放优化的插件
      new TerserPlugin({
        include:/\.min\.js/,对那些文件压缩
       
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp:/\.min\.css/,对那些文件压缩
        parallel: true, //开启多进程并进行压缩
        cache: true, //开启缓存
      })
    ]
  },
```
### 代码切割
```js
 optimization:{
    splitChunks:{//分隔代码块
      cacheGroups:{
        vendor:{//打包第三方
          chunks:'initial',//指定分隔的类型,默认有3中选项 all async initial
          name:'vendors',// 给分隔出去的代码块 起一个名字 vendors
          test:/node_modules/,//如果模块ID匹配这个正则的话,就会添加到vendors代码块中
          priority:-10,//优先级
        },
        commons:{
          chunks:'initial',
          name:'commons',
          minSize:0,//最小提取的字节
          minChunks:2,// 最少被几个chunk引用需要提取
          priority:-20
        }
      }
    }
  },
```
## 配置
###  glob 查找目录的所有文件
- cnpm i -S glob
```js
let glob = require('glob')

// glob.sync(`${path.join(__dirname,'src')}/**/*` ,{nodir:true})// 不匹配目录，只匹配文件
let rs = glob.sync('./src/**/*.{js,gif}')

console.log(rs) //返回src目录下所有的js和gif文件 不管多少层目录
```
### devtool 打包调试
- sourcemap 性能最差,效果最好,会生成一个source-map文件 能定位到行和列 
  - 不能缓存source-map文件,每次编译都会生成新的代码块文件,在生成环境下会影响性能
  - source-map生成配置文件 mappings里面的数据就是一个代码映射   
- eval 用最好的性能,但是只能映射到编译后的代码 主要是把编译前和后的代码关联起来
  - 生成代码 每个模块都被eval执行 进行缓存，并且存在 sourceURL 映射到对应的源码路径(dev启动服务),带eval的构建模式能cache SourceMap
  - 1、不需要生成单独的source-map文件
  - 2、eval代码包裹起来代码可以缓存
- cheap(廉价的)
  - 不包含列表信息
  - cheap-source-map 定位到行 但是是编译后的文件(babel 处理后的，不包含loader等)
- module
  - 包含loader的source-map(比如jsx to js,babel的source-map,源文件显示需要babel等loader处理,打包后的都是不需要loader处理的),否则无法定义源文件
  - cheap-module-source-map 定位到行 显示的源文件的代码
- inline 
  - 不会生成单独的source-map文件 将.map作为DataURL(base64)嵌入 到打包文件内
### mode
- production 默认会压缩js css不会压缩 要开启 optimization选项优化
- development 不会压缩
- none 啥都没
- 两种设置的方式
```js
1、在webpack mode赋值
2、在package.json配置
"build:dev": "webpack  --mode development",
"build:prod": "webpack  --mode production"
```
### hash
- hash 
  - 代表本次编译,每次编译一次,hash会变, 所有文件的hash都一样 默认是32位
- chunkhash 
  - 一个chunk代表一组模块(也就是对应着一个打包后的入口文件) 只要模块内只一个文件 发生变化 chunkhash就会变
  - 如果 output 用chunkhash 那么 他生的文件  chunkhash值不一样`不建议`
  - 当css 和 js 同时打包到一个js文件内,js 发生变化 chunkhash 会跟着变化,但是 contenthash 不会变化
- contenthash 
  - 指单个文件内容变化 他才变化 
- 注意  output filename/html 输出文件 只能用单独使用3个hash中的一种  因为 contenthash 指的是单个文件,contenthash会有很多，而filename/html是产出的是一个大文件,同样chunkhash 也是由多个文件组成

### 处理第三方库引用
- 1、那个页面需要 直接只用 
- 2、类似`lodash`&&`jquery`库 很多地方都能用到 可以配置全局里面
  - webpack配置ProvidePlugin后，在使用时将不再需要import和require进行引入，直接使用即可
  - 函数会自动添加到当前模块的上下文，无需显示声明
  - 这种注入模块相当于向模块内部注入了一个局部变量
- 3、通过`expose-loader`暴露插件
- 引入了第三方库又不想打包
  - 1、externals 通过script 每个页面引入模块 同时在用externals给他处理
  - 2、`html-webpack-externals-plugin`插件处理 通过引入cnd ,注意此插件要放到  htmlWebpackPlugin 后面
```js
// 1
import _ from 'lodash';
alert(_.join(['a','b','c'],'@'));

// 2
new webpack.ProvidePlugin({
    _:'lodash'
})
// 3
// ?是传参  !是分隔loader 和 原模块
import "expose-loader?$!jquery";
// 或者
{ 
  test: require.resolve("jquery"), 
  loader: "expose-loader?jQuery"
}

// 4、通过cdn 又想用import 语法 就要externals 配置
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
import $ from 'jquery'
externals: {
  jquery: 'jQuery'
},

// 5、通过插件  在页面中引入$模块即可使用
new htmlWebpackExternalsPlugin({
  externals:[
    {
      module:'$',//页面引入模块的名字
      entry:'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',
      global:'jQuery',//从全局对象的那个属性上获取导出的值
    }
  ]
})
```
### watch
- 当代码发生修改后可以自动重新编译
```js
module.exports = {
  //默认false,也就是不开启
  watch:true,
  //只有开启监听模式时，watchOptions才有意义
  watchOptions:{
      //默认为空，不监听的文件或者文件夹，支持正则匹配
      ignored:/node_modules/,
      //监听到变化发生后会等300ms再去执行，默认300ms
      aggregateTimeout:300,
      //判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
      poll:1000
  }
}
```
### 常用小插件
- 添加商标
- 拷贝静态文件 `copy-webpack-plugin`
- 情况 `clean-webpack-plugin`
```js
new webpack.BannerPlugin('珠峰培训'),
new CopyWebpackPlugin([{
  from: path.resolve(__dirname,'src/assets'),//静态资源目录源地址
  to:path.resolve(__dirname,'dist/assets') //目标地址，相对于output的path目录
}])
new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],})
```

### devServer   
- `webpack-dev-server` 
```js
  // 如果你使用了devServer那么所有产出的文件都会写到内存里,而不是写入到硬盘上,主要是为了速度
  devServer: {
    contentBase: path.join(__dirname, 'dist'),// 指定开启那个目录
    port:8080,
    host:'localhost',
    compress:true,//相当于启动gzip压缩
    // before 是一个钩子 此钩子会在web-dev-server启动之前执行
    before(app){ // 可以通过localhost:8080/users 直接访问到
      app.get('/users',(req,res)=>{
        res.json([{id:1,name:'zzzz'}])
      })
    },
    proxy:{
      // "/api":"http://localhost:3000",//这个情况是 访问 localhost:8080/api/users =>映射到 localhost:3000/api/users
      "/api":{
        target:"http://localhost:3000",
        pathRewrite:{
          "^/api":"",// api开头的 改为空
        },// 这种情况是  访问 localhost:8080/api/users =>映射到 localhost:3000/users
      }
    }
  },
```
### 热更新
- 配置hot
  - DevServer 默认不会开启模块热替换模式，要开启该模式，只需在启动时带上参数 --hot
  - cnpm i webpack@4.39.1 webpack-cli@3.3.6 webpack-dev-server@3.7.2 mime html-webpack-plugin express socket.io -S
  - 若配置不上 就删掉第三方库重新单独下载测试
```js
devServer:{
  // 告诉 DevServer 要开启模块热替换模式
  hot: true,      
}  
plugins:[
  // new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
  new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
]

// index.js
import {fun2} from './func'
let result = fun2();

let root = document.getElementById('root')
root.innerHTML = result
// 只有当开启了模块热替换时 module.hot 才存在
if (module.hot) {
  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
  // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
  module.hot.accept(['./func.js'], () => {
    // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
    let func = require('./func')
    let rs = func.fun2()
    root.innerHTML = rs
  });
}

// func.js
function fun1(){
  return 'func231'
}
function fun2(){
  return 'fu1111111111122'
}
export {
  fun1,
  fun2
}

// react例子

import { render } from 'react-dom';
import App from './App';
import './index.css';
render(<App/>, document.getElementById('root'));

// 只有当开启了模块热替换时 module.hot 才存在
if (module.hot) {
  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
  // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
  module.hot.accept(['./App'], () => {
    // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
    let App=require('./App').default;  
    render(<App/>, document.getElementById('root'));
  });
}
```
### resolve
- 文件查找规则,指定extension之后可以不用在 require 或者 import的时候加扩展名,会依次尝试添加扩展名进行匹配
- alias 配置别名
- modules 查找模块
- mainFields 默认情况下package.json 文件则按文件中main 字段的文件名来查找
- mainFiles 当目录下没有package.json文件,我们说会默认使用目录下的index.js文件
```js
resolve:{
// 按顺序 先找.js 在往后找
  extension:['.js','.jsx','.json','.css'],
//  配置别名 import bootstrap 直接找后面的文件
  alias:{
    "bootstrap":path.join(__dirname,"node_modules/bootstrap/dist/css/bootstrap.css"),
    'components': path.join(__dirname,'src'),// import rs from 'components/data.js' ==>定位到path.join(__dirname,'src','data.js')
  },
  // 第一个是减少查找路径 增快查找速度 第二个是添加额外额查找路径 只有是引入的时候 不添加路径 直接写包名
  modules:['node_modules','zfmoudle'],
  mainFields:['browser','module','main'],
  mainFiles:['index']
}
```

### resolveLoader
- 用于配置解析 loader 时的 resolve 配置,和文件查找的resolve配置差不多 这个一般是配置自己写的loader
```js
 resolveLoader: {
   // 第三方模块默认 查找的位子
    modules:['node_modules',path.resolve(__dirname,'loaders')],
    extensions:[ '.js', '.json' ],
    // 配置别名
    alias:{
      // 在loader中使用 loader1 就指向 __dirname/loaders/loaders1.js
      loader1:path.resolve(__dirname,'loaders','loaders1')
    }
    mainFields: [ 'loader', 'main' ]
  }
```

### noParse
- module.noParse 字段，可以用于配置哪些模块文件的内容不需要进行解析
- 不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
```js
// jquery lodash都是不需要依赖别的库
module: {
  noParse: /jquery|lodash/, // 正则表达式
  // 或者使用函数
  noParse(content) {
    return /jquery|lodash/.test(content)
  },
}
```
### DefinePlugin 
- DefinePlugin创建一些在编译时可以配置的全局常量
- 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值
- 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
- 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义
- JSON.stringify(true) 的结果是 'true'
```js
new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: "1",
    EXPRESSION: "1+2",
    COPYRIGHT: {
        AUTHOR: JSON.stringify("珠峰培训")
    }
})
```
### IgnorePlugin
- IgnorePlugin用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去
- 第一个是匹配引入模块路径的正则表达式
- 第二个是匹配模块的对应上下文，即所在目录名
```js
  // 使用moment的时候  所有的语言包可以引入了 给可以给他忽略 在手动引入所需要的语言 -->
  // js中
  import moment from 'moment';
  //手动引入所需要的语言
  import 'moment/locale/zh-cn';

  let webpack = require('webpack')
  plugins:[
    new webpack.IgnorePlugin('/\.\/locale/',/moment/)
  ]
```
### 区分不同环境
- 设置环境变量
- 这个不会影响 mode 也就是不会改变打包的结果
- webpack.config.js 配置文件 可以是对应 同样也可以是函数,函数里面有2个参数第一个就是env环境变量 第二个是所有的参数
```js
"build:dev": "webpack  --env=development",
"build:prod": "webpack  --env=production"

// webpack.config.js
module.exports = (env,argv)=>({
  mode:env,//动态设置环境变量
  optimization: { // 这里放优化的内容
    // 优化打包 如果是生产环境就压缩 否则不压缩
    minimizer:env==='production'?[ // 表示放优化的插件
      new TerserPlugin({
        parallel: true, // 开启多进程并进行压缩
        cache: true, // 开启缓存
      }),
      new OptimizeCSSAssetsPlugin({

      }),
    ]:[],
  },
})
// 同时在js内可以获取到
console.log('===',process.env.NODE_ENV)
```
### webpack-merge 拆分配置
```js
// webpack/webpack.client.js
let htmlPluginWebpack = require('html-webpack-plugin')
let path = require('path')
let {
  smart
} = require('webpack-merge')
let base = require('./webpack.config')

module.exports = smart(base, {
  entry: {
    client: path.join(__dirname, '../src/client.js')
  },
  mode: "production",
  plugins:[
    new htmlPluginWebpack({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html'
    })
  ]
})
```
### webpack-dev-middleware
- webpack-dev-middleware 就是在express中提供 静态服务能力的一个中间件 
- 原来是用webpack-dev-server 启动本地服务的 现在直接有express 项目开启服务(配上这个插件)
- 同时webpack-dev-server原理也是这样的  他内部用的express也是引入这个插件
```js
const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackOptions = require('./webpack.config')
webpackOptions.mode = 'development'
// compiler 代表整个编译对象
const compiler = webpack(webpackOptions) 
/**
 * 中间件做了什么 compiler.run
 * 1、启动编译 compiler.run
 * 2、使用一个中间件,用来响应客户端对打包后的文件请求
 */
app.use(webpackDevMiddleware(compiler,{}))
app.listen(3000)
```
### 多入口MPA
- 两种处理办法 
  - 1、多个js入口写多个entry 多个html 写多个HtmlWebpackPlugin 配置
  - 2、创建多个html和js文件 在将他们引入一一对应,动态生成entry和HtmlWebpackPlugin 
```js
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const htmlWebpackPlugins=[];
const glob = require('glob');
const entry={};
const entryFiles = glob.sync('./src/**/index.js');
entryFiles.forEach((entryFile,index)=>{
    let entryName = path.dirname(entryFile).split('/').pop();
    entry[entryName]=entryFile;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template:`./src/${entryName}/index.html`,
        filename:`${entryName}/index.html`,
        chunks:[entryName],
        inject:true,
        minify:{
            html5:true,
            collapseWhitespace:true,
            preserveLineBreaks:false,
            minifyCSS:true,
            minifyJS:true,
            removeComments:false
        }
    }));
}); 

module.exports={
    entry,
    plugins: [
        //other plugins
        ...htmlWebpackPlugins
    ]
}
```
### 日志优化
- 日志太多太少都不美观
- 可以修改`stats`
  - errors-only	只在错误时输出
  - minimal	    发生错误和新的编译时输出
  - none		    没有输出
  - normal		  标准输出
  - verbose		  全部输出
- friendly-errors-webpack-plugin 上面状态不会有成功或者失败的提示,安装插件后才有
  - success 构建成功的日志提示
  - warning 构建警告的日志提示
  - error 构建报错的日志提示
```js
plugins:[
  new FriendlyErrorsWebpackPlugin()
]
```
### 费时分析
```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();
module.exports =smw.wrap({
});
```
### webpack-bundle-analyzer
- 是一个webpack的插件，需要配合webpack和webpack-cli一起使用。这个插件的功能是生成代码分析报告，帮助提升代码质量和网站性能
- cnpm i webpack-bundle-analyzer 
- 配置脚本
  - `"generateAnalyzFile": "webpack --profile --json > stats.json", // 生成分析文件`
  - `"analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json" // 启动展示打包报告的http服务器`
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports={
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      generateStatsFile: true, // 是否生成stats.json文件
    })  // 使用默认配置
    // 默认配置的具体配置项
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: '8888',
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   excludeAssets: null,
    //   logLevel: info
    // })
  ]
}
```

### polyfill
- babel-polyfill
- Babel默认只转换新的JavaScript语法（syntax），如箭头函数等，而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码；因此我们需要polyfill 
- polyfill （它需要在源代码之前运行），我们需要让它成为一个 dependency（上线时的依赖）,而不是一个 devDependency（开发时的依赖）；
- polyfill-service
  - 自动化的 JavaScript Polyfill 服务
  - Polyfill.io 通过分析请求头信息中的 UserAgent 实现自动加载浏览器所需的 polyfills  
```js
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

### libraryTarget && library 
- 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们
- output.library 导出库的名称
- output.libraryExport 配置要导出的模块中哪些子模块需要被导出。 
  -  它只有在 output.libraryTarget 被设置成 commonjs 或者 commonjs2 时使用才有意义
  -  当值为 default 时，针对的`libraryTarget 为commonjs2` 因为 commonjs2 导出的是 default
  -  当值为 xx  自定义的时候, 针对的`libraryTarget 为commonjs` 因为 commonjs 是导出的 xx 为单个导出的对象
  -  在浏览器测试他的时候 用umd 进行 不然其他2中浏览器不支持导出方式
- output.libraryTarget 配置以何种方式导出库,是字符串的枚举类型，支持以下配置
- libraryTarget	 使用者的引入方式	使用者提供给被使用者的模块的方式 (可以自己自定义)
  - 1、var(默认)  => 只能以script标签的形式引入我们的库	只能以全局变量的形式提供这些被依赖的模块  只要是var 都要用script 标签引入
  - 2、commonjs/commonjs2(node导出模块) 要配合  libraryExport选择使用(默认 `default`,在写好的文件中 我们会通过export default 批量导出,如果当个导出的话 default就换成单个导出的名字)
  - commonjs    => exports 单个导出
  - commonjs2   => module.exports 整体导出
  - 3、umd	    => 可以用script、commonjs、amd引入	按对应的方式引入
  -  注意 umd 会把所有的模式发包 window 是浏览器才有的 global
```js
library:'xxx',// 导出库的名称
libraryTarget:'var',// 以何种方式导出
libraryExport:'default'// 导出那种属性

// src/index.js
// 单个导出用commonjs libraryExport设置为导出的名字
export function add(a,b){
  return a+b
}

export function minus(a,b){
  return a-b
}
export function multipty(a,b){
  return b*a
}
export function divide(a,b){
  return a/b
}
// 整体导出用commonjs2  libraryExport设置为 default
export default {
  add,
  minus,
  multipty,
  divide
}
// index.js 是package.json main对应的字段 别人用的入口

if(process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/index.min.js')
}else{
  module.exports = require('./dist/index.js')
}
```
### npm 发包
- npm login songg songge920322
- nrm use npm 切换源
- npm search xx 搜索xx名字是否有人用

- npm login 登录
- npm publish 发包


### 动态链接库DLL
- DllPlugin插件： 用于打包出一个个动态连接库 `const DllPlugin = require('webpack/lib/DllPlugin');`
- DllReferencePlugin: 在配置文件中引入DllPlugin插件打包好的动态连接库 `const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')`
- 流程:DllPlugin 插件将一些第三方库文件进行打包,DllReferencePlugin 插件是引入之前打包的配置文件,最后在index.html 里面引入之前的打包好的js文件库
```js
// 将第三方文件打包出来
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
  mode:'development',
  entry:{
    react:['react','react-dom']
  },// 希望把这些第三方库文件进行单独打包,就可以提高主体文件的打包速度
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].dll.js',// 打包出来一个文件react.dll.js
    libraryTarget:'var',// 默认是var 这个全局变量,如果以这种方式导出的话,只能用脚本的方式进行全局访问
    library:'_dll_[name]'//指定 文件导出的名字
  },
  module:{
  },
  plugins:[
    new DllPlugin({
      name:'_dll_[name]',// 这个与library 对应一致
      path:path.resolve(__dirname,'dist','[name].manifest.json')
    })
  ]
}
// 在配置webpack引入
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
new DllReferencePlugin({
  manifest:path.resolve(__dirname,'dist','react.manifest.json')
}),

// 在入口文件 scrpit标签引入
  <script src="../dist//react.dll.js"></script>
```

### Tree Shaking
- 一个模块可以有多个方法，只要其中某个方法使用到了，则整个文件都会被打到bundle里面去，tree shaking就是只把用到的方法打入bundle,没用到的方法会uglify阶段擦除掉
- 原理是利用es6模块的特点,只能作为模块顶层语句出现,import的模块名只能是字符串常量
- webpack默认支持，在.babelrc里设置module:false即可在production mode下默认开启
- The 'modules' option must be one of 'false' to indicate no module processing .babelrc
- 还要注意把devtool设置为null
- 用法避坑,需要注意的地方
  - 一定要注意尽量用es6 modules
  - 尽量编写没有副作用的代码
```js
  "presets":[
      ["@babel/preset-env",{"modules":true}],//转译 ES6 ES7
      "@babel/preset-react"//转译JSX语法
    ],

// 用法
// 1、没有导入和使用
function func1(){
  return 'func1';
}
function func2(){
     return 'func2';
}
export {
  func1,
  func2
}
import {func2} from './functions';
var result2 = func2();
console.log(result2);
//2、代码不会被执行，不可到达
if(false){
 console.log('false')
}
//3、代码执行的结果不会被用到
import {func2} from './functions';
func2();
//4、代码中只会影响死变量，只写不读
var aabbcc='aabbcc';
aabbcc='eeffgg';
```
### 开启Scope Hoisting(作用域提升)
- Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能。
- 初webpack转换后的模块会包裹上一层函数,import会转换成require
- 代码体积更小，因为函数申明语句会产生大量代码
- 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小
- 大量作用域包裹代码会导致体积增大
- 运行时创建的函数作用域变多，内存开销增大
- scope hoisting的原理是将所有的模块按照引用顺序放在一个函数作用域里，然后适当地重命名一些变量以防止命名冲突
- 这个功能在mode为production下默认开启,开发环境要用 webpack.optimize.ModuleConcatenationPlugin插件
- 也要使用ES6 Module,CJS不支持

### 代码块 (公开课,等源码看完再处理)   
- entry配置:通过多个entry文件来实现
- 动态加载(按需加载):通过主动使用import来动态加载
  - 1、首先如果遇到了 import 会把这个import的模块单独放到一个代码块中,这个代码块会单独生成一个文件
  - 2、首次加载的时候 只需要加载main.js 当遇到Import语句的时候 会向服务器发送一个jsonp请求,请求被分隔出去异步代码,然后合并到原来的modules,然后去加载这个新的模块,并且把这个模块的exports导出对象向后传递
- 抽取公共代码:使用 `splitChunks` 配置来抽取公共代码

### 设置环境变量
- 设置环境变量
  - 只能在node中获取(好像只能这个用&& 只能在node中获取 process.env.NODE_ENV_XX获取)
```js
  "dev": "set NODE_ENV_XX=xxx&&webpack-dev-server --config webpack.base.js",
```
- `cross-env` 安装库
- 配置脚本`"dev": "cross-env NODE_ENV_SS=testing webpack-dev-server"` 注意 cross-env 放在前面
- 利用define plugin 导出到全局访问
```js
new webpack.DefinePlugin({
  TEST:JSON.stringify(process.env.NODE_ENV_SS)
}),
```
- `process.env.NODE_ENV`可以在前端js文件内获取到

## webpack 源码入口分析
- npx webpack 执行的时候 他会找node_modules/bin/webacp.cmd
```js
//  %~dp0 是指当前的目录
// 他会去找 _webpack@4.41.2@webpack\bin\webpack.js
@SETLOCAL

@IF EXIST "%~dp0\node.exe" (
  @SET "_prog=%~dp0\node.exe"
) ELSE (
  @SET "_prog=node"
  @SET PATHEXT=%PATHEXT:;.JS;=;%
)

"%_prog%"  "%~dp0\..\_webpack@4.41.2@webpack\bin\webpack.js" %*
@ENDLOCAL
```
- webpack/bin/cli 是打包的入口  
```js
// 此文件可以单独 运行 他会执行打包
// 执行打包的核心 ..\_webpack@4.41.2@webpack\bin\webpack.js
const path = require("path");
const pkgPath = require.resolve(`webpack-cli/package.json`);
// eslint-disable-next-line node/no-missing-require
const pkg = require(pkgPath);
// eslint-disable-next-line node/no-missing-require
require(path.resolve(
  path.dirname(pkgPath),//webpack-cli
  "./bin/cli.js"// webpack-cli/./bin/cli.js 这个是一切打包的入口 打断点就在这儿
  // pkg.bin['webpack-cli']
));
```
### 编译和启动
- 比喻
  - Compiler 全局只有一个
  - Compilation 代表一次的编译 是有多个的
- Compiler和Compilation都继承自Tapable
- Compiler是每个Webpack配置对应的一个Compiler对象,记录Webpack的什么周期
- 在构建过程中,每次构建都会产生一个Compilation,Compilation是构建周期的产物
- Compiler模块是webpack最核心的模块
- 每次执行构建的时候,都会先实例化一个Compiler对象,然后调用它的 `run` 方法来开启一次完整的编译
- 启动
```js
// webpack-cli核心打包逻辑
const webpack = require('webpack')
const config = require('../webpack.config.js')
let compiler = webpack(config)
debugger;
compiler.run((err,stats)=>{ 
  console.log(err)
  /*
    返回的是主要含有modules、chunks和assets三个属性值的对象。
    entries 这里放的是入口模块
    chunks 编译出来了几个代码
    modules 编译出来的模块
    assets key 是文件的名称 值是文件内容
  stats.toJson(内部的) 用来过滤(这是为false)打印的数据 
  */  
  console.log(stats.toJson({
    entries:true,
    chunks:true,
    modules:true,
    assets:true 
  }))
})
```
- 通过上面的的debugger 调试 进入到Compiler.js 找到 this.hooks 将下面的代码调试加入 可以打印webpack的整体流程
- Compiler 里面很多hooks
```js
// 通过实例获取 构造函数
Object.keys(this.hooks).forEach(hookName=>{
  let hook = this.hooks[hookName]
  if(hook.tap){
    hook.tap('show',()=>{
      let hookType = Object.getPrototypeOf(hook).constructor.name
      console.log(`${hookName} ${hookType} ${hook._args}`)
    })
  }
})
```
### webpack的执行流程
```js
/*
environment    设置node环境变量
afterEnvironment    设置环境变量完成
entryOption   解析入口文件
afterPlugins     挂载插件结束 webpack.config.js会挂载很多插件
afterResolvers    在路径解析器初始化后触发 核心是给一个路径 他就能找到绝对路径
beforeRun  编译前
run  开始编译
normalModuleFactory 创建普通模块工厂  
contextModuleFactory   创建上下文模块工厂
beforeCompile  开始启动编译前
compile  编译
thisCompilation 开始启动编译  
compilation  创建一个 compilation
make  最核心的代码 是从入口文件开始编译
afterCompile  编译完成
shouldEmit  询问是否要生成文件
emit  生成文件
assetEmitted  资源已经生成
afterEmit 生成完成
done 整个编译完成
*/
```
### Stats 对象
```js
"generateAnalyzFile": "webpack --profile --json > stats.json", // 生成分析文件
// 或者
// npx webpack --profile --json > stats.json
```
### import 动态引入(异步加载)
- 打包后的文件名字 会默认加数字
- 可以通过 webpackChunkname 处理
- 也可以通过 output 的chunkFilename 配置(注意 filename不能写死 否则不生效)
```js
import(/* webpackChunkName:'lazy' */'./lazy.js').then(rs=>{
  console.log(rs.default)
})

// 通过点击按钮 在加载代码
let button = document.createElement('button');
button.innerHTML = '异步加载额外的模块'
button.onclick = function(){
  import(/* webpackChunkName:'lazy' */'./title.js').then(rs=>{
    console.log(rs.default)
  })
}
document.body.appendChild(button)
```
### module chunk assets 关系
- module 是每个文件打包的对象
- chunk 是一个入口文件所有的代码  包含多个module
- assets 将要打包的资源

### webpack的插件机制
- webpack实现插件机制的大体方式是
- 创建 - webpack在其内部对象上创建各种钩子；
- 注册 - 插件将自己的方法注册到对应钩子上，交给webpack；
- 调用 - webpack编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法
- Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundle的Compilation都是Tapable的实例
通过事件和注册和监听，触发webpack生命周期中的函数方法
```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable');
```
## tapable分类
- Hook类型可以分为 同步Sync 和 异步Async,异步又分为并行 和 串行
```js
/*
类型	使用要点
Basic	基本型: 不关心监听函数的返回值
Bail	保险式: 只要监听函数中有返回值(不为undefined)，则跳过之后的监听函数
Waterfall	瀑布式: 上一步的返回值交给下一步使用
Loop	循环类型: 如果该监听函数返回true,则这个监听函数会反复执行(从头开始执行)，如果返回undefined则退出循环

1、所有的构造函数都接收一个可选参数,参数是一个参数名的字符串数组
2、参数的名字可以任意填写,但参数数组的长度必须要根据实际接收的参数个数一致
3、如果回调函数的不接收参数,可以传入空数组
4、在实例化的时候传入的数组长度有用,值没有用途
5、执行call,参数个数和实例化时的数组长度有关
6、回调的时候是按先入先出的顺序执行的,先放先执行
*/
```
- SyncHook
  - SyncHook是一个构造函数 实例上有2个属性 tap 注册 call 发布 执行之前注册的函数
- SyncBailHook
  - 他的特点是 返回的值不是undefined 就会停止后续的调用
- SyncWaterfallHook
  - 用法如名字 瀑布流 如有返回值就传递给下一个回调函数,如没有就给传入的值
- SyncLoppHook
  - 不停的循环执行回调函数,直到函数的结果等于underfined,但是每次循环都是重头开始
- AsyncParallelHook
  - 异步并行执行钩子 就是普通的异步
  - 实例 有tapAsync 注册/callAsync 发布,tapPromise/promise
- intercept 拦截
  - 所有钩子都提供额外的拦截器 api
  - call 每次在call之前触发
  - tap 每次在挂载监听时候触发
  - register 下一个拦截器的register参数 取决于上一个register的返回值
  - loop 每次循环执行此拦截器
- Context(上下文)
  - context:true 就是支持上下文 后面的函数就有context对象
  - 他是全局唯一的 在那儿修改 都能获取

<!-- <img :src="$withBase('/img/tapable.png') " > -->

### 1、SyncHook 串行同步执行,不关心返回值
```js
//let {SyncHook}=require('tapable');
class SyncHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call() {
        this.tasks.forEach(task=>task(...arguments));
    }
}
let queue = new SyncHook(['name']);
queue.tap('1',function(name){
  console.log(name,1);
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
queue.call('ok');
```
### 2、SyncBailHook 串行同步执行，有一个返回值不为null则跳过剩下的逻辑
```js
//let {SyncBailHook}=require('tapable');
class SyncBailHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call() {
        // for (let i=0;i<this.tasks.length;i++){
        //     let ret=this.tasks[i](...arguments);
        //     if (ret)
        //         break;
        // }
        let i=0,ret;
        do {
            ret=this.tasks[i++](...arguments);
        } while (!ret);
    }
}
let queue = new SyncBailHook(['name']);
queue.tap('1',function(name){
  console.log(name,1);
  return 'Wrong';
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
queue.call('ok');
```
### 3、SyncWaterfallHook  瀑布 上一个函数有返回值就会传递给下一个做参数
```js
class SyncWaterfallHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call() {
        let [first,...tasks]=this.tasks;
        tasks.reduce((ret,task)=>task(ret),first(...arguments));

        //this.tasks.reduce((a,b) => (...args) => b(a(...args)))(...arguments);
    }
}
let queue = new SyncWaterfallHook(['name']);
queue.tap('1',function(name,age){
  console.log(name,age,1);
  return 1;
});
queue.tap('2',function(data){
    console.log(data,2);
    return 2;
});
queue.tap('3',function(data){
  console.log(data,3);
});
queue.call('ok',9);
```
### 4、SyncLoopHook 监听函数返回true表示继续循环，返回undefine表示结束循环
```js
//let {SyncHook}=require('tapable');
class SyncLoopHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args) {    
        this.tasks.forEach(task => {
            let ret=true;
            do {
                ret = task(...args);
            }while(ret == true || !(ret === undefined))
        });
    }
}
let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1',function(name){
    console.log(count++);
    if(count==3){
        return;
    }else{
        return true;
    }
});
queue.call('ok');
```
### 5、AsyncParallelHook 异步并行执行钩子
  - 5.1、tap
```js
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        this.tasks.forEach(task => task(...args));
        callback();
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
  - 5.2、tapAsync
```js
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,length = this.tasks.length;
        function done(err) {
            if (++i == length) {
                callback(err);
            }
        }
        this.tasks.forEach(task => {
            task(...args,done);
        });
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
    },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 5.3、tapPromise
```js
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let promises = this.tasks.map(task => task());
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('sg').then(()=>{
    console.timeEnd('cost');
})
```
### 6、AsyncParallelBailHook 带保险的异步并行执行钩子
  - 6.1、tap 
```js
//let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        for (let i=0;i<this.tasks.length;i++){
            let ret=this.tasks[i](...args);
            if (ret) {
                return callback(ret);
            }
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 6.2、tapAsync
```js
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let finalCallback=args.pop();
        let count=0,total=this.tasks.length;
        function done(err) {
            if (err) {
                return finalCallback(err);
            } else {
                if (++count == total) {
                    return finalCallback();
                }
            }
        }
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    console.log(1);
    callback('Wrong');
});
queue.tapAsync('2',function(name,callback){
    console.log(2);
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log(3);
    callback();
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 6.2、tapPromise
```js
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let args=Array.from(arguments);
        let promises = this.tasks.map(task => task(...arguments));
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });
});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject();
        },2000)
    });
});

queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});

queue.promise('sg').then(()=>{
    console.timeEnd('cost');
},err => {
    console.error(err);
    console.timeEnd('cost');
})
```
### 7、AsyncSeriesHook 异步串行钩子
  - 7.1、tap 
```js
let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 7.2、tapAsync
```js
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0, length = this.tasks.length;
        let next = () => {
            let task = this.tasks[index++];
            if (task) {
                task(...args, next);
            } else {
                finalCallback();
            }
        }
        next();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 7.3、tapPromise 
```js
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
         //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then(() => b());
        }, first(...args));
    }
}
let queue=new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('sg').then(data=>{
    console.log(data);
    console.timeEnd('cost');
});
```
### 8、AsyncSeriesBailHook
  - 8.1、tap
```js
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 8.2、tabAsync 
```js
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            task?task(...args,next):callback();
        }
        next();
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback('wrong');
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
- 8.3、tapPromise 
```js
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
       setTimeout(function(){
           console.log(1);
           //resolve();
           reject();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('sg').then(err=>{
    console.log(err);
    console.timeEnd('cost');
},err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
### 9、AsyncSeriesWaterfallHook 
  - 9.1、tap
```js
let {AsyncSeriesWaterfallHook} = require('tapable');
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tap('1',function(name,callback){
    console.log(1);
});
queue.tap('2',function(data){
    console.log(2,data);
});
queue.tap('3',function(data){
    console.log(3,data);
});
queue.callAsync('sg',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
  - 9.2、tapAsync 
```js
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesWaterfallHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err,data) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            if (task) {
                if (i==0) {
                    task(...args,next);
                } else {
                    task(data,next);
                }

            } else {
                callback(err,data);
            }
        }
        next();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback(null,1);
   },1000)
});
queue.tapAsync('2',function(data,callback){
    setTimeout(function(){
        console.log(2);
        callback(null,2);
    },2000)
});
queue.tapAsync('3',function(data,callback){
    setTimeout(function(){
        console.log(3);
        callback(null,3);
    },3000)
});
queue.callAsync('sg',(err,data)=>{
    console.log(err,data);
    console.timeEnd('cost');
});
```
 - 9.3、tapPromise 
 ```js
let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then((data) => b(data));
        }, first(...args));
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 1);
            resolve(1);
        }, 1000);
    });
});
queue.tapPromise('2', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 2);
            resolve(2);
        }, 2000);
    });
});
queue.tapPromise('3', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 3);
            resolve(3);
        }, 3000);
    });
});
queue.promise('sg').then(err => {
    console.timeEnd('cost');
});
 ```
### 10、tapable用法
 ```js
  const {Tapable,SyncHook} = require("tapable");
  const t = new Tapable();
  t.hooks = {
      myHook: new SyncHook()
  };
  let called = 0;
  t.plugin("my-hook", () => called++);
  t.hooks.myHook.call();
  t.plugin("my-hook", () => called += 10);
  t.hooks.myHook.call();
  console.log(called);

  // 同步
let {SyncHook, SyncBailHook,SyncWaterfallHook,} = require('tapable')

class Lesson1{
  constructor(){
    this.hooks = {
      // 必须传递一个值过去
      arch:new SyncHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
    }),
    this.hooks.arch.tap('react',function(name){
      console.log('react',name)
    })
  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson1();
l.tap() //注册这两个事件
l.start('xxxxxxxx') //启动钩子


// 阻塞
class Lesson2{
  constructor(){
    this.hooks = {
      arch:new SyncBailHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
      // return '想停止学习'
      //如是返回 undefined 就继续执行
    }),
    this.hooks.arch.tap('react',function(name){
      console.log('node',name)
    })
  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson2();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// 瀑布
class Lesson3{
  constructor(){
    this.hooks = {
      arch:new SyncWaterfallHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)//xx
      return '想停止学习'
      //如是返回 undefined 就继续执行
    }),
    this.hooks.arch.tap('react',function(name){
      console.log('node',name)//想停止学习
    })
  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson4();
l.tap() //注册这两个事件
l.start('xx') //启动钩子


class Lesson{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new SyncLoopHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
      return ++ this.index === 3? 'undefined' :'随便'
      //如是返回不是undefined 就一直循环 
    })

  }
  start(...args){
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson4();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// 异步 并行钩子 需要等待所有的并发异步事件执行后在执行回调方法
// 注册方法 分为 tap/tapAsync 
let {AsyncParallelHook,AsyncSeriesHook} = require('tapable')
class Lesson1{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncParallelHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapAsync('node',(name,cb)=>{
     setTimeout(()=>{
       console.log('node',name)
       cb()
     },1000)
    })
  }
  start(...args){
    this.hooks.arch.callAsync(...args,function(w){
      console.log('end')
    })
  }
}

let l = new Lesson2();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// 异步串行
class Lesson{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncParallelHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapPromise('node',(name)=>{
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('node',name)
        resolve()
      },1000)
     })
    })

  }
  start(...args){
    this.hooks.arch.promise(...args).then(()=>{
      console.log('end')
    })
  }
}

let l = new Lesson2();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

class Lesson3{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncSeriesHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapPromise('node',(name)=>{
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('node',name)
        resolve()
      },1000)
     })
    })

  }
  start(...args){
    this.hooks.arch.promise(...args).then(()=>{
      console.log('end')
    })
  }
}

let l = new Lesson3();
l.tap() //注册这两个事件
l.start('xx') //启动钩子

// AsyncSeriesWaterfallHook 异步
class Lesson4{
  constructor(){
    this.index= 0;
    this.hooks = {
      arch:new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tap(){// 注册监听函数
    this.hooks.arch.tapPromise('node',(name)=>{
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log('node',name)
        resolve('1')
      },1000)
     })
    })
    this.hooks.arch.tapPromise('react',(name)=>{
      return new Promise((resolve,reject)=>{
       setTimeout(()=>{
         console.log('react',name)
         resolve()
       },1000)
      })
     })
  }
  start(...args){
    this.hooks.arch.promise(...args).then(()=>{
      console.log('end')
    })
  }
}

let l = new Lesson4();
l.tap() //注册这两个事件
l.start('xx') //启动钩子
 ```
## AST 语法解析
- webpack和Lint等很多的工具和库的核心都是通过Abstract Syntax Tree抽象语法树这个概念来实现对代码的检查、分析等操作的。通过了解抽象语法树这个概念，你也可以随手编写类似的工具
- 用途
  - 代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
如JSLint、JSHint对代码错误或风格的检查，发现一些潜在的错误
IDE的错误提示、格式化、高亮、自动补全等等
  - 优化变更代码，改变代码结构使达到想要的结构
    - 代码打包工具webpack、rollup等等
    - CommonJS、AMD、CMD、UMD等代码规范之间的转化
    - CoffeeScript、TypeScript、JSX等转化为原生Javascript

<img :src="$withBase('/img/ast.jpg')" >

- JavaScript Parser
  - JavaScript Parser，把js源码转化为抽象语法树的解析器。
  - 浏览器会把js源码通过解析器转为抽象语法树，再进一步转化为字节码或直接生成机器码。
  - 一般来说每个js引擎都会有自己的抽象语法树格式，Chrome的v8引擎，firefox的SpiderMonkey引擎等等，MDN提供了详细SpiderMonkey AST format的详细说明，算是业界的标准。
  - 常用的JavaScript Parser有
    - esprima
    - traceur
    - acorn
    - shift
  - esprima用法 [ast参考](https://astexplorer.net/)
    - 通过 [esprima](https://www.npmjs.com/package/esprima) 把源码转化为AST
    - 通过 [estraverse](https://www.npmjs.com/package/estraverse) 遍历并更新AST 
    - 通过 [escodegen](https://www.npmjs.com/package/escodegen) 将AST重新生成源码
```js
  cnpm i esprima estraverse escodegen- S

  let esprima = require('esprima');
  var estraverse = require('estraverse');
  var escodegen = require("escodegen");
  let code = 'function ast(){}';
  // 解析
  let ast=esprima.parse(code);
  let indent=0;
  function pad() {
      return ' '.repeat(indent);
  }
  // 遍历节点
  estraverse.traverse(ast,{
      enter(node) {
          console.log(pad()+node.type);
          if(node.type == 'FunctionDeclaration'){
              node.id.name = 'ast_rename';
          }
          indent+=2;
      },
      leave(node) {
          indent-=2;
          console.log(pad()+node.type);

      }
  });
  // 将AST重新生成源码
  let generated = escodegen.generate(ast);
  console.log(generated);
```
### 转换箭头函数
    - 访问者模式Visitor 对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行操作也不同
  
```js
  //转换前
  const sum = (a,b)=>a+b
  //转换后
  // 实现
  let babel = require('@babel/core');
  let t = require('babel-types');
  const code = `const sum = (a,b)=>a+b`;
  // path.node  父节点
  // path.parentPath 父路径
  let transformArrowFunctions = {
      visitor: {
          ArrowFunctionExpression: (path, state) => {
              let node = path.node;
              let id = path.parent.id;
              let params = node.params;
              let body=t.blockStatement([
                  t.returnStatement(node.body)
              ]);
              let functionExpression = t.functionExpression(id,params,body,false,false);
              path.replaceWith(functionExpression);
          }
      }
  }
  const result = babel.transform(code, {
      plugins: [transformArrowFunctions]
  });
  console.log(result.code);
```

## loader解析
### loader运行的总体流程
- loader配置
  - 匹配(test)单个 loader，你可以简单通过在 rule 对象设置 path.resolve 指向这个本地文件
  - 匹配(test)多个 loaders modules
  - alias 
```js
  {
    test: /\.js$/
    use: [
      {
        loader: path.resolve('path/to/loader.js'),
        options: {/* ... */}
      }
    ]
  }

  resolveLoader: {
    modules: [path.resolve('node_modules'), path.resolve(__dirname, 'src', 'loaders')]
  },

  resolveLoader: {
    alias: {
      "babel-loader": resolve('./loaders/babel-loader.js'),
      "css-loader": resolve('./loaders/css-loader.js'),
      "style-loader": resolve('./loaders/style-loader.js'),
      "file-loader": resolve('./loaders/file-loader.js'),
      "url-loader": resolve('./loaders/url-loader.js')
    }
  },
```
### loader类型
- enforce 设置loader执行顺序
- loader的叠加顺序 proloader -> normalloader -> inline2 -> inline1 -> postloader
```js
// 行内loader
require ('inline1!inline2!./hello')
// pre前置 post后置 normal普通
{test:/hello\.js$/,loader:'preloader',enforce:'pre'},
{test:/hello\.js$/,loader:'postloader',enforce:'post'},
{test:/hello\.js$/,loader:'normalloader'},
```
- 变量 
  - !   不要前置loader
  - -!  不要普通loader和前置
  - !!  只要内联loader(不要前置 后置 普通loader)
```js
require ('-!inline1!inline2!./hello')
```
### 用法准则 
  - loaders 应该只做单一任务。这不仅使每个 loader 易维护，也可以在更多场景链式调用
  - 链式/利用 loader 可以链式调用的优势。写五个简单的 loader 实现五项任务，而不是一个 loader 实现五项任务
  - 无状态/确保 loader 在不同模块转换之间不保存状态。每次运行都应该独立于其他编译模块以及相同模块之前的编译结果。
  - loader 工具库
    - [loader-utils](https://github.com/webpack/loader-utils) 包。它提供了许多有用的工具，但最常用的一种工具是获取传递给 loader 的选项
    - [schema-utils](https://github.com/webpack/schema-utils) 包配合 loader-utils，用于保证 loader 选项，进行与 JSON Schema 结构一致的校验
  - 绝对路径
    - 不要在模块代码中插入绝对路径，因为当项目根路径变化时，文件绝对路径也会变化。loader-utils 中的 stringifyRequest 方法，可以将绝对路径转化为相对路径。
  - 同等依赖
    - 如果你的 loader 简单包裹另外一个包，你应该把这个包作为一个 peerDependency 引入
    - 
- API
  - webpack充分地利用缓存来提高编译效率
    - this.cacheable()
  ```js
    // 关闭该 Loader 的缓存功能 true则开启
    this.cacheable(false);
  ```

  - raw 
    - 默认的情况源文件是以 UTF-8 字符串的形式传入给 Loader,设置module.exports.raw = true可使用 buffer 的形式进行处理
    - 在默认的情况下，Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串。 但有些场景下 Loader 不是处理文本文件，而是处理二进制文件，例如 file-loader，就需要 Webpack 给 Loader 传入二进制格式的数据。 为此，你需要这样编写 Loader：
  ```js
    module.exports.raw = true;
    module.exports = function(source) {
      // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
      source instanceof Buffer === true;
      // Loader 返回的类型也可以是 Buffer 类型的
      // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
      return source;
    };
    // 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据 
    module.exports.raw = true;
  ```
### 获得 Loader 的 options
  ```js
  // webpack自带的工具包 
  const loaderUtils = require('loader-utils');
  module.exports = function(source) {
    // 获取到用户给当前 Loader 传入的 options
    const options = loaderUtils.getOptions(this);
    return source;
  };
  ```
### 异步处理
    - this.async();
  ```js
    // 让 Loader 缓存
    module.exports = function(source) {
        var callback = this.async();
        // 做异步的事
        doSomeAsyncOperation(content, function(err, result) {
            if(err) return callback(err);
            callback(null, result);
        });
    };
  ```
  ### 同步处理
  - Loader有些场景下还需要返回除了内容之外的东西。
  ```js
    module.exports = function(source) {
      // 通过 this.callback 告诉 Webpack 返回的结果
      this.callback(null, source, sourceMaps);
      // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
      // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
      return;
    };

    this.callback(
      // 当无法转换原内容时，给 Webpack 返回一个 Error
      err: Error | null,
      // 原内容转换后的内容
      content: string | Buffer,
      // 用于把转换后的内容得出原内容的 Source Map，方便调试
      sourceMap?: SourceMap,
      // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
      // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
      abstractSyntaxTree?: AST
    );
  ```
### 其他[API](https://webpack.js.org/api/loaders/)

  | 方法名        | 含义           |
  | ------------- |:-------------:| 
  | this.context     | 当前处理文件的所在目录，假如当前 Loader 处理的文件是 /src/main.js，则 this.context 就等于 /src | 
  | this.resource     | 当前处理文件的完整请求路径，包括 querystring，例如 /src/main.js?name=1。      | 
  | this.resourcePath | 当前处理文件的路径，例如 /src/main.js      |   
  | this.resourceQuery | 当前处理文件的 querystring      |   
  | this.target | 等于 Webpack 配置中的 Target      |   
  | this.loadModule | 但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时,就可以通过 this.loadModule(request: string, callback: function(err, source, sourceMap, module)) 去获得 request 对应文件的处理结果      |   
  | this.resolve | 像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string)      |   
  | this.addDependency | 给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)      |   
  | this.addContextDependency	 | 和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)     |   
  | this.clearDependencies | 清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()    |   
  | this.emitFile | 输出一个文件，使用方法为 emitFile(name: string, content: Buffer/string, sourceMap: {...})     |   
  | loader-utils.stringifyRequest |  把一个请求字符串转成一个字符串，以便能在require或者import中使用以避免绝对路径。如果你在一个loder中生成代码的话请使用这个而不要用JSON.stringify()      |   
  | loader-utils.interpolateName | 使用多个占位符或一个正则表达式转换一个文件名的模块。这个模板和正则表达式被设置为查询参数，在当前loader的上下文中被称为name或者regExp    |   

### loader实战

- 内联loader
  - ! 不要前置loader
  - -! 不要普通loader和前置
  - !! 只要内联loader(不要前置 后置 普通loader)
```js
require ('-!inline1!inline2!./hello')
```
- 处理 webpack 内部 loader 处理源码 简单解析 
```js
  getSource(modulePath){
    let rules = this.config.module.rules;
    let content = fs.readFileSync(modulePath,'utf8')
    // 拿到每个规则来处理
    for(let i=0;i<rules.length;i++){
      let rule = rules[i];
      let {test,use} = rule;
      let len = use.length - 1
      if(test.test(modulePath)){
          function normalLoader(){
            let loader = require(use[len--]);
            // 递归调用loader
            content = loader(content);
            if(len>=0){
              normalLoader()
            }
          }
          normalLoader()
      }
    }
    return content
  }
```

### pitch
    - 比如a!b!c!module, 正常调用顺序应该是c、b、a，但是真正调用顺序是 a(pitch)、b(pitch)、c(pitch)、c、b、a,如果其中任何一个loader pitch返回值不为undefined 那么它以及它右边的loader normal 已经执行完毕 值会传给上一个loader normal ,如果值为 undefined 就不影响loader normal
    - 比如如果b返回了字符串"result b", 接下来只有a会被系统执行，且a的loader收到的参数是result b
    - pitch与loader本身方法的执行顺序图

```js
      |- a-loader `pitch`
        |- b-loader `pitch`
          |- c-loader `pitch`
            |- requested module is picked up as a dependency
          |- c-loader normal execution
        |- b-loader normal execution
      |- a-loader normal execution

      // 3个loader
      // loader1 文件
      function loader1 (source){ //normal
        console.log('1111')
        return source
      }
      loader1.pitch = ()=>{ //pitch
        console.log('loader1')
      }

      module.exports = loader1

      // loader2 文件
      function loader1 (source){
        console.log('222')
        return source
      }
      loader1.pitch = ()=>{
        console.log('loader3')
      }

      module.exports = loader1


      // loader3 文件
      function loader1 (source){
        console.log('333')
        return source
      }
      loader1.pitch = ()=>{
        console.log('loader3')
      }
      module.exports = loader1

      rules:[
        {
          test:/.js$/,
          use:{
            loader:[path.resolve('src/loaders/loader1'),
                   [path.resolve('src/loaders/loader2'),
                   [path.resolve('src/loaders/loader3')]
          }
        }
      ]
      // 正常情况下没有pitch 执行顺序应该是 loader3=>loader2=>loader1=>
      // 加入pitch loader1.pitch => loader2.pitch => loader3.pitch =>loader3=>loader2=>loader1
      /* 
        pitch作用 
        若返回一个 字符串 那么跳过后面的pitch 和跳过当前的loader 进入下一个loader
        比如 loader2.pitch return一个字符串 loader1.pitch => loader2.pitch =>loader1 (loader3.pitch =>loader3=>loader2 不会执行)
      */
    ```
  - 处理css
    - css-loader 的作用是处理css中的 @import 和 url 这样的外部资源
    - style-loader 的作用是把样式插入到 DOM中，方法是在head中插入一个style标签，并把样式写入到这个标签的 innerHTML里
    - less-loader Compiles Less to CSS
  - less-loader.js
  ```js
    let less = require('less');
    module.exports = function (source) {
        let callback = this.async();
        less.render(source, { filename: this.resource }, (err, output) => {
            this.callback(err, output.css);
        });
    }
```

### loader-utils

```js
  // 1、stringifyRequest
  // 作用将路径转换为绝对路径 在loader中使用
  loaderUtils.stringifyRequest(this,'地址') 
  // 2、getOptions
  // loaderUtils.getOptions能获取当前的options 配置
  let  options = loaderUtils.getOptions(this); 
  // 3、interpolateName
  // loaderUtils.interpolateName 方法可以根据 options.name 以及文件内容生成一个唯一的文件名 url（一般配置都会带上hash，否则很可能由于文件重名而冲突）
  let url = loaderUtils.interpolateName(this, options.filename || "[hash]", {content});// content 当前的resource
  
```

### 1、babel-loader
- babel 插件写法(提交例子可以参考 箭头函数的转换=>搜索 ArrowFunctionExpression)
```js
let transformArrayFunction = {
  // visitor 可以访问源代码生成的语法树的所有节点,捕获特定的节点
  visitor:{
    // 节点
    Identifier:(path,state)=>{
      console.log(path.node)
    }
  }
}
let rs = babel.transform(sourceCode,{
  plugins:[transformArrayFunction]
},(err,rs)=>{
  console.log(rs.code)
})
```
- `babel.transform` 将源代码 转义成ast,他的作用只是ast 其他的处理全部交给插件处理,同时加入配置 这里的options和webpack loader里面的配置是一模一样的 
```js
const path = require('path')
const babel = require('@babel/core')
const loaderUtils = require('loader-utils');
function loader(inputSource){ 
  // 
  let  options = loaderUtils.getOptions(this);
  console.log(options)
   options = {
     ...options,//二选一
    // presets:[  "@babel/preset-env"],
    sourceMaps:true,// 告诉babel我要生成sourcemap 如果提供了 webpack sourcemap就用它的 不给它自己弄 , 要设置 devtool:'source-map' 自己设置后names 选项就有值了
    filename:path.basename(this.resourcePath)// 内部的api this上提供的 当前处理文件的路径，例如 /src/main.js
  }
  //  转义之后会生成3个文件
  let {code,map,ast} = babel.transform(inputSource,options);
  console.log(code,map,ast)
  // 我们可以吧sourcemap ast 都传给webpack 这样webpack就不需要自己吧源代码转语法树了，也不需要自己生成sourcemap
  return this.callback(null,code,map,ast)
}
module.exports = loader
```
### 2、banner-loader
```js
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');
function loader(source) {
    //把loader改为异步,任务完成后需要手工执行callback
    let cb = this.async();
    //启用loader缓存
    this.cacheable && this.cacheable();
    //用来验证options的合法性
    let schema = { 
        type: 'object',
        properties: {
            filename: {
                type: 'string'
            },
            text: {
                type: 'string'
            }
        }
    }
    //通过工具方法获取options
    let options = loaderUtils.getOptions(this);
    //用来验证options的合法性
    validateOptions(schema, options, 'Banner-Loader');
    let { text, filename } = options;
    if (text) {
        cb(null, text + source);
    } else if (filename) {
        fs.readFile(filename, 'utf8', (err, text) => {
            cb(err, text + source);
        });
    }
}
module.exports = loader;
```
### 3、style-loader
  ```js
    let loaderUtils=require("loader-utils");
    function loader(source) {
        let script=(`
          let style = document.createElement("style");
          style.innerHTML = ${JSON.stringify(source)};
          document.head.appendChild(style);
        `);
        // JSON.stringify 在处理的时候 会添加\r\n 要将他们删除 否则会报错
    style = style.replace(/(\\n|\\r)/g,'')
        return script;
    } 
    /*
      pitch 作用是 让两个loader配合使用
      
      ** 最后 require是在浏览器执行的
      
      如果不加 !! 会出现死循环
      
      处理 css 的时候  会先执行 style pitch 如果用loader处理(他无法处理js) 在pitch处理的时候他能通过`remindingRequest`获取剩下的loader 这里要在loader加!! 表示 只能当前的loader(或者叫内联loader处理) 如果不他 他还会走到`style-loader`内 会造成无线循环
    
    */ 
    loader.pitch = function (request) {
        let style = `
        var style = document.createElement("style");
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, "!!" + request)});
        document.head.appendChild(style);
    `;
        return style;
    }
    module.exports = loader;
  ```

### 4、css-loader
  - 作用是处理css中的 @import 和 url 这样的外部资源
  - 安装`postcss` 将css 转换成ast语法树
  - postcss 是用来解析css 转换成ast(类似) 
    - 他和babel一样只有分解功能 没有变化功能,具体操作需要插件 
  - 用法(下面是固定格式,具体例子看下面 css-loader)
  - css-loader的原理 解析css 语法 找到 url 个 @import 将他们替换成 `require` 语法,将处理的数据 返回给 style-loader 处理
  ```js
    <!-- 插件 -->
    function createPlugin(options){
      return function(css){ })
      }
    }
    postcss([createPlugin(options)]).process(inputSource,{from:undefined}).then(rs=>{console.logo('rs',rs)}
  ```
  ```js
    <!-- 简单版本 模仿 -->
    function loader(source) {
        let reg = /url\((.+?)\)/g;
        let current;
        let pos = 0;
        let arr = [`let lists = [];`];
        while (current = reg.exec(source)) {
            let [matchUrl, p] = current;
            let index = reg.lastIndex - matchUrl.length;
            arr.push(`lists.push(${JSON.stringify(source.slice(pos, index))})`);
            pos = reg.lastIndex;
            arr.push(`lists.push("url("+require(${p})+")")`);
        }
        arr.push(`lists.push(${JSON.stringify(source.slice(pos))})`);
        arr.push(`module.exports = lists.join('')`);
        return arr.join('\r\n');
    }
    module.exports = loader;

    <!-- 原理 -->
    const postcss = require('postcss')
    const Tokenizer = require('css-selector-tokenizer')
    const loaderUtils = require('loader-utils');

    function createPlugin(options){
      return function(css){
        let {urlItems,importItems} = options
        // 遍历 import 语法
        css.walkAtRules(/^import$/,function(rule){
          let values = Tokenizer.parseValues(rule.params)
          let url = values.nodes[0].nodes[0]  //{value:'./base.css'}
          importItems.push(url.value)
          
        })
        // 遍历每一条规则
        css.walkDecls(function(decl){
          // 将字符串转成对象
          let values = Tokenizer.parseValues(decl.value)// '75px solid red'
          values.nodes.forEach(value=>{
            value.nodes.forEach(item=>{
              if(item.type === 'url'){
                let url = item.url
                item.url = `_CSS_URL_${urlItems.length}_`
                urlItems.push(url) // .avatar.gif
              }
            })
          })
          // 将对象转成字符串
          decl.value = Tokenizer.stringifyValues(values)
        })
      }
    }

    function loader(inputSource){
      let callback = this.async()
      let options = {
        importItems:[],
        urlItems:[]
      };
      // loaderUtils.stringifyRequest他 可以把一个绝对路径 转换成合适loader的相对路径
      // background-img:url(./avatar.gif)
      postcss([createPlugin(options)]).process(inputSource,{from:undefined}).then(rs=>{
        let importJs = options.importItems.map(imp=>{
          // return '"+require("'+imp+'")+"'
          return "require("+loaderUtils.stringifyRequest(this,imp)+")"
        }).join('\n')// @import './base.css';
        let cssString = JSON.stringify(rs.css)// url('_CSS_URL_0_')
      
        // 替换 @import './base.css'
        cssString = cssString.replace(/@import\s+?.+?;/,"")
        // 替换 url('_CSS_URL_0_')
        cssString = cssString.replace(/_CSS_URL_(\d+?)_/g,function(matched,group1){
          let imageUrl = options.urlItems[+group1];
          //  打包的时候 imageUrl 变成真实的地址  最后 require是在浏览器执行的
          return '"+require("'+imageUrl+'")+"';
        });
        console.log('importJs',importJs)
          // ${importJs}
        callback(null,`
          ${importJs}
          module.exports = ${cssString};
        `)
      })
    }

    module.exports = loader
  ```
### exact-loader
  ```js
    //把CSS文件单独放置到一个文件中去，然后在页面中通过link标签去引入
    let loader = function (source) {
        //发射或者说输出一个文件，这个文件的内容 就是css文件的内容
        this.emitFile('main.css', source);
        let script = `
        let link  = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href','main.css');
        document.head.appendChild(link);
      `;
        return script;
    }
    module.exports = loader;
  ```
### file-loader

- file-loader 并不会对文件内容进行任何转换，只是复制一份文件内容，并根据配置为他生成一个唯一的文件名。
- 通过 loaderUtils.interpolateName 方法可以根据 options.name 以及文件内容生成一个唯一的文件名 url（一般配置都会带上hash，否则很可能由于文件重名而冲突）
- 通过 this.emitFile(url, content) 告诉 webpack 我需要创建一个文件，webpack会根据参数创建对应的文件，放在 public path 目录下
- 返回 module.exports = ${JSON.stringify(url)},这样就会把原来的文件路径替换为编译后的路径

```js
  const { getOptions, interpolateName } = require('loader-utils');
  function loader(content) {
      let options=getOptions(this)||{};
      let url = interpolateName(this, options.filename || "[hash]", {content});
      url = url  + this.resourcePath.slice(this.resourcePath.lastIndexOf('.'));
      //发射一个文件 向输出里保存一个文件
      this.emitFile(url, content);
      return `module.exports = ${JSON.stringify(url)}`;
  }
  loader.raw = true;
  module.exports = loader;
```
### url-loader 
  ```js
  let { getOptions } = require('loader-utils');
  var mime = require('mime');
  function loader(source) {
      let options=getOptions(this)||{};
      let { limit, fallback='file-loader' } = options;
      if (limit) {
        limit = parseInt(limit, 10);
      }
      const mimetype=mime.getType(this.resourcePath);
      if (!limit || source.length < limit) {
          let base64 = `data:${mimetype};base64,${source.toString('base64')}`;
          return `module.exports = ${JSON.stringify(base64)}`;
      } else {
          let fileLoader = require(fallback || 'file-loader');
          return fileLoader.call(this, source);
      }
  }
  loader.raw = true;
  module.exports = loader;
  ```
### sprite-loader
- 用法 在图片后面加?sprite 做标识  loader内部 判断有这个 会组合成一张图片 在给他们增加一个`background-position`属性
```css
.one{
  background-image:url(../img/1.jpg?sprite) ;
  width: 400px;
  height: 400px;
}

.two{
  background-image:url(../img/2.jpg?sprite) ;
  width: 400px;
  height: 400px;
}

.three{
  background-image:url(../img/3.jpg?sprite) ;
  width: 400px;
  height: 400px;
}
```
```js
  const postcss = require('postcss')
  const path = require('path')
  const loaderUtils = require('loader-utils')
  const SpriteSmith = require('spritesmith')
  const Tokenizer = require('css-selector-tokenizer')
  function loader(inputSource){
      let callback = this.async();
      let that = this;//this.context 代表被加载资源的上下文目录
    function createPlugin(postcssOptions){
      return function(css){
        css.walkDecls(function(decl){
          let values = Tokenizer.parseValues(decl.value)
          values.nodes.forEach(value=>{
            value.nodes.forEach(item=>{
              if(item.type == 'url' && item.url.endsWith('?sprite')){
                // 拼一个路径 找到的是这个图片的绝对路径
                let url = path.resolve(that.context,item.url)
                item.url = postcssOptions.spriteFilename;
                // 案例说我要在当前规则下面添加一条background-position
                postcssOptions.rules.push({
                  url,// 原始图片的绝对路径,未来合并雪碧图用
                  rule:decl.parent // 
                })
              }
            })
          })
          decl.value = Tokenizer.stringifyValues(values)
        })
        // css 添加数据 先给他们一个占位符 在替换 
        postcssOptions.rules.map(item=>item.rule).forEach((rule,index)=>{
          // 注意这个的 index 用法 首次数组为空  加一个数组内容对应的index 就会变化
          rule.append(
            postcss.decl({
              prop:'background-position',
              value:`_BACKGROUND_POSITION_${index}_`
            })
          )
        })
      }
    }
    const postcssOptions = {spriteFilename:'sprite.jpg',rules:[]}
    let pipeline = postcss([createPlugin(postcssOptions)]);
    pipeline.process(inputSource,{from:undefined}).then(rs=>{
      let cssStr = rs.css
      let sprites = postcssOptions.rules.map(item=>item.url.slice(0,item.url.lastIndexOf('?')))

      SpriteSmith.run({src:sprites},(err,result)=>{
        let coordinates = result.coordinates
        Object.keys(coordinates).forEach((key,index)=>{
          cssStr = cssStr.replace(`_BACKGROUND_POSITION_${index}_`,`-${coordinates[key].x}px -${coordinates[key].y}px`)
        })
        that.emitFile(postcssOptions.spriteFilename,result.image)
        // 注意 导出的是模块是字符串 要加'' JSON.stringify功能就是加''但是他比直接加'' 要好,他可以出来\n  
        console.log(cssStr)
        callback(null,`module.exports = ${JSON.stringify(cssStr)}`);
      })
    })
  }
  loader.raw = true
  module.exports = loader
```

### px2rem-loader
```js
  const postcss = require('postcss')
  const path = require('path')
  const loaderUtils = require('loader-utils')
  const SpriteSmith = require('spritesmith')
  const Tokenizer = require('css-selector-tokenizer')
  function loader(inputSource){
      let callback = this.async();
      let {remUnit=75,remPrecision=8} = loaderUtils.getOptions(this)
      let that = this;//this.context 代表被加载资源的上下文目录
    function createPlugin(postcssOptions){
      return function(css){
        css.walkDecls(function(decl){
          let values = Tokenizer.parseValues(decl.value)
          values.nodes.forEach(value=>{
            value.nodes.forEach(item=>{
              if(item.name.endsWith('px')){
                let px =  parseInt(item.name);
                let rem = (px/remUnit).toFixed(remPrecision);
                item.name = rem+'rem';
              }
            })
          })
          decl.value = Tokenizer.stringifyValues(values)
        })
      }
    }
    const postcssOptions = {}
    let pipeline = postcss([createPlugin(postcssOptions)]);
    pipeline.process(inputSource,{from:undefined}).then(rs=>{
      let cssStr = rs.css
      callback(null,`module.exports = ${JSON.stringify(cssStr)}`);
    })
  }
  module.exports = loader
```

## plugin解析
- 插件向第三方开发者提供了 webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 webpack 构建流程中。创建插件比创建 loader 更加高级，因为你将需要理解一些 webpack 底层的内部特性来做相应的钩子
- 为什么需要一个插件
  - webpack基础配置无法满足需求
  - 插件几乎能够任意更改webpack编译结果
  - webpack内部也是通过大量内部插件实现的
- 可以加载插件的常用对象

|     对象        | 钩子           | 
| --------------------------- |:-------------:| 
| Compiler      | run,compile,compilation,make,emit,done | 
| Compilation    | buildModule,normalModuleLoader,succeedModule,finishModules,seal,optimize,after-seal      | 
| Module Factory | beforeResolver,afterResolver,module,parser     | 
| Module      |  | 
| Parser      | program,statement,call,expression | 
| Template      | hash,bootstrap,localVars,render | 

###  创建插件
  - webpack 插件由以下组成：
    - 一个 JavaScript 命名函数。
    - 在插件函数的 prototype 上定义一个 apply 方法。
    - 指定一个绑定到 webpack 自身的事件钩子。
    - 处理 webpack 内部实例的特定数据。
    - 功能完成后调用 webpack 提供的回调。
### Compiler 和 Compilation
  - 在插件开发中最重要的两个资源就是compiler和compilation对象。理解它们的角色是扩展webpack引擎重要的第一步。
    - compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
    - compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。
- 基本插件架构
  - 插件是由「具有 apply 方法的 prototype 对象」所实例化出来的。
  - 这个 apply 方法在安装插件时，会被 webpack compiler 调用一次。
  - apply 方法可以接收一个 webpack compiler 对象的引用，从而可以在回调函数中访问到 compiler 对象。
  ```js
  // 原理
    if (options.plugins && Array.isArray(options.plugins)) {
      for (const plugin of options.plugins) {
        plugin.apply(compiler);
      }
    }
  ```
  - 一个简单的插件结构如下：
  ```js
    class DonePlugin{
        constructor(options) {
            this.options=options;
        }
        apply(compiler) {
            compiler.hooks.done.tap('DonePlugin', ()=> {
                console.log('Hello ',this.options.name);
            });
        }
    }
    module.exports=DonePlugin;
  ```
  - 然后，要安装这个插件，只需要在你的 webpack 配置的 plugin 数组中添加一个实例：
  ```js
    const DonePlugin=require('./plugins/DonePlugin');
    module.exports={
        entry: './src/index.js',
        output: {
            path: path.resolve('build'),
            filename:'bundle.js'
        },
        plugins: [
            new DonePlugin({name:'sg'})
        ]
    }
  ```
  - 异步编译插件
    - 有一些编译插件中的步骤是异步的，这样就需要额外传入一个 callback 回调函数，并且在插件运行结束时，必须调用这个回调函数。
  ```js
  class CompilationAsyncPlugin{
    constructor(options) {
        this.options=options;
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('EmitPlugin',function (compilation,callback) {
            setTimeout(function () {
                console.log('异步任务完成');
                callback();
            },500);
        });
    }
  }
  module.exports=CompilationAsyncPlugin;
  ```
  - 输出文件列表
  ```js
  class FileListPlugin{
      constructor(options) {
          this.options = options;
      }
      apply(compiler) {
          compiler.hooks.emit.tap('FileListPlugin', (compilation) =>{
              let filelist='## 文件列表';
              filelist = Object.keys(compilation.assets).reduce((filelist,filename)=>filelist+'\r\n- '+filename,filelist);
              compilation.assets[this.options.name?this.options.name:'filelist.md']={
                  source() {
                      return filelist;
                  },
                  size() {
                      return filelist.length
                  }
              }
          });
      }
  }
  module.exports=FileListPlugin;
  ``` 
## handWriteWebapck
### Webpack流程概括
  - 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数； 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
  - 确定入口：根据配置中的 entry 找出所有的入口文件；
  - 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
  - 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
  - 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
  - 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
  
- 钩子
  - entryOption 读取配置文件
  - afterPlugins 加载所有的插件
  - run 开始执行编译流程
  - compile 开始编译
  - afterCompile 编译完成
  - emit 写入文件
  - done 完成整体流程
- 编写示例项目
```js
  npm init -y
  yarn add webpack webpack-cli html-webpack-plugin

  // 编写webpack配置文件
  // webpack.config.js
  const path = require('path');
  module.exports = {
      mode: 'development',
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js'
      },
      module: {
        // rules 里面的内容 等自己写的webpack增加loader解析后 在加入
        // rules: [
        //     {
        //     test: /.less$/,
        //     use: [
        //       path.resolve(__dirname,'loaders','style-loader'),
        //       path.resolve(__dirname,'loaders','less-loader'),
        //     ]
        //   }
        // ]
      },
      plugins: []
  }
  // 创建loaders/less-loader
    let less = require('less')
    function loader(source){
      let css = '';
      less.render(source,function(err,c){
        css = c.css
      })
      css = css.replace(/\n/g,'\\n')
      return css;
    }
    module.exports = loader
  // 创建loaders/style-loader
    function loader(source){
      let style = `
      let style = document.createElement('style')
      style.innerHTML = ${JSON.stringify(source)}
      document.head.appendChild(style)
      `
      return style;
    }
    module.exports = loader

    // 拿到的source 是有空格的 通过JSON.stringify 可以去掉
```
- 源文件
```js
// src/index.js
let a1=require('./a1');
console.log(a1);
// src/a1.js 
let a2=require('./base/a2');
module.exports='a1'+a2;
// src/base/a2.js
module.exports='a2';
```
-  产出bundle.js
```js
(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({

    "./src/a1.js":
      (function (module, exports, __webpack_require__) {
        eval("let a2 = __webpack_require__( \"./src/base/a2.js\");\r\nmodule.exports = 'a1' + a2;");
      }),
    "./src/base/a2.js":
      (function (module, exports) {
        eval("module.exports = 'a2';");
      }),

    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        eval("let a1 = __webpack_require__(\"./src/a1.js\");\r\nconsole.log(a1);");
      })
  });
```
### 安装依赖包
- 1、准备
```js
  1、创建 webpackSg文件
  2、npm init -y
  3、修改package.json文件
      "bin": {
        "hardwebpack": "./bin/pack.js"
      },
  4、创建 bin/pack.js
```
- 2、入口文件处理(bin/pack.js)
```js
#! /usr/bin/env node
// 1、 需要找到当前执行名的路径  拿到webpakcc.config.js
let path = require('path')
// config 配置文件
let config = require(path.resolve('webpack.config.js'))
// let config = require(path.join(process.cwd(),'webpack.config.js'))
let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config)

compiler.run()
```
- 3、创建lib/Compiler.js
  - 实现基本的 引入文件
```js
let fs = require('fs')
let path = require('path')

let babylon = require('babylon')
let t = require('@babel/types')
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default
let ejs = require('ejs')
// babylon 主要就是把源码  他里面有个方法叫parse 转换成ast
// @babel/traverse 遍历节点
// @babel/types 替换
// @babel/generator 生成结果
class Compiler {
  constructor(config) {
    // entry output
    this.config = config
    //1、需要保存入口文件的路径
    this.entryId; //'./src/index.js'
    //2、需要保存所有的模块依赖
    this.modules = {}
    this.entry = config.entry; // 入口文件
    this.root = process.cwd(); // 工作路径
  }
  run() {
    // 执行 并且创建模块的依赖关系,true代表主模块
    this.buildModlue(path.join(this.root, this.entry), true)
    console.log('=======3', this.modules, this.entryId)
    // 发射一个文件(打包后的文件)
    this.emitFile()
  }
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf8')
    return content
  }
  // 解析源码
  parse(source, parentPath) { // AST解析语法树
    // console.log(source,'==================>',parentPath)
    let ast = babylon.parse(source)
    let dependencies = []; //依赖的数组
    traverse(ast, {
      CallExpression(p) {
        let node = p.node; //对应的节点
        if (node.callee.name == 'require') {
          node.callee.name = '__webpack_require_';
          let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
          moduleName = './' + path.join(parentPath, moduleName)
          dependencies.push(moduleName)
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code

    // 附模块的加载 递归加载
    dependencies.forEach(dep => {
      this.buildModlue(path.join(this.root, dep), false)
    })
    return {
      sourceCode,
      dependencies
    }
  }
  // 构建模块
  buildModlue(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath)
    // 模块id modulePath = modulePath = this.root  
    let moduleName = './' + path.relative(this.root, modulePath)
    if (isEntry) {
      this.entryId = moduleName; //保存入口的名字
    }
    /**
     *  解析源码 对其改造
     *  1、将所有的require引入的内容 路径更改为src下
     *  2、将require 名字更改
     *  3、返回一个依赖列表
     * */
    let {
      sourceCode,
      dependencies
    } = this.parse(source, path.dirname(moduleName))
    // 把相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode
  }
  emitFile() {
    // 用数据渲染  
    // 拿到输出到那个目录下
    let main = path.join(this.config.output.path, this.config.output.filename)
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'))
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    });
    this.assets = {}
    // 资源中路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main])
  }
}
module.exports = Compiler
```
- 5、创建lib/main.ejs
```js
(function (modules) {
var installedModules = {};

function __webpack_require__(moduleId) {

if (installedModules[moduleId]) {
return installedModules[moduleId].exports;
}
var module = installedModules[moduleId] = {
i: moduleId,
l: false,
exports: {}
};

modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

module.l = true;

return module.exports;
}


return __webpack_require__(__webpack_require__.s = "<%-entryId%>");
})
({
<%for (let key in modules){%>
"<%-key%>":
(function(module, exports, __webpack_require__) {
eval(`<%-modules[key]%>`);
}),
<%}%>
});
```
- 6、做好的项目 通过 npm link 执行他 把当前的项目映射全局
- 7、在别需要打包的项目的引入 npm link webpackSg   执行npx webpackSg,他对应webpackSg package.json 的 bin配置的key 执行value路径里面的内容
### 8、增加loader解析功能
```js
// 修改 getSource 
 getSource(modulePath) {
  let rules = this.config.module.rules
  let source = fs.readFileSync(modulePath, 'utf8')

  for(let i=0;i<rules.length;i++){
    let rule = rules[i]
    let {test,use} = rule
    let loaderIndex = use.length - 1
    if(test.test(modulePath )){
      function next(){
        source = require(use[loaderIndex--])(source)
        if(loaderIndex >= 0){
          next()
        }
      }
      next()
    }
  }
  return source
}
```
### 9、增加plugin解析功能
```js 
// 修改constructor  emitFile run
 constructor(props) {
    this.config = props
    this.entry = props.entry // 文件入口
    this.entryId = null
    this.root = process.cwd() // 文件路径
    this.modules = {}
    this.hooks = {
      entryOption: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      emit: new SyncHook(["compiler"]),
      afterEmit: new SyncHook(),
      done: new SyncHook()
    }
    let plugins = options.plugins;
    if (plugins && plugins.length > 0) {
        plugins.forEach(plugin => plugin.apply(this));
    }
    this.hooks.afterPlugins.call();
  }
  emitFile() {
    this.hooks.emit.call(this, this);
    let main = path.join(this.config.output.path, this.config.output.filename)
    let ejsFile = this.getSource(path.join(__dirname, 'main.ejs'))
    let code = ejs.render(ejsFile, {
      entryId: this.entryId,
      modules: this.modules
    })
    this.assets = {}
    this.assets[main] = code
    fs.writeFileSync(main, this.assets[main])
    this.hooks.afterEmit.call();
    this.hooks.done.call();
  }
  run() {
    this.hooks.run.call(this);
    this.hooks.compile.call();
    // 执行创建模块依赖关系 
    this.moduleBuild(path.join(this.root, this.entry), true)
    this.hooks.afterCompile.call();
    // 发射文件
    this.emitFile()
  }
```
## vue-ssr流程
<img :src="$withBase('/img/ssr.png')" >

- Source 里面继承了 client 和 serve,client就是我们平常用的spa,server 是后端用的,打包的时候 2个入口分别是client和server文件
  - 需要注意的是new Vue的时候 不能挂载dom 他是在client(mount) 和 server(在html模板加入特定的字符串) 分别处理，server 引入的模板没有挂载的地方,可以在app.vue 最外层div 配置挂载点 
  - client就是正常的vue使用打包入口
  - server.js 会默认导出一个函数(1) 给nodeServer使用 该函数接收的参数是`render.renderToString`第一个配置的参数
  - 函数(1)最终返回一个 new Vue的实例,在这里要处理几类情况
    - 第一是路由问题 当浏览器请求地址时候,nodeServer 会将请求的路径传递给此函数(1),在内部通过`router.push(context.url)`定位到当前页面,路由提供了一個方法`router.onReady`,也就是说等待组件加载完成。在返回Vue实例
    - 第二个是store问题,还有一个路由方法`router.getMatchedComponents`获取匹配的当前组件,返回的是一个数组,如果`store`里面的数据发生变化就得通过server端处理传递,前面有个方法获取所有的组件,我们可以通过调取组件内的方法将`store`传递进去,如果通过client端传递 刷新页面 数据就还原了。`context.state = store.state`把vuex中的状态 挂载 到上下文中的state上,会自动在window上挂载一个属性 __INITIAL_STATE__,这样首页渲染的时候 就能直接获取当前的值。
    - meta 信息修改,`cnpm i vue-meta -S`
      - ssr html模板页面 titile 内配置 用3个`{}`包括 起来 ` meta.inject().title.text()` 
      - `vue-meta`配置到中间件中`Vue.use(VueMeta)`  Vue的实例就有$meta() 方法 ,将他挂载上server.js 上下文中`context.meta = vm.$meta()`
      - 使用 在App.vue 入口文件配置 将会涉及到每个页面 `metaInfo:{title:'xxxxxxxx'}`, 在单独的页面配置 就能覆盖
- nodeServer 服务需要2个文件 
  - 第一个是html模板(里面要引入打包的 client.js) 
    - client.js作用是页面的vue交互
  - 第二个 server 打包的js
    - server作用是首屏渲染(刷新的加载时候返回所有的页面数据)

## 配置一个webpack-vue 支持ssr
- 创建webpack/webpack.config.js
- 创建webpack/webpack.client.js
- 创建webpack/webpack.server.js
- 创建文件vue相关的文件
- 安装相关依赖
  - yarn add webpack webpack-cli webpack-dev-server 
  - vue-loader vue vue-style-loader css-loader html-webpack-plugin vue-template-compiler webpack-merge
  - @babel/core @babel/preset-env babel-loader 
- 构建版本问题(具体看官网)
  - 完整版本 包含编译器和运行时的版本,
  - 编译器 用来将模板字符串编译成js渲染函数,也就是我们通常再在main.js 中的 new Vue 的时候 写的template. 
  - 运行时版本 用来创建Vue实例,渲染并处理虚拟dom等代码,基本上就时除去编译器的其他一切,我们通常用的脚手架就是运行时版本,如果在cli中的main.js new Vue 的时候写template就会报错,因为缺少编译器,处理template.运行版本比完整版体积要小大约30%.
  - 处理办法,安装的时候默认是引入运行版本,配置webpack将他修改成完整版本即可,
- css 要注意两点 默认情况支持scoped,如果要用css module 需要给css-loader配置
- ssr 流程 
  - 打包文件包括(client.js 和 server.js) 前者在html页面中引入 后者用来后端服务做渲染
  - 服务端渲染的时候 在html 配置 <!--vue-ssr-outlet--> 同时在App.vue 文件手动添加id='app'

- 创建一个简单的ssr
```js
let express = require('express')
let fs = require('fs')
let app = express();

let Vue=  require('vue');
// vue提供的服务端渲染的包
let VueServerRenderer = require('vue-server-renderer')
let vm = new Vue({
  template:'<div>heelo w11orld</div>'
})
let template = fs.readFileSync('./index.html','utf8')
// 创建渲染函数
let render = VueServerRenderer.createRenderer({
  template
})
app.get('/',(req,res)=>{
  render.renderToString(vm,function(err,html){
      res.send(html)
  })
})
app.listen(3000)
```

  ```js
  resolve:{
    alias:{
      "vue":"vue/dist/vue.esm.js"
    }
  }
  ```
### 创建webpack相关的文件
```js
// 创建webpack/webpack.config.js
let path = require('path')
// vue 模块需要用插件处理
let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  output: {
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
      }],
      exclude: /node_modules/

    }, {
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    }, {
      test: /\.vue$/,
      use: ['vue-loader']
    }
  ]
  },
  resolve: {
    alias: { // 不加这个会 编译报错
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```
```js
// webpack/webpack.client.js
let htmlPluginWebpack = require('html-webpack-plugin')
let path = require('path')
let {
  smart
} = require('webpack-merge')
let base = require('./webpack.config')

module.exports = smart(base, {
  entry: {
    client: path.join(__dirname, '../src/client.js')
  },
  mode: "production",
  plugins:[
    new htmlPluginWebpack({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html'
    })
  ]
})
```
```js
// webpack/webpack.server.js
let path = require('path')
let htmlPluginWebpack = require('html-webpack-plugin')
let {
  smart
} = require('webpack-merge')
let base = require('./webpack.config')

module.exports = smart(base, {
  target:'node',//打包除的结果给node用
  mode: "production",
  entry:{
    server:path.join(__dirname,'../nodeServer.js')
  },
  output:{
    libraryTarget:'commonjs2'
  },
  plugins:[
    new htmlPluginWebpack({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'server.html',
      excludeChunks: ['server']
    })
  ]
})
```
- 支持vue
```html
<!-- src/index.html -->
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
  </html>
```
- 支持vue.srr
  - 在上面文件进行处理
```html
<!-- server.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!--vue-ssr-outlet-->
  <script src="./client.js"></script>
</body>
</html>
```

### /components/Bar.vue
```html
<template>
<div id="example-1">
    <button v-on:click="show = !show">
        Toggle=>{{$store.state.username}}
      </button>
     <button @click="btn">点击</button>
</div>
</template>

<script>
  export default {
      asyncData({store}){ // 异步数据 这个方法只在服务端执行,客户端会执行
      console.log('asyncData1')
      return store.dispatch('setUsername')
    },
    mounted(){
      this.$store.dispatch('setUsername')
    },
    data(){
      return{
        show: true,
      }
    },
    methods:{
      btn(){
        console.log(123)
        this.$router.push('/') 
      }
    }
  }
</script>

<style scoped>
</style>
```
### /components/Foo.vue
```html
<template>
  <div>
    <div id="list-demo" class="demo">
      foo
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo:{
      title:'Footitle'
    },
    data() {
      return{
      }
    },
  }
</script>
```
### App.js
```html
<template>
    <div id='app'>
      123123
      <router-link to="/bar">bar</router-link>
      <router-link to="/foo">foo</router-link>
    <br>
    <router-view></router-view>
    </div>  
</template>

<script>
import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'
export default {
  metaInfo:{
    title:'xxxxxxxx'
  },
  components:{
    Bar,Foo
  }
}
</script>
```
### router.js
```js
import Vue from 'vue';
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
Vue.use(VueRouter);
Vue.use(VueMeta);// 会在当前的实例上添加一个 this.$meta
import Bar from './components/Bar.vue'
export default()=>{
  let router = new VueRouter({
    mode:'history',
    routes:[
      {
        path:'/',
        component:Bar
      },
      {
        path:'/bar',
        component:Bar
      },
      {
        path:'/foo',
        component:()=>import('./components/Foo.vue')
      }
    ]
  })
  return router
}
```

### store.js
```js
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export default()=>{
  let store = new Vuex.Store({
    state:{
      username:'sg'
    },
    mutations:{
      setUsername(state){
            console.log('mutations')
            state.username = 'xxxx'
      }
    },
    actions:{
      setUsername({commit}){
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            console.log('actions')
            commit('setUsername')
            resolve()
          },2000)
        })
      }
    }
  })
  if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store
}
```

### main.js
```js
import Vue from 'vue';
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
// 为了兼容服务端 要把这个方法改造成函数
export default ()=>{
  let router = createRouter()
  let store = createStore()
  let vm = new Vue({
    // el:"#app",//手动挂载
    render:(h)=>h(App),
    router,
    store
  })
  return {
    vm,
    router,
    store
  }
}

```
### client.js
```js
import creareApp from './main';
let {vm} = creareApp()
vm.$mount('#app')
```
### server.js
```js
import creareApp from './main';

// 服务端会调用此函数 产生新的app实例
export default(context)=>{
  // 在服务端跑的
  return new Promise((resolve,reject)=>{
    let {vm,router,store} = creareApp()
    // let meta = vm.$meta  // 注意这个地方不能解构  保证this指向 
    // 如果服务端 启动时 直接访问 /foo 返回的页面永远都是 index.html 需要通过路由跳转到指定路径
    // 防止路由中的异步逻辑 服务端专有的方法
    
    // 需要把当前页面中匹配到的组件 找到asyncData方法让他执行
    router.push(context.url)
    // 等待路由执行完成的回调
    router.onReady(()=>{
      // 获取当前路径匹配到的组件 看一下 这个组件中 有没有asyncData方法
      let matchesComponents = router.getMatchedComponents()  
        Promise.all(
            matchesComponents.map(component=>{
              if(component.asyncData){
                return component.asyncData({store})
              }
            })
        ).then(()=>{
          // 把vuex中的状态 挂载 到上下文中的state上
          context.state = store.state
          context.meta = vm.$meta()
          // 会自动在window上挂载一个属性 __INITIAL_STATE__
          resolve(vm)
        })
      })
    })
}
```
### node-server.js
```js
let express = require('express')
let fs = require('fs')
let app = express();
let Vue=  require('vue');
let path = require('path')
let serverBundle = fs.readFileSync('./dist/server.bundle.js','utf8')
// vue提供的服务端渲染的包
let VueServerRenderer = require('vue-server-renderer')
let template = fs.readFileSync('./dist/index.ssr.html','utf8')
// // 创建渲染函数
let render = VueServerRenderer.createBundleRenderer(serverBundle,{
  template
})
app.get('/',(req,res)=>{
  // 把渲染好的字符串丢给客户端,返回的只是字符串,没有vue实例功能
  // 第一个参数 对应了server.js入口文件 函数接收的参数
  let context = {url:req.url}
  render.renderToString(context,function(err,html){
      res.send(html)
  })
})
app.use(express.static(path.join((__dirname,'dist'))))

// 如果访问的路径不存在 默认渲染到index.ssr.html 并且把路由定向到请求的路径
app.get('*',(req,res)=>{
  // 把渲染好的字符串丢给客户端,返回的只是字符串,没有vue实例功能
  // 第一个参数 对应了server.js入口文件 函数接收的参数
  let context = {url:req.url}
  render.renderToString(context,function(err,html){
      res.send(html)
  })
})
app.listen(3000)
```