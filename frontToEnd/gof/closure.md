### 闭包与高阶函数

闭包这个词一直前端开发永远避不开的一个话题。那为什么要用闭包呢？

这个问题要从javascript的变量生成方式来说了，js创建的变量是全局变量，只有在函数里的变量是局部变量。
而我们在写程序的时候，都喜欢让所有的代码都在我们的掌握之中，不喜欢所有的东西都炖在一个锅里。

所以这个时候我们需要把代码分块分类的整理在一起，刚好函数可以帮助我们这样做。
所以就产生了闭包这样的东西。

```
(function(){
	console.log('这里是闭包的空间');
})();
var func = function(){
	console.log('这里是闭包的空间'); 
	return function(){
		
	};
};
```

闭包就是为了产生一个封闭的空间。能够与其他抽象单元的代码耦合性更低。

##### 闭包的作用

1.闭包可以封装变量
闭包里的变量是局部变量，

2.延长局部变量的寿命


### 高阶函数
首先我们可以看看高阶函数的定义，满足以下两个条件的可以称之为高阶函数：
+ 函数可以作为参数被传递
+ 函数可以作为返回值输出


#### 把函数作为参数传递
一个函数可以理解成是一个抽象单元，把这个抽象单元进行传递，这样我们__可以分离业务代码中变与不变的部分__.


#### 把函数作为返回值输出
让函数继续返回一个可执行的函数，意味着运算过程是可延续的，也是具有生命特征的。

这里插入一条判断对象的类型方法
```
var isString = function(obj) {
	return Object.prototype.toString.call(obj) === '[object String]';
};
var str = 'this is a string'; // [object String]
var str = 123; //[object Number]
var str = false; //[object Boolean]
var str; //[object Undefined]
var str = null;//[object Null]
var str = [1,2,3]; // [object Array]
var str = function (){var a = 1;}; //[object Function]
console.log(Object.prototype.toString.call(str));
```

我们再来看一下基于上面方法写的一个高阶函数

```
var isType = function(type) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === "[object "+ type +"]";
		}
	};
var isString = isType("String")('1231'); // true 
var isArray = isType("Array")([1,2,3]);// true
var isNumber = isType("Number")(1);// true
```
像上面的例子，把函数作为返回值就可以形成链式调用

通过返回值实现单例模式
```
var getSingle = function(fn) {
	var ret;
	return function() {
		console.log(arguments);
		return ret || (ret = fn.apply(this, arguments)); // 这里通过 更改this指向，并赋值给ret
	};
};
var getScript = getSingle(function(){
	return document.createElement("script");
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2);// true
```

#### 高阶函数实现AOP

AOP(面向切面编程) 的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，像日志统计，安全控制，异常处理等
在java语言中，可以通过反射，和动态代理机制来实现AOP。javascript中可以通过把一个函数__动态植入另外一个函数__中。

```
Function.prototype.add = function(fn) {
	var _self = this;
	return function(){  // 返回包含了原函数和新函数的"代理"函数
		//这里主要做两件事情，1.修正函数的指向，2.执行所有的函数，可以改变顺序来改变返回的结果
		fn.apply(this,arguments); // 将传入的函数修正指向，这里先执行add函数再执行原函数
		var ret = _self.apply(this,arguments);

		return ret; // 执行原函数,这里直接返回原函数结果
	}
};
Function.prototype.subtract = function(fn) {
	var _self = this;
	return function(){
		var ret = _self.apply(this,arguments);//这里先执行原函数再执行subtract函数
		fn.apply(this,arguments);
		return ret;
	}
}
var func = function() {
	console.log(2);
};
func = func.add(function(){
	console.log(1);
}).subtract(function(){
	console.log(3);
}); // 1，2，3
func();
```

#### 高阶函数的其他应用

1. currying---函数柯里化 (部分求值)
2. uncurrying
3. 函数节流
4. 分时函数
5. 惰性加载函数
