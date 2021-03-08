(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{197:function(t,_,v){"use strict";v.r(_);var a=v(0),r=Object(a.a)({},(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("div",{staticClass:"content"},[v("h1",{attrs:{id:"深入理解javascript原型链和闭包"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#深入理解javascript原型链和闭包"}},[t._v("#")]),t._v(" 深入理解javascript原型链和闭包")]),t._v(" "),v("p"),v("div",{staticClass:"table-of-contents"},[v("ul",[v("li",[v("a",{attrs:{href:"#_3-prototype原型"}},[t._v("3. prototype原型")])]),v("li",[v("a",{attrs:{href:"#_4-隐式原型"}},[t._v("4. 隐式原型")])]),v("li",[v("a",{attrs:{href:"#_5-instanceof"}},[t._v("5. Instanceof")])]),v("li",[v("a",{attrs:{href:"#_6-继承"}},[t._v("6. 继承")])]),v("li",[v("a",{attrs:{href:"#_7-原型的灵活性"}},[t._v("7. 原型的灵活性")])]),v("li",[v("a",{attrs:{href:"#_8-简述执行上下文-上"}},[t._v("8. 简述执行上下文(上)")])]),v("li",[v("a",{attrs:{href:"#_9-简述执行上下文-下"}},[t._v("9. 简述执行上下文(下)")])]),v("li",[v("a",{attrs:{href:"#_10-this"}},[t._v("10. this")])]),v("li",[v("a",{attrs:{href:"#_11-执行上下文栈"}},[t._v("11. 执行上下文栈")])]),v("li",[v("a",{attrs:{href:"#_12-简介-作用域"}},[t._v("12. 简介[作用域]")])]),v("li",[v("a",{attrs:{href:"#_13-作用域-和-上下文环境"}},[t._v("13. [作用域]和[上下文环境]")])]),v("li",[v("a",{attrs:{href:"#_14-从【自由变量】到【作用域链】"}},[t._v("14. 从【自由变量】到【作用域链】")])]),v("li",[v("a",{attrs:{href:"#_15-闭包"}},[t._v("15. 闭包")])]),v("li",[v("a",{attrs:{href:"#_16-完结"}},[t._v("16. 完结")])])])]),v("p"),t._v(" "),v("ul",[v("li",[t._v("一切引用类型都是对象，对象是属性的集合。对象都是通过函数来创建的，而函数又是一种对象。")])]),t._v(" "),v("h2",{attrs:{id:"_3-prototype原型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-prototype原型"}},[t._v("#")]),t._v(" 3. prototype原型")]),t._v(" "),v("ol",[v("li",[v("p",[t._v("Prototype原型")])]),t._v(" "),v("li",[v("p",[t._v("每个函数都有一个属性叫做prototype，这个prototype的属性值是一个对象，默认的只有一个叫做constructor的属性，指向这个函数本身。")]),t._v(" "),v("p",[t._v("Object.Prototype:")]),t._v(" "),v("p",[t._v("constructor,")]),t._v(" "),v("p",[t._v("hasOwnProperty,")]),t._v(" "),v("p",[t._v("isPrototypeOf,")]),t._v(" "),v("p",[t._v("propertyIsEnumerable,")]),t._v(" "),v("p",[t._v("toLocaleString,")]),t._v(" "),v("p",[t._v("toString,")]),t._v(" "),v("p",[t._v("ValueOf")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("var $div = $('div');\n$div.attr('myName', '王福朋');\n\n//这样实现\n myjQuery.prototype.attr = function () {\n \t\t//……\n };\n $('div') = new myjQuery();\n")])])]),v("p",[t._v("Fn是一个函数，fn对象是从Fn函数new出来的，这样fn对象就可以调用Fn.prototype中的属性。")]),t._v(" "),v("p",[t._v("因为每个对象都有一个隐藏的属性——“_"),v("em",[t._v("proto")]),t._v("_”，这个属性引用了创建这个对象的函数的prototype。即：fn._"),v("em",[t._v("proto")]),t._v("_ === Fn.prototype")])])]),t._v(" "),v("h2",{attrs:{id:"_4-隐式原型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-隐式原型"}},[t._v("#")]),t._v(" 4. 隐式原型")]),t._v(" "),v("p",[t._v("每个对象都有一个__proto__属性，指向创建该对象的函数的prototype。")]),t._v(" "),v("p",[t._v("但是Object.prototype是特例——它的__proto__指向的是null。")]),t._v(" "),v("p",[t._v("Function是被自身创建的。所以它的__proto__指向了自身的Prototype。")]),t._v(" "),v("h2",{attrs:{id:"_5-instanceof"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-instanceof"}},[t._v("#")]),t._v(" 5. Instanceof")]),t._v(" "),v("p",[t._v("Instanceof运算符的第一个变量是一个对象，暂时称为A；第二个变量一般是一个函数，暂时称为B。")]),t._v(" "),v("p",[t._v("Instanceof的判断队则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。")]),t._v(" "),v("p",[t._v("instanceof表示的就是一种继承关系，或者原型链的结构")]),t._v(" "),v("h2",{attrs:{id:"_6-继承"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-继承"}},[t._v("#")]),t._v(" 6. 继承")]),t._v(" "),v("p",[t._v("访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。")]),t._v(" "),v("p",[t._v("所有的对象的原型链找到最后都是Function.prototype=>Object.prototype=>null，所以会继承Function构造函数和Object构造函数上的所有方法。")]),t._v(" "),v("h2",{attrs:{id:"_7-原型的灵活性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_7-原型的灵活性"}},[t._v("#")]),t._v(" 7. 原型的灵活性")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("//可自定义一个函数，并且自己去修改prototype.toString()方法\nfunction Foo(){}\nval f1=new Foo();\n\nFoo.prototype.toString=function(){\n  return '殷艺'\n}\nconsole.log(f1.toString())//殷艺\n")])])]),v("p",[t._v("如果你要添加内置方法的原型属性，最好做一步判断，如果该属性不存在，则添加。如果本来就存在，就没必要再添加了。")]),t._v(" "),v("h2",{attrs:{id:"_8-简述执行上下文-上"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_8-简述执行上下文-上"}},[t._v("#")]),t._v(" 8. 简述执行上下文(上)")]),t._v(" "),v("p",[t._v("javascript在执行一个代码段之前，都会进行这些“准备工作”来生成执行上下文。这个“代码段”其实分三种情况——全局代码，函数体，eval代码。")]),t._v(" "),v("ul",[v("li",[t._v("变量、函数表达式——变量声明，默认赋值为undefined；")]),t._v(" "),v("li",[t._v("this——赋值；")]),t._v(" "),v("li",[t._v("函数声明——赋值；")])]),t._v(" "),v("p",[t._v("这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”。")]),t._v(" "),v("h2",{attrs:{id:"_9-简述执行上下文-下"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_9-简述执行上下文-下"}},[t._v("#")]),t._v(" 9. 简述执行上下文(下)")]),t._v(" "),v("p",[t._v("函数每被调用一次，都会产生一个新的执行上下文环境。")]),t._v(" "),v("p",[t._v("函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("var a=10;\nfunction fn(){\n  console.log(a)//a是自由变量，函数创建时，就确定了a要取值的作用域\n}\nfunction bar(f){\n  var a=20;\n  f();//打印10，而不是20\n}\nbar(fn);\n")])])]),v("p",[t._v("全局代码的上下文环境数据内容为：")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th"),t._v(" "),v("th")])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("普通变量（包括函数表达式），如： var a = 10;")]),t._v(" "),v("td",[t._v("声明（默认赋值为undefined）")])]),t._v(" "),v("tr",[v("td",[t._v("函数声明，如： function fn() { }")]),t._v(" "),v("td",[t._v("赋值")])]),t._v(" "),v("tr",[v("td",[t._v("this")]),t._v(" "),v("td",[t._v("赋值")])])])]),t._v(" "),v("p",[t._v("如果代码段是函数体，那么在此基础上需要附加：")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th"),t._v(" "),v("th")])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("参数")]),t._v(" "),v("td",[t._v("赋值")])]),t._v(" "),v("tr",[v("td",[t._v("arguments")]),t._v(" "),v("td",[t._v("赋值")])]),t._v(" "),v("tr",[v("td",[t._v("自由变量的取值作用域")]),t._v(" "),v("td",[t._v("赋值")])])])]),t._v(" "),v("p",[t._v("给执行上下文环境下一个通俗的定义——在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用undefined占个空。")]),t._v(" "),v("h2",{attrs:{id:"_10-this"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_10-this"}},[t._v("#")]),t._v(" 10. this")]),t._v(" "),v("p",[t._v("在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。")]),t._v(" "),v("p",[v("strong",[t._v("情况1：构造函数")])]),t._v(" "),v("p",[t._v("如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象。")]),t._v(" "),v("p",[t._v("如果直接调用Foo函数，这种情况下this是window")]),t._v(" "),v("p",[v("strong",[t._v("情况2：函数作为对象的一个属性")])]),t._v(" "),v("p",[t._v("作为对象的一个属性被调用时，函数中的this指向该对象。")]),t._v(" "),v("p",[t._v("如果fn函数被赋值到了另一个变量中，并没有作为obj的一个属性被调用，那么this的值就是window，this.x为undefined。")]),t._v(" "),v("p",[v("strong",[t._v("情况3：函数用call或者apply调用")])]),t._v(" "),v("p",[t._v("this的值取传入的对象的值。")]),t._v(" "),v("p",[v("strong",[t._v("情况4：全局 &调用普通函数")])]),t._v(" "),v("p",[t._v("在全局环境下，this永远是window")]),t._v(" "),v("p",[t._v("普通函数在调用时，其中的this也都是window。")]),t._v(" "),v("p",[t._v("以下情况注意：")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("var obj={\n  x:10,\n  fn:function(){\n    function f(){\n      console.log(this);//Window\n      console.log(this.x)//undefined\n    }\n    fn();\n  }\n}\nobj.fn();\n")])])]),v("p",[t._v("函数f虽然是在obj.fn内部定义的，但是它仍然是一个普通的函数，this仍然指向window。")]),t._v(" "),v("h2",{attrs:{id:"_11-执行上下文栈"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_11-执行上下文栈"}},[t._v("#")]),t._v(" 11. 执行上下文栈")]),t._v(" "),v("p",[t._v("执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。")]),t._v(" "),v("h2",{attrs:{id:"_12-简介-作用域"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_12-简介-作用域"}},[t._v("#")]),t._v(" 12. 简介[作用域]")]),t._v(" "),v("p",[v("strong",[t._v("javascript除了全局作用域之外，只有函数可以创建的作用域。")])]),t._v(" "),v("p",[t._v("所以，我们在声明变量时，全局代码要在代码前端声明，函数中要在函数体一开始就声明好。除了这两个地方，其他地方都不要出现变量声明。而且建议用“单var”形式。")]),t._v(" "),v("p",[t._v("作用域有上下级的关系，上下级关系的确定就看函数是在哪个作用域下创建的。")]),t._v(" "),v("p",[t._v("作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。")]),t._v(" "),v("p",[t._v("jQuery源码的最外层是一个自动执行的匿名函数：原因就是在jQuery源码中，声明了大量的变量，这些变量将通过一个函数被限制在一个独立的作用域中，而不会与全局作用域或者其他函数作用域的同名变量产生冲突。")]),t._v(" "),v("h2",{attrs:{id:"_13-作用域-和-上下文环境"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_13-作用域-和-上下文环境"}},[t._v("#")]),t._v(" 13. [作用域]和[上下文环境]")]),t._v(" "),v("p",[t._v("作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量的值。")]),t._v(" "),v("p",[t._v("作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了。")]),t._v(" "),v("p",[t._v("如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。")]),t._v(" "),v("h2",{attrs:{id:"_14-从【自由变量】到【作用域链】"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_14-从【自由变量】到【作用域链】"}},[t._v("#")]),t._v(" 14. 从【自由变量】到【作用域链】")]),t._v(" "),v("p",[t._v("自由变量:")]),t._v(" "),v("p",[t._v("在A作用域中使用的变量x，却没有在A作用域中声明（即在其他作用域中声明的），对于A作用域来说，x就是一个自由变量。")]),t._v(" "),v("h2",{attrs:{id:"_15-闭包"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_15-闭包"}},[t._v("#")]),t._v(" 15. 闭包")]),t._v(" "),v("p",[t._v("两个应用场景：函数作为返回值，函数作为参数传递。")]),t._v(" "),v("p",[t._v("要去创建这个函数的作用域取值，而不是“父作用域”。")]),t._v(" "),v("p",[t._v("这就是需要理解闭包的核心内容。")]),t._v(" "),v("h2",{attrs:{id:"_16-完结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_16-完结"}},[t._v("#")]),t._v(" 16. 完结")])])}],!1,null,null,null);_.default=r.exports}}]);