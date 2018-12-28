### 代理模式

__定义: 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。__

这里举个例子，正常情况下，当你喜欢一个妹子，你可以给他送花，我们可以模拟成这个样子。

```
let Flower = function() {
    this.name = "花";
};
let a = {
    sendFlower: function(user) {
	let flower = new Flower();
	user.reciveFlower(flower);    
    }
};
let b = {
    reciveFlower: function(obj) {
	console.log("我收到了" + obj.name);    
    }
};
a.sendFlower(b); // 我收到了花
```

现在我们可以找个中间商proxy，我们让proxy代替我们去送花。

```
let Flower = function() {
    this.name = "花";
};
let a = {
    sendFlower: function(user) {
	let flower = new Flower();
	flower.age = 18;
	user.reciveFlower(flower);    
    }
};
//这里通过代理对象的reciveFlower然后去执行b的reciveFlower
let proxy = {
    reciveFlower: function(flower) {
	b.reciveFlower(flower) ;   
    }
};
let b = {
    reciveFlower: function(obj) {
	console.log("我收到了" + obj.name + obj.age);    
    }
};
a.sendFlower(proxy); // 我收到了花
```

这样就完成了一个简单的代理功能。但是代理还有以下一些模式。

#### 1.保护代理

保护代理的意思是在代理的时候，会过滤一些条件，而不是无脑代理。

```
let Flower = function () {
    this.name = "花";
};
let a = {
    sendFlower: function (user) {
	let flower = new Flower();
	flower.age = 18;
	user.reciveFlower(flower);
    }
};
let c = {
    sendFlower: function (user) {
	let flower = new Flower();
	user.reciveFlower(flower);
    }
};
let proxy = {
    reciveFlower: function (flower) {
	if(flower.age) {
	    console.log("不接受花");
	} else {
	    b.reciveFlower(flower);
	}
    }
};
let b = {
    reciveFlower: function (obj) {
	console.log("我收到了" + obj.name + obj.age);
    }
};
a.sendFlower(proxy); // 不接受花
c.sendFlower(proxy); // 我收到了花18undefined
```

我们可以看到上面的a对象在送花的时候，在花对象里面加了点东西，这个时候如果我们想屏蔽，就可以直接在proxy里面进行处理，
不让他送到b的手上，而c送花没加东西就可以收到了。

#### 2.虚拟代理

当每次a要送花的时候都会要去买花，假如买的花b不接受，那就相当于白买了，这个时候我们就可以先让代理问下b同不同意，如果同意让b
帮忙买就可以了。

```
let _proxy = {
    reciveFlower: function() {
	let flower = new Flower();
	b.reciveFlower(flower);
    }
};
```

#### 3.缓存代理

缓存代理就是把代理过的内容都缓存起来，一般我们可以存在一个对象的属性里面。

```
let proxyMult = (function() {
    let cache = {};
    return function() {
	//这里因为arguments不是数组，想要使用数组的这个功能就可以通过call的方式来实现
	let args = Array.prototype.join.call(arguments,","); 
	if(args in cache) {
	    return cache[ args ];
	}
	//这里相当于 let cache[ args ] = mult.apply(this,arguments); return cache[ args ]
	return cache[ args ] = mult.apply(this,arguments); 
    }
})();
console.log(proxyMult(1,2,3,4));
```

#### 4.用高阶函数动态创建代理

```
let proxyObj = function(fn) {
    let cache = {};
    return function() {
	//这里因为arguments不是数组，想要使用数组的这个功能就可以通过call的方式来实现
	let args = Array.prototype.join.call(arguments,","); 
	if(args in cache) {
	    return cache[ args ];
	}
	//这里相当于 let cache[ args ] = fn.apply(this,arguments); return cache[ args ]
	return cache[ args ] = fn.apply(this,arguments); 
    }
};
let multproxy = proxyObj(nult);
multproxy(1,2,3,4); // 24
```

#### 5.其他代理模式

##### 1.防火墙代理     控制网络资源的访问,保护主题不让“坏人”接近。
##### 2.远程代理       为一个对象在不同的地址空间提供局部代表，在java中，远程代理可以是另一个虚拟机中的对象
##### 3.保护代理       用于对象应该有不同访问权限的情况
##### 4.智能引用代理   取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个对象被引用的次数。
##### 5.写时复制代理   通常用于复制一个庞大的对象的情况。写时复制代理延迟了复制的过程，当对象被真正修改时，才对他进行复制操作，写时复制代理是虚拟代理的一种变体，DLL是其典型运用场景。                 
总结: 代理模式的意义，一般是为了实现单一职责原则，让一个对象承担一项职责，这样可以降低耦合度。以及提高对象的可扩展性。
