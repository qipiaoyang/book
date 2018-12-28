### 单例模式

单例模式的定义 : 保证一个类仅有一个实例，并提供一个访问它的全局访问点。


##### 1.不透明的单例模式 

```
var singleTest = function(name) {
	this.name = name;
	this.instance = null;
};
singleTest.getName = function(name) {
	if(!this.instance) {
		this.instance = new singleTest(name);
	}
	return this.instance;
}
var cc = singleTest.getName("123");
var dd = singleTest.getname("456");
console.log(cc === dd); // true
```

上面的代码就是一个单例模式的编写，这里我们是通过getName来进行判断了，直接获取不好，所以通过把singleTest(name)
赋值给instance，然后通过instance是不是存在来保证仅有一个实例。

但是这不是一个透明的单例模式，透明的概念是你不知道他是不是一个单例模式，不是明确，而不是正常的通过new 一个方法来
创建。

##### 2.透明的单例模式

```
var createDiv = (function(){
	var instance;
	var createDiv = function(html) {
		if(instance) {
			return instance; 
		} 
		this.html = html;
		this.init();
		return instance = this;
	};
	
	createDiv.prototype.init = function() {
		var div = document.createElement("div");
		div.innerhtml = this.html;
		document.body.appendChild(div);
	};
	return createDiv;
})(window.createDiv || createDiv);
var a = new createDiv("test1");
var b = new createDiv("test2");
console.log(a === b); // true
```

这里实现一个透明的单例模式很简单，直接定义createDiv方法就可以，但是我们还是需要判断条件，所以定义了instance
变量，但是为了保证变量污染,我们用闭包包裹起来，但是这明显不是一个好的方法。

我们可以通过代理的方式来解决上面的问题。

```
//负责创建createDiv，并且初始化
var createDiv = function(html) {
	this.html = html;
	this.init();
};
//createDiv的init方法
createDiv.prototype.init = function() {
	var div = document.createElement("div");
	div.innerhtml = this.html;
	document.body.appendChild(div);
};
//作为代理，来保证有且仅有一个实例
var proxysingle = (function(){
	var instance;
	return function(html){
		if(!instance) {
			return new createDiv(html);
		}
		return instance;
	}
})();
var a = new proxysingle("test1");
var b = new proxysingle("test2");
console.log(a === b); // true
```

这里的设计规则是__单一职责原则__,一个方法只完成一个事务。

##### 降低全局变量带来的命名污染

1.使用命名空间

将变量作为对象的属性方式来处理

```
var obj = {
	a: function(){
		console.log("A");
	},
	b: function(){
		console.log("B");
	},
}
```

2.使用闭包来封装变量

```
var user = (function(){
	var _name = 'sven',
		_age = 29;
	return {
		getUserInfo: function() {
			return _name + '-' + _age;
		}
	}
})();
```

#### 惰性单例模式

惰性单例模式就是你在使用的时候才创建，而不是一开始就创建。拿上面的案例来说明一下.

```
//负责创建createDiv，并且初始化
var createDiv = function(html) {
	this.html = html;
	this.init();
};
//createDiv的init方法
createDiv.prototype.init = function() {
	var div = document.createElement("div");
	div.innerhtml = this.html;
	document.body.appendChild(div);
};
//作为代理，来保证有且仅有一个实例

//惰性单例，在需要的时候才创建对象，如果有就不创建
var proxysingle = (function(){
	var instance;
	return function(html){
		if(!instance) {
			return new createDiv(html);
		}
		return instance;
	}
})();

//非惰性单例，直接创建一个div
var proxysingle = (function(){
	return function(html){
		return new createDiv(html);
	}
})();
var a = new proxysingle("test1");
var b = new proxysingle("test2");
console.log(a === b); // true
```

##### 通用惰性单例模式的创建

通用惰性单例模式就是你通过这个函数创建任何一个单例的时候，都是惰性单例，其实就是改变改变this的指向。

```
var general = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this,argument); //通过apply来改变this指向
	}
};
```



#### 总结: 
#### 1.单例模式就是保证全局有且仅有一个实例，并且提供一个访问点。
#### 2.透明单例模式(透明的概念是指，通过new 或者正常创建对象的方式来实现，而不是隐藏在对象的属性里面，或者其他的处理)
#### 3.惰性单例模式(惰性单例模式就是指在使用的时候才创建，而不是直接创建，节约系统资源)
#### 4.单一职责原则
#### 5.通用单例模式(将惰性单例模式封装起来，改变this指向)