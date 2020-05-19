# 面经整理
[[toc]]

## 类class
为了和其他语言继承形态一致，JS提供了class 关键词用于模拟传统的class ，但底层实现机制依然是原型继承。
class 只是语法糖为了让类的声明与继承更加简洁清晰。
class 是使用函数声明类的语法糖，但也有些区别
class 中定义的方法不能枚举(for..in)

class 默认使用strict 严格模式执行；
在 class 中为属性添加 static 关键字即声明为静态属性，可以把为所有对象使用的值定义为静态属性；即为类设置属性，而不是为生成的对象设置。
```js
function User() {}
User.site = "后盾人";
console.dir(User);

const hd = new User();
console.log(hd.site); //undefiend
console.log(User.site); //后盾人 
```
> Super
* 使用 super 调用时，在所有继承中 this 始终为调用对象
* super 是用来查找当前对象的原型，而不像上面使用 this 查找原型造成死循环
* 也就是说把查询原型方法的事情交给了 super，this 只是单纯的调用对象在各个继承中使用
* super 只能在类或对象的方法中使用，而不能在函数中使用

> constructor
super 指调父类引用，在构造函数constructor 中必须先调用super()
* super() 指调用父类的构造函数
* 必须在 constructor 函数里的this 调用前执行 super()

```js
var f = {};
//原型就是一个对象
console.log(f.__proto__)
console.log(Object.getPrototypeOf(f)); //查看
// setPrototypeOf 设置

//使用原型工厂封装继承
function extend(sub, sup) {
    sub.prototype =  Object.create(sup.prototype);// 原型继承
    //原型里的constructor 要保留
    Object.defineProperty(sub.prototype, "constructor", {
        value: sub,
        enumerable: false // 不可遍历
    })
}

function User(name, age){
    this.name = name;
    this.age = age;
}
User.prototype.show = function(){
    console.log(this.name, this.age)
}

function Admin(...args){
    User.apply(this, args);
}

extend(Admin, User);

let admin = new Admin("xjy", 20);
admin.show();

function Member(...args) {
    User.apply(this, args); 
}

extend(Member, User);
let member = new Member("徐静莹", 19);
member.show()
```


## 工厂函数、构造函数
在函数中返回对象的函数称为工厂函数，工厂函数有以下优点
* 减少重复创建相同类型对象的代码
* 修改工厂函数的方法影响所有同类对象
http://doc.houdunren.com/   

## 构造函数
和工厂函数相似构造函数也用于创建对象，它的上下文为新的对象实例。
* 构造函数名每个单词首字母大写即Pascal 命名规范
* this指当前创建的对象
* 不需要返回this系统会自动完成
* 需要使用new关键词生成对象

## 属性特征
查看特征
使用 Object.getOwnPropertyDescriptor查看对象属性的描述。
使用 Object.getOwnPropertyDescriptors查看对象所有属性的描述
特性	说明	默认值
configurable	能否使用delete、能否需改属性特性、或能否修改访问器属性	true
enumerable	对象属性是否可通过for-in循环，或Object.keys() 读取	true
writable	对象属性是否可修改	true
value	对象属性的默认值	undefined
设置特征
使用Object.defineProperty 方法修改属性特性，通过下面的设置属性name将不能被遍历、删除、修改。


## 属性访问器
getter方法用于获得属性值，setter方法用于设置属性，这是JS提供的存取器特性即使用函数来管理属性。
* 用于避免错误的赋值
* 需要动态监测值的改变
* 属性只能在访问器和普通属性任选其一，不能共同存在


## 事件处理机制，事件模型
冒泡事件：由里及外，先子后父，阻止方法->stopPropagation()，IE中设置cancelBubble = true；  捕获事件：由外及内，先父后子，组织方法->preventDefault()，IE下window.event.returnValue = false.

## new操作符干了什么？ 
创建一个空对象，并在this变量中引用这个对象，同时还继承了该对象的原型；属性和方法被加入到this引用的对象中；新创建的对象由this所引用，并且最后隐式的返回this。
New操作符的步骤：创建一个对象；链接到原型；绑定this；返回一个新对象。

## 继承
继承是原型的继承，而不是改变构造函数的原型。
改变构造函数的原型不叫继承。
Object.create() 有两个含义：Object.create(User.prototype)
创建一个新对象； 使用第一个参数的对象作为新对象的原型。

## 暂时性死区
TDZ 又称暂时性死区，指变量在作用域内已经存在，但必须在let/const声明后才可以使用
TDZ可以让程序保持先声明后使用的习惯，让程序更稳定。
* 变量要先声明后使用
* 建议使用let/const 而少使用var
不允许变量在未声明前使用

## 严格模式
use strict
未声明的变量不允许赋值；
强制声明避免全局污染；
关键词不允许做变量使用；
变量参数不允许重复定义；
单独为函数设置严格模式；
解构差异：非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明。

## img的title和alt的区别
1.   Title：鼠标滑上去会显示
2. Alt 是img标签的特有属性，是图片内容的等价描述，可提高图片的可访问性，搜索引擎会重点解析

## 对象、原型对象
通过对象Object，找到原型prototype，通过原型的constructor可以找到构造函数，通过构造函数可以创建对象。
原型中必须保证有constructor的存在。
原型对象：每个对象都有一个原型prototype对象，通过函数创建的对象也将拥有这个原型对象。原型是一个指向对象的指针。
函数拥有多个原型，prototype 用于实例对象使用，__proto__用于函数对象使用。
constructor存在于prototype原型中，用于指向构建函数的引用。

原型：prototype
函数也是对象也有原型，函数有 prototype 属性指向他的原型
__proto__
在实例化对象上存在 __proto__ 记录了原型，所以可以通过对象访问到原型的属性或方法。
* __proto__ 不是对象属性，理解为prototype 的 getter/setter 实现，他是一个非标准定义
* __proto__ 内部使用getter/setter 控制值，所以只允许对象或null
* 建议使用 Object.setPrototypeOf 与Object.getProttoeypOf 替代 __proto__

通过前介绍我们知道可以使用多种方式设置原型，下面是按时间顺序的排列
1. prototype 构造函数的原型属性
2. Object.create 创建对象时指定原型Object.create(user)
3. __proto__ 声明自定义的非标准属性设置原型，解决之前通过 Object.create 定义原型，而没提供获取方法
4. Object.setPrototypeOf 设置对象原型
这几种方式都可以管理原型，一般以我个人情况来讲使用 prototype 更改构造函数原型，使用 Object.setPrototypeOf 与 Object.getPrototypeOf 获取或设置原型。

## 前端要注意哪些seo
1. 合理的title，description，keywords；
2. 语义化的html代码；
3. 重要的内容放在前面；
4. 少用ifram，搜索引擎不会抓取ifram的内容；
5. 非装饰性图片必须加alt；
6. 提高网站速度；

## 数据代理解决了什么问题？原理是什么？
[参考链接](https://zhuanlan.zhihu.com/p/47041290) 
数据劫持也叫数据代理。解决跨域问题。
原理：	
1. 定义一个监听函数，对对象的每一个属性进行监听
2. 通过Object.defineProperty对监听的每一个属性设置get 和 set 方法。
3. 对对象实行监听
4. 对对象内嵌对象进行处理
5. 对数组对象进行处理

## Vuex 的应用场景
[参考链接](https://juejin.im/post/5a3e0fa05188252103347507)
1:组件被销毁；2:组件基于数据而创建；3:多对多事件-多处触发，影响多处；

## 封装数据请求方法的好处，怎么封装？
[参考链接](https://segmentfault.com/a/1190000017067750) 
简化使用成本，可以统一处理一些逻辑，可以对请求进行一些改造以满足使用习惯。

## 如何解决移动端300ms延迟的问题
[参考链接](https://juejin.im/post/5b3cc9836fb9a04f9a5cb0e0) 
 1.禁用缩放；
 2.更改默认的视口宽度
<mate. name=“viewport” contnt=“device-width”>
 3.CSS touch-action
 4.FastClick


## gulp和webpack的区别
[参考链接](https://www.cnblogs.com/lovesong/p/6413546.html) 
* gulp  
gulp强调的是前端开发的工作流程，我们可以通过配置一系列的task，定义task处理的事务（例如文件压缩合并、雪碧图、启动server、版本控制等），然后定义执行顺序，来让gulp执行这些task，从而构建项目的整个前端开发流程。
PS：简单说就一个Task Runner
* webpack  
webpack是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。
PS：webpack is a module bundle



## 前后端交互时需要注意哪些问题？后端开发的接口字段时如何定出来的？后端开发的接口字段里面，必须要有的是？
[参考地址](https://blog.csdn.net/SoftwareTester_zys/article/details/79989956)  
必须要有的：接口地址，请求方法，请求参数，返回内容，错误代码。

## 模块化规范有哪些？
[参考地址](https://juejin.im/post/5aaa37c8f265da23945f365c) 
CommonJS、AMD、CMD、ES6模块系统。
什么是模块化？模块化的好处
什么是模块化？ 模块化是指解决一个复杂问题时自顶向下逐层把系统划分成若干模块的过程，有多种属性，分别反映其内部特性。

 模块化的好处：
1、模块间解耦，复用。 （原因：对业务进行模块化拆分后，为了使各业务模块间解耦，因此各个都是独立的模块，它们之间是没有依赖关系。 每个模块负责的功能不同，业务逻辑不同，模块间业务解耦。模块功能比较单一，可在多个项目中使用。） 2、可单独编译某个模块，提升开发效率。 （原因：每个模块实际上也是一个完整的项目，可以进行单独编译，调试）
3、可以多团队并行开发，测试。 原因：每个团队负责不同的模块，提升开发，测试效率。

模块化业务分层：由下到上 
基础组件层：底层使用的库和封装的一些工具库（libs），比如okhttp,rxjava,rxandroid,glide等 业务组件层：与业务相关，封装第三方sdk，比如封装后的支付，即时通行等 业务模块层：按照业务划分模块，比如说IM模块，资讯模块等

### commonJS、AMD、CMD、ES6
1、commonjs
四个重要的环境变量为模块化的实现提供支持：module、exports、require、global。
实际使用时，用module.exports定义当前模块对外输出的接口，用require加载模块。
Commonjs用同步的方式加载模块。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，更合理的方案时使用异步加载。
2、AMD和require.js
AMD时采用异步方式加载。
用require.js实现AMD规范的模块化；
用require.config()指定引用路径等，用define()定义模块，用require()加载模块。
3、CMD和sea.js
CMD是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。此规范其实是在sea.js推广过程中产生的
4、ES6 Module
模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能
使用import命令的时候，用户需要知道所要加载的变量名或函数名。其实ES6还提供了export default命令，为模块指定默认输出，对应的import语句不需要使用大括号。这也更趋近于ADM的引用写法

commonJS模块和ES6的差异
1、CommonJS模块输出的事一个值的拷贝，es6输出的是值的引用。
Es6模块是动态引入，并且不会缓存值。
2、commonjs是运行时加载，es6是编译时输出接口。

## 行内元素设置什么属性不生效:
margin和padding的top、bottom;
float;
width;
height;
line-height


## 1.对vue生命周期的理解
> 共8个阶段。创建前/后，载入前/后，更新前/后，销毁前/后。
* 创建前/后：beforeCreate阶段，vue挂载的el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，el还没有。
* 载入前/后：beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
* 更新前/后： 当data变化时，会触发beforeUpdate和updated。
* 销毁前/后： 在执行destory方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在。

* 什么是vue生命周期？  
Vue实例从创建到销毁的过程就是生命周期。从开始创建、初始化数据、编译模版、挂载Dom->渲染、更新->渲染、销毁等一系列过程，称之为Vue的生命周期。

* Vue生命周期的作用是什么？  
生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程中更容易形成好的逻辑。

* 页面加载会触发哪几个钩子？  
beforeCreate、created、beforeMount、mounted。

* Dom渲染在哪个周期中就已经完成？  
Dom渲染在mounted中就已经完成了。

* Date为什么是一个函数？  
因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

* Watch 是监听对象的内部变化也就是obj.key，深层监听会加上deep:true,immediate的作用是 当值第一次绑定时并不会触发watch监听，使用immediate则可以在最初绑定的时候执行。

## Vue 的响应式原理中 Object.defineProperty 有什么缺陷？为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty(数据双向绑定)？
解析：
1. Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
	新增解释———-其实可以监听数组下标值的变化的更新，只是vue设计中没有遍历监听，源码中可以看到。尤大解释过之所以不做数组下标的监听，因为性能消耗和开发体验不成正比
1. Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
2. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

## vue组件之间的传值方式：
[链接](https://zhuanlan.zhihu.com/p/67621038)
$attrs；$listeners；
父传子 props；
子传父 $emit；
隔代 eventbus；
vuex；
$ref；
$parent；$children； 
proviad，inject

## v-model
是语法糖，用在表单元素上，负责监听用户的输入事件以更新数据。
主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
* text 和 textarea 元素使用 value 属性和 input 事件； 
* checkbox 和 radio 使用 checked 属性和 change 事件； 
* select 字段将 value 作为 prop 并将 change 作为事件 

## virtual Dom算法的实现
 通过JS来模拟创建DOM对象； 判断两个对象的差异； 渲染差异。

## 怎么判断页面是否加载完成
 Load事件触发代表页面中DOM，CSS，JS，IMG已经全部加载完毕。
DOMContentLoaded 事件触发代表初始的HTML被完全加载和解析，不需要等待CSS，JS，IMG加载。

## 浏览器缓存
* 对于强缓存，浏览器在第一次请求的时候，会直接下载资源，然后缓存在本地，第二次请求的时候，直接使用缓存。  
* 对于协商缓存，第一次请求缓存且保存缓存标识与时间，重复请求向服务器发送缓存标识和最后缓存时间，服务端进行校验，如果失效则使用缓存  
* 强缓存   
    * 强缓存可以通过两种响应头实现：Expires和Cache-Control。强缓存表示在缓存期间不需要请求，state code 为200.

* *协商缓存
    * 协商缓存需要请求，如果缓存有效会返回304.
    * 协商缓存需要客户端和服务端的共同实现，和强缓存一样，也有两种实现方式。

## display 和 visibility v-if 和 v-show
* Display 不占位 会引发回流    
* visibility dom中还占位。  
* v-show改变的是css样式。不管条件为真假，第一次渲染时编译出来。  
* v-if消耗性能，显隐是通过增加和删除的。首次渲染如果为假，页面就当作没有这个元素，为真时局部编译，动态向Dom里添加，为假时局部编译，删除元素。

## typeof 和instanceof、Object.prototype.toString.call()。
* Typeof  
  * 对于基本类型，除了null都可以显示正确的类型；  
  * 对于引用类型，除了函数都会显示Object。  
  * 对于null，会显示Object，这是一个存在很久的bug。
```js
    typeof ''; // string 有效
    typeof 1; // number 有效
    typeof Symbol(); // symbol 有效
    typeof true; //boolean 有效
    typeof undefined; //undefined 有效
    typeof null; //object 无效
    typeof [] ; //object 无效
    typeof new Function(); // function 有效
    typeof new Date(); //object 无效
    typeof new RegExp(); //object 无效
```
> typeof 原理：js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息👉

000：对象
010：浮点数
100：字符串
110：布尔
1：整数

but, 对于 undefined 和 null 来说，这两个值的信息存储是有点特殊的。  
null：所有机器码均为0  
undefined：用 −2^30 整数来表示  
所以，typeof 在判断 null 的时候就出现问题了，由于 null 的所有机器码均为0，因此直接被当做了对象来看待。

Object.prototype.toString方法，判断某个对象之属于哪种内置类型。
分为null、string、boolean、number、undefined、array、function、object、date、math。
* instanceOf  
  * 可以正确的判读对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的prototype。    
  * instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。  

## 防抖和节流和防止暴力点击。
防抖Debouncing是将多次执行变为最后一次执行。输入框键盘抬起发起搜索请求。
节流Throttling是将多次执行变成每隔一段时间执行。聊天列表接收消息。
在某段时间内，不管你触发了多少次回调，都只认第一次，并在计时结束时给予响应。
防止暴力点击，是点击完发送接口，接口未响应时给一个变量，让按钮不可点击。
 

## nextTick
Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象.
可以让我们在下次DOM更新循环结束之后执行延迟回掉，用于获取更新后的DOM。

## vue的优点？
* 低耦合。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变
* 可重用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑
* 可测试。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写

## push，replace，go的区别
Push 增加记录，可以返回上一个页面
Replace 跳转指定的url，不会增加上一个页面的记录。
Go是页面向前或向后多少个页面，可为负数。

## $route 和 $router的区别
$route是路由信息对象，包括 path，query，params，name等路由信息参数。
$router 是路由实例对象，包括了路由的跳转方法，钩子函数等。


## 说一下Vue的双向绑定数据的原理
* vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调

## TCP和UDP的区别
[参考地址](https://zhuanlan.zhihu.com/p/24860273) 
Tcp协议集包括应用层，传输层，网络层，网络访问层。
TCP是面向连接的协议，也就是说在收发数据前，必须和对方建立可靠的连接。一个tcp要经过三次“对话”在能建立起来。
UDP是用户数据报协议。是一个非连接的协议，传输数据之前源端和终端不建立连接，当它想传送时就简单地去抓取来自应用程序的数据，并尽可能快地把它扔到网络上。 在发送端，UDP传送数据的速度仅仅是受应用程序生成数据的速度、 计算机的能力和传输带宽的限制； 在接收端，UDP把每个消息段放在队列中，应用程序每次从队列中读一个消息段。

## 清除浮动的原理 高度塌陷产生的原因
当父元素没有设置高度时，子元素浮动后，造成子元素脱离文档流无法把父元素撑开，父元素告诉为0产生高度塌陷，父元素塌陷后，父元素以下的元素都会向上移动，导致布局混乱。

## Diff的复杂度：
原问题标题“React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？ ”
1. 这里的n指的是页面的VDOM节点数，这个不太严谨。如果更严谨一点，我们应该应该假设 变化之前的节点数为m，变化之后的节点数为n。 
2. React 和 Vue 做优化的前提是“放弃了最优解“，本质上是一种权衡，有利有弊。 
倘若这个算法用到别的行业，比如医药行业，肯定是不行的，为什么？
React 和 Vue 做的假设是：
* 检测VDOM的变化只发生在同一层
* 检测VDOM的变化依赖于用户指定的key
如果变化发生在不同层或者同样的元素用户指定了不同的key或者不同元素用户指定同样的key， React 和 Vue都不会检测到，就会发生莫名其妙的问题。
但是React 认为， 前端碰到上面的第一种情况概率很小，第二种情况又可以通过提示用户，让用户去解决，因此 这个取舍是值得的。 没有牺牲空间复杂度，却换来了在大多数情况下时间上的巨大提升。 明智的选择！
基本概念
首先大家要有个基本概念。
其实这是一个典型的最小编辑距离的问题，相关算法有很多，比如Git中 ，提交之前会进行一次对象的diff操作，就是用的这个最小距离编辑算法。
leetcode 有原题目, 如果想明白这个O(n^3)， 可以先看下这个。
对于树，我们也是一样的，我们定义三种操作，用来将一棵树转化为另外一棵树：
* 删除 删除一个节点，将它的children交给它的父节点 
* 插入 在children中 插入一个节点 
* 修改 修改节点的值 
事实上，从一棵树转化为另外一棵树，我们有很多方式，我们要找到最少的。
直观的方式是用动态规划，通过这种记忆化搜索减少时间复杂度。
算法
由于树是一种递归的数据结构，因此最简单的树的比较算法是递归处理。
详细描述这个算法可以写一篇很长的论文，这里不赘述。 大家想看代码的，这里有一份 我希望没有吓到你。
确切地说，树的最小距离编辑算法的时间复杂度是O(n^2m(1+logmn)), 我们假设m 与 n 同阶， 就会变成 O(n^3)。

## 