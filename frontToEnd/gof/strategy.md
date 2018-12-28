### 策略模式

策略模式的定义: 定义一系列算法，把他们一个个封装起来，并且使他们能够相互替换。
	
策略模式的目的: 将算法的实现与算法的使用分离开来。

```
let calculateBonus = function(level,salary) {
	if(level === "s") {
		return salary * 4;
	}
	if(level === "a") {
		return salary * 2;
	}
	if(level === "b") {
		return salary * 1;
	}
}
calculateBonus("s" , 1000); // 4000
calculateBonus("a" , 2000); // 4000
```

但是上面的方法，很明显calculateBonus这个函数会越来越大，而且不透明性。

首先可以将他们透明化。

```
let level = function() {};
level.prototype._s = function(salary) {
	return salary * 4;
};
level.prototype._a = function(salary) {
	return salary * 2;
};
level.prototype._b = function(salary) {
	return salary * 1;
};
let getMoney = new level();
console.log(getMoney._s(1000));
```

这样子我们可以把每一个方法解耦出来，这是通过将对应的方法加到对象的原型里面去。

当然也可以把每一个方法加到对象的属性里面去.下面有一个案例就是这样。

```
let level = {
	_s: function(salary) {
	    return salary * 4;
	},
	_a: function(salary) {
	    return salary * 2;
	},
	_b: function(salary) {
	    return salary * 1;
	}
};
let getMoney = level._s(1000);
```

这里我们还可以把参数进行柯里化处理。

```
let bonus = function() {
    this.salary = null;
    this.strategy = null;
};
bonus.prototype.setSalary = function(salary) {
    this.salary = salary;
};
bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy;
};
bonus.prototype.getMoney = function() {
    return this.strategy.common(this.salary);
};
let _s = function() {};		
_s.prototype.common = function(salary) {
    return salary * 4;
};
let _a = function() {};
_a.prototype.common = function(salary) {
    return salary * 2;
};
let _b = function() {};
_b.prototype.common = function(salary) {
    return salary * 1;
};
let user = new bonus();
user.setSalary(1000);
user.setStrategy(new _s());
console.log(user.getMoney()); // 4000
```

上面的这个例子有几个地方可以关注一波

1.如何去保存一个变量，我们在setSalary的时候设置了salary，然后把他保存到对象的属性里面，方便后面计算

2.我们可以直接let _s = 4; 然后再getMoney里面进行运算。但是没有这么做，而是抽象成函数，然后在其原型里面的一个方法进行处理
(这样的一个好处是可以有函数的特征，__封装，继承，多态__)

3.理解策略模式的概念——————解耦方法，将其中的每一个通过算法来定义，并且把算法的实现以及算法使用分开来.


####  策略模式的优缺点

##### 优点

1.策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句.

2.策略模式提供了对开放————封闭原则的完美支持，将算法封装在独立的strategy(策略对象)中，使得
他们易于切换，易于理解，易于扩展。

3.策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。

##### 缺点

策略模式会增加很多对象以及算法，把很多东西都暴露在外，但是这算不上是一个缺点。

























