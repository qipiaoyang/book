### 享元模式

享元模式是一种用于性能优化的模式，享元模式的核心是运用__共享技术__来有效支持大量细粒度的对象。

首先我们来看一个享元模式最标准的一个例子。

```
//享元模式
var Model = function(sex) {
	this.sex = sex;
};
Model.prototype.takephoto = function() {
	console.log('sex' + this.sex + 'underwear' + this.underwear);
} 
var maleModel = new Model('male'),
		femaleModel = new Model('female');
for(var i = 0; i <=50; i++) {
	maleModel.underwear = 'underwear' + i;
	maleModel.takephoto();
}		
for(var i = 0; i <=50; i++) {
	femaleModel.underwear = 'underwear' + i;
	femaleModel.takephoto();
}
//非享元模式
var Model = function(sex,underwear) {
	this.sex = sex;
	this.underwear = underwear;
};
Model.prototype.takephoto = function() {
	console.log('sex' + this.sex + 'underwear' + this.underwear);
}
for(var i = 0; i <=50; i++) {
	var maleModel = new Model('male','underwear' + i);
	maleModel.takephoto();
}
for(var i = 0; i <=50; i++) {
	var femaleModel = new Model('female','underwear' + i);
	femaleModel.takephoto();
}
```

上面的案例是一个给50个男生和50个女生underwear，然后takephoto的一个过程。有两种模式。有心的同学会关注到
非享元模式的缺点在于new了很多对象，造成浪费，但是这并不是核心。

我个人理解的享元模式的核心在于__找出共享的元素__，称之为享元，找出共同点，聚合起来。

接下来说说享元模式的几个关键点。

- 享元模式通常把对象的属性分为内部状态和外部状态，内部状态是共享的部分，外部状态时变化的部分
- 内部状态存储在对象内部，可以被共享
- 内部状态一般不会发生改变
- 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享


#### 对象池的实现

首先了解一下对象池的定义，对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接new，而是转从对象池里面获取。
如果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后，再进入池子等待被下次获取。

很简单的理解就是，家里如果有零食，直接拿，没有就创建一个，少了再去买一个。。。

对象池的通用实现如下：

```
var objectFactory = function(createObj) {
	var objList = [];
	return {
		create: function(){
			var obj = objList.length === 0 ? createObj.apply(this,arguments) : objList.shift();
			return obj;
		},
		recover: function(objFn) {//对象池回收对象
			objList.push(objFn);	
		}
	}
}
```