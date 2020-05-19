# Egg.js

[[toc]]
## Egg.js 是什么？
> Egg.js 为企业级框架和应用而生
### 设计原则
* 插件机制有很高的可扩展性  
* 一个插件只做一件事   
* 约定优先于配置  

### 与社区框架的差异

* `Express` 是 `Node.js` 社区广泛使用的框架，简单且扩展性强，非常适合做个人项目。但框架本身`缺少约定`，标准的 MVC 模型会有各种千奇百怪的写法。Egg 按照约定进行开发，奉行『约定优于配置』，团队协作成本低。  
* `Sails` 是和 `Egg` 一样`奉行『约定优于配置』`的框架，扩展性也非常好。但是相比 Egg，Sails 支持 Blueprint REST API、WaterLine 这样可扩展的 ORM、前端集成、WebSocket 等，但这些功能都是由 Sails 提供的。而 Egg 不直接提供功能，只是`集成`各种功能`插件`，比如实现 egg-blueprint，egg-waterline 等这样的插件，再使用 sails-egg 框架整合这些插件就可以替代 Sails 了。

### 特性
* 提供基于 Egg [定制上层框架](https://eggjs.org/zh-cn/advanced/framework.html)的能力  
* 高度可扩展的[插件机制](https://eggjs.org/zh-cn/basics/plugin.html)  
* 内置[多进程管理](https://eggjs.org/zh-cn/advanced/cluster-client.html)  
* 基于 [Koa](http://koajs.com/) 开发，性能优异  
* 框架稳定，测试覆盖率高  
* [渐进式开发](https://eggjs.org/zh-cn/tutorials/progressive.html)   

## Egg.js 和 Koa
### 异步编程模型
Node.js 是一个异步的世界，官方 API 支持的都是 callback 形式的异步编程模型，这会带来许多问题，例如

* `callback hell`: 最臭名昭著的 callback 嵌套问题。  
* `release zalgo`: 异步函数中可能同步调用 callback 返回数据，带来不一致性。  
因此社区提供了各种异步的解决方案，最终胜出的是 Promise，它也内置到了 ECMAScript 2015 中。而在 Promise 的基础上，结合 Generator 提供的切换上下文能力，出现了 `co` 等第三方类库来让我们用同步写法编写异步代码。同时，[async function](https://github.com/tc39/ecmascript-asyncawait) 这个官方解决方案也于 ECMAScript 2017 中发布，并在 Node.js 8 中实现。

### async function
[async function](https://github.com/tc39/ecmascript-asyncawait) 是语言层面提供的语法糖，在 async function 中，我们可以通过 `await` 关键字来等待一个 Promise 被 resolve（或者 reject，此时会抛出异常）， Node.js 现在的 LTS 版本（8.x）已原生支持。

```js
    const fn = async function() {
    const user = await getUser();
    const posts = await fetchPosts(user.id);
    return { user, posts };
    };
    fn().then(res => console.log(res)).catch(err => console.error(err.stack));
```
### Koa
> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

Koa 和 Express 的设计风格非常类似，底层也都是共用的[同一套 HTTP 基础库](https://github.com/jshttp)，但是有几个显著的区别，除了上面提到的默认异步解决方案之外，主要的特点还有下面几个。

### Middleware
Koa 的中间件和 Express 不同，Koa 选择了洋葱圈模型。

* 中间件洋葱图：


* 中间件执行顺序图：


所有的请求经过一个中间件的时候都会执行两次，对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑，对比 Koa 和 Express 的 Compress 中间件就可以明显的感受到 Koa 中间件模型的优势。

* [koa-compress](https://github.com/koajs/compress/blob/master/index.js) for Koa.  
* [compression](https://github.com/expressjs/compression/blob/master/index.js) for Express.  
### Context
和 Express 只有 Request 和 Response 两个对象不同，Koa 增加了一个 Context 的对象，作为这次请求的上下文对象（在 Koa 1 中为中间件的 `this`，在 Koa 2 中作为中间件的第一个参数传入）。我们可以将一次请求相关的上下文都挂载到这个对象上。类似 [traceId](https://github.com/eggjs/egg-tracer/blob/1.0.0/lib/tracer.js#L12) 这种需要贯穿整个请求（在后续任何一个地方进行其他调用都需要用到）的属性就可以挂载上去。相较于 request 和 response 而言更加符合语义。

同时 Context 上也挂载了 Request 和 Response 两个对象。和 Express 类似，这两个对象都提供了大量的便捷方法辅助开发，例如

* `get request.query`  
* `get request.hostname`  
* `set response.body`  
* `set response.status`  
### 异常处理
通过同步方式编写异步代码带来的另外一个非常大的好处就是异常处理非常自然，使用 `try catch` 就可以将按照规范编写的代码中的所有错误都捕获到。这样我们可以很便捷的编写一个自定义的错误处理中间件。
```js
async function onerror(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err);
    ctx.body = 'server error';
    ctx.status = err.status || 500;
  }
}
```
只需要将这个中间件放在其他中间件之前，就可以捕获它们所有的同步或者异步代码中抛出的异常了。

### Egg 继承于 Koa
如上述，Koa 是一个非常优秀的框架，然而对于企业级应用来说，它还比较基础。

而 Egg 选择了 Koa 作为其基础框架，在它的模型基础上，进一步对它进行了一些增强。

### 扩展
在基于 Egg 的框架或者应用中，我们可以通过定义 `app/extend/{application,context,request,response}.js` 来扩展 Koa 中对应的四个对象的原型，通过这个功能，我们可以快速的增加更多的辅助方法，例如我们在 `app/extend/context.js` 中写入下列代码：
```js
// app/extend/context.js
module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
};
```  
在 Controller 中，我们就可以使用到刚才定义的这个便捷属性了：
```js
// app/controller/home.js
exports.handler = ctx => {
  ctx.body = ctx.isIOS
    ? 'Your operating system is iOS.'
    : 'Your operating system is not iOS.';
};
```  
更多关于扩展的内容，请查看[扩展](https://eggjs.org/zh-cn/basics/extend.html)章节。

### 插件
众所周知，在 Express 和 Koa 中，经常会引入许许多多的中间件来提供各种各样的功能，例如引入 [koa-session](https://github.com/koajs/session) 提供 Session 的支持，引入 [koa-bodyparser](https://github.com/koajs/bodyparser) 来解析请求 body。而 Egg 提供了一个更加强大的插件机制，让这些独立领域的功能模块可以更加容易编写。

一个插件可以包含

* `extend`：扩展基础对象的上下文，提供各种工具类、属性。  
* `middleware`：增加一个或多个中间件，提供请求的前置、后置处理逻辑。  
* `config`：配置各个环境下插件自身的默认配置项。   
一个独立领域下的插件实现，可以在代码维护性非常高的情况下实现非常完善的功能，而插件也支持配置各个环境下的默认（最佳）配置，让我们使用插件的时候几乎可以不需要修改配置项。

[egg-security](https://github.com/eggjs/egg-security) 插件就是一个典型的例子。

更多关于插件的内容，请查看[插件](https://eggjs.org/zh-cn/basics/plugin.html)章节。

### Egg 与 Koa 的版本关系
#### Egg 1.x
Egg 1.x 发布时，Node.js 的 LTS 版本尚不支持 async function，所以 Egg 1.x 仍然基于 Koa 1.x 开发，但是在此基础上，Egg 全面增加了 async function 的支持，再加上 Egg 对 Koa 2.x 的中间件也完全兼容，应用层代码可以完全基于 `async function` 来开发。

* 底层基于 Koa 1.x，异步解决方案基于 co 封装的 generator function。  
* 官方插件以及 Egg 核心使用 generator function 编写，保持对 Node.js LTS 版本的支持，在必要处通过 co 包装以兼容在 async function 中的使用。  
* 应用开发者可以选择 async function（Node.js 8.x+） 或者 generator function（Node.js 6.x+）进行编写。  

#### Egg 2.x
Node.js 8 正式进入 LTS 后，async function 可以在 Node.js 中使用并且没有任何性能问题了，Egg 2.x 基于 Koa 2.x，框架底层以及所有内置插件都使用 async function 编写，并保持了对 Egg 1.x 以及 generator function 的完全兼容，应用层只需要升级到 Node.js 8 即可从 Egg 1.x 迁移到 Egg 2.x。

* 底层基于 Koa 2.x，异步解决方案基于 async function。  
* 官方插件以及 Egg 核心使用 async function 编写。  
* 建议业务层迁移到 async function 方案。  
* 只支持 Node.js 8 及以上的版本。  

## 快速入门

### 环境准备
* 操作系统：支持 macOS，Linux，Windows  
* 运行环境：建议选择 [LTS](http://nodejs.org/) 版本，最低要求 8.x。

### 快速初始化
我们推荐直接使用脚手架，只需几条简单指令，即可快速生成项目（`npm >=6.1.0`）:
```js
    $ mkdir egg-example && cd egg-example
    $ npm init egg --type=simple
    $ npm i
```  
启动项目:
```js
    $ npm run dev
    $ open http://localhost:7001
```
### 逐步搭建(脚手架搭建)
通常你可以通过上一节的方式，使用 `npm init egg` 快速选择适合对应业务模型的脚手架，快速启动 Egg.js 项目的开发。

### 逐步搭建(手动搭建)
但为了让大家更好的了解 Egg.js，接下来，我们将跳过脚手架，手动一步步的搭建出一个 [Hacker News](https://github.com/eggjs/examples/tree/master/hackernews)。

注意：实际项目中，我们推荐使用上一节的脚手架直接初始化。

Egg HackerNews Snapshoot

### 初始化项目
先来初始化下目录结构：
```js
$ mkdir egg-example
$ cd egg-example
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev
```
添加 `npm scripts` 到 `package.json`：
```js
{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```
### 编写 Controller
如果你熟悉 Web 开发或 MVC，肯定猜到我们第一步需要编写的是 [Controller](https://eggjs.org/zh-cn/basics/controller.html) 和 [Router](https://eggjs.org/zh-cn/basics/controller.html)。
```js
// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;
```  

配置路由映射：

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

加一个[配置文件](https://eggjs.org/zh-cn/basics/config.html)：

```js
// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;
```
此时目录结构如下：

```
egg-example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json
```

完整的目录结构规范参见目录结构。

好，现在可以启动应用来体验下

```js
$ npm run dev
$ open http://localhost:7001
```
> 注意：
Controller 有 `class` 和 `exports` 两种编写方式，本文示范的是前者，你可能需要参考 [Controller](https://eggjs.org/zh-cn/basics/controller.html) 文档。
Config 也有 `module.exports` 和 `exports` 的写法，具体参考 [Node.js modules 文档](https://nodejs.org/api/modules.html#modules_exports_shortcut)。

### 静态资源
Egg 内置了 `static` 插件，线上环境建议部署到 CDN，无需该插件。

static 插件默认映射 `/public/* -> app/public/*` 目录

此处，我们把静态资源都放到 `app/public` 目录即可：
```js
app/public
├── css
│   └── news.css
└── js
    ├── lib.js
    └── news.js
```

### 模板渲染
绝大多数情况，我们都需要读取数据后渲染模板，然后呈现给用户。故我们需要引入对应的模板引擎。

框架并不强制你使用某种模板引擎，只是约定了 [View 插件开发规范](https://eggjs.org/zh-cn/advanced/view-plugin.html)，开发者可以引入不同的插件来实现差异化定制。

更多用法参见 [View](https://eggjs.org/zh-cn/advanced/view-plugin.html)。

在本例中，我们使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 来渲染，先安装对应的插件 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) ：
```js
$ npm i egg-view-nunjucks --save
```
开启插件：  
```js
// config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};
```
```js
// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
```
注意：是 `config` 目录，不是 `app/config`!

为列表页编写模板文件，一般放置在 `app/view`目录下
```html
<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
```
添加 Controller 和 Router

```js
// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' }
      ]
    };
    await this.ctx.render('news/list.tpl', dataList);
  }
}

module.exports = NewsController;

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
};
```
启动浏览器，访问 http://localhost:7001/news 即可看到渲染后的页面。

提示：开发期默认开启了 `development` 插件，修改后端代码后，会自动重启 Worker 进程。

### 编写 service
在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 [Service](https://eggjs.org/zh-cn/basics/service.html)。

我们来添加一个 Service 抓取 [Hacker News](https://github.com/HackerNews/API) 的数据 ，如下：
```js
// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = NewsService;
```
> 框架提供了内置的 HttpClient 来方便开发者使用 HTTP 请求。

然后稍微修改下之前的 Controller：  
```js
// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
```
还需增加 `app/service/news.js` 中读取到的配置：  
```js
// config/config.default.js
// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};
```
### 编写扩展
遇到一个小问题，我们的资讯时间的数据是 UnixTime 格式的，我们希望显示为便于阅读的格式。

框架提供了一种快速扩展的方式，只需在 `app/extend` 目录下提供扩展脚本即可，具体参见[扩展](https://eggjs.org/zh-cn/basics/extend.html)。

在这里，我们可以使用 View 插件支持的 Helper 来实现：  
```js
$ npm i moment --save
// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
```
在模板里面使用：

```js
<!-- app/view/news/list.tpl -->
{{ helper.relativeTime(item.time) }}
```

### 编写 Middleware
假设有个需求：我们的新闻站点，禁止百度爬虫访问。

聪明的同学们一定很快能想到可以通过 [Middleware](https://eggjs.org/zh-cn/basics/middleware.html) 判断 User-Agent，如下：
```js
// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  }
};

// config/config.default.js
// add middleware robot
exports.middleware = [
  'robot'
];
// robot's configurations
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};
```
现在可以使用 `curl http://localhost:7001/news -A "Baiduspider"` 看看效果。

更多参见[中间件](https://eggjs.org/zh-cn/basics/middleware.html)文档。

### 配置文件
写业务的时候，不可避免的需要有配置文件，框架提供了强大的配置合并管理功能：

* 支持按环境变量加载不同的配置文件，如 `config.local.js`， `config.prod.js` 等等。  
* 应用/插件/框架都可以配置自己的配置文件，框架将按顺序合并加载。  
* 具体合并逻辑可参见[配置文件](https://eggjs.org/zh-cn/basics/config.html#%E9%85%8D%E7%BD%AE%E5%8A%A0%E8%BD%BD%E9%A1%BA%E5%BA%8F)。  
```js
// config/config.default.js
exports.robot = {
  ua: [
    /curl/i,
    /Baiduspider/i,
  ],
};

// config/config.local.js
// only read at development mode, will override default
exports.robot = {
  ua: [
    /Baiduspider/i,
  ],
};

// app/service/some.js
const Service = require('egg').Service;

class SomeService extends Service {
  async list() {
    const rule = this.config.robot.ua;
  }
}

module.exports = SomeService;
```
### 单元测试
单元测试非常重要，框架也提供了 [egg-bin](https://github.com/eggjs/egg-bin) 来帮开发者无痛的编写测试。

测试文件应该放在项目根目录下的 test 目录下，并以 `test.js` 为后缀名，即 `{app_root}/test/**/*.test.js`。
```js
// test/app/middleware/robot.test.js
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/middleware/robot.test.js', () => {
  it('should block robot', () => {
    return app.httpRequest()
      .get('/')
      .set('User-Agent', "Baiduspider")
      .expect(403);
  });
});
```
然后配置依赖和 `npm scripts`：  

```js
{
  "scripts": {
    "test": "egg-bin test",
    "cov": "egg-bin cov"
  }
}
```

```js
$ npm i egg-mock --save-dev
```
执行测试：  
```js
$ npm test
```
就这么简单，更多请参见 [单元测试](https://eggjs.org/zh-cn/core/unittest.html)。