### 面向对象的Javascript

##### 1. 动态类型语言与鸭子类型

语言大致分为两种，一类是静态类型语言，另一类是动态类型语言。而js是动态类型语言，动态类型对变量类型的
宽容带来了很大的灵活性，这一切都是建立鸭子类型上。

那什么是鸭子类型呢，假如说我们判定只要有可以发出鸭子叫的动物就是鸭子，那么只要能发出鸭子叫就是鸭子，就是他是只鸡。
就是说只要能拥有该类型的一切方法，那么他就是该类型。这让我们只关注对象的行为，而不关注对象本身。

```
var duck = {
	duckSinging: function() {
		console.log('嘎嘎嘎');
	}
}
var chicken = {
	duckSinging: function() {
		console.log('嘎嘎嘎');
	}
}
var choir = [];
var joinChoir = function( animal ) {
	if ( animal && typeof animal.duckSinging === 'function') {
		choir.push(animal);
		console.log('恭喜加入合唱团');
		console.log('合唱团已有成员数量:' + choir.length);
	}
}
joinChoir(duck);  // 恭喜加入合唱团     合唱团已有成员数量1
joinChoir(chicken); //恭喜加入合唱团     合唱团已有成员数量2
```

##### 2.多态性

多态其实从某种意义上来说挺好理解的，字面意思多种形态嘛！

```
var duck = function() {}; 
var chicken = function() {};
// 这里为什么不用 var duck = {}; 是因为函数的扩展性比对象更好
var makeSound = function(animal) {
	if(animal instanceof duck) {
		console.log('嘎嘎嘎')；
	} else if (animal instanceof chicken) {
		console.log('咯咯咯');
	}
}
makeSound(new duck()); // 嘎嘎嘎
makeSound(new chicken()); // 咯咯咯
```
上面的方法如果想新增一种动物只能更改里面的代码.这个时候我们可以把公共的功能提取出来.

```
var makeSound = function(animal) {
	animal.sound();
};
var duck = functin() {};
duck.prototype.sound = function() {
	console.log('嘎嘎嘎');
};
var chicken = function() {};
chicken.prototype.sound = function() {
	console.log('咯咯咯');
}
makeSound(new duck()); // 嘎嘎嘎
makeSound(new chicken()); // 咯咯咯
```
这样如果想新增一个动物就很方便了。
这种静态类型一般设计成  向上转型 的模式，js可以通过prototype来传递

##### 3.封装

封装的目的是将信息隐藏，还有形成一个抽象的单元。

1. 封装数据
我们知道函数里面的数据是局部变量，我们就可以通过函数来封装数据。

```
var myObject = (function(){
	var _name = 'sven'; //局部变量
	return {
		getName:function(){
			return _name;
		}
	}
})();
console.log(myObject.getName()); // 输出sven
console.log(myObject._name); //输出undefined
```
2.封装实现
封装不仅仅是隐藏数据，还包括隐藏实现细节、设计细节、以及隐藏对象的类型。封装可以使对象之间的耦合性变低，
而且不会影响其他的抽象单元。

迭代器的实现就是通过封装来实现的，迭代器的作用是在不暴露一个聚合对象的内部表示的前提下，提供一种方式来顺序
访问这个聚合对象。

##### 4.原型编程的一些规则
+ 所有的数据都是对象
+ 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
+ 对象会记住它的原型
+ 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。