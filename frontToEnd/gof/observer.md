### 发布——订阅模式

发布——订阅模式又叫观察者模式，它定义对象之间的一种一对多的依赖关系，当一个对象发生改变时，所有依赖于它的对象都将
得到通知。


#### 发布——订阅模式一定要遵守先订阅再发布

```
var salesOffices = {};
salesOffices.clientList = {}; //缓存列表		
//将缓存的事件保存到clientList这个对象里面去
salesOffices.listen = function(key, fn) {
	if (!this.clientList[key]) {
		this.clientList[key] = [];
	}
	this.clientList[ key ].push( fn );
}		
salesOffices.trigger = function() {
	var key = Array.prototype.shift.call(arguments), // 设置key为arguments的第一个参数，并且设置arguments为后面的参数
		fns = this.clientList[key]; // 获取该键下面对象的所有消息
	if (!fns || fns.length === 0) {
		return false;
	}
	for (var i = 0, fn; fn = fns[i++];) {
		fn.apply(null, arguments);
	}
};
//先订阅
salesOffices.listen("88平方米", function(price,name) {
	console.log("price = ", price); //price = 20000000
	console.log("name = ", name); // name = 5000
});
//再发布
salesOffices.trigger("88平方米", 20000000, 5000);
salesOffices.trigger("88平方米", 30000000, 6000);
```


#### 发布——订阅模式的通用实现

```
var event = {
	clientList: [],
	listen: function( key, fn ) {
		if( !this.clientList[ key ]) {
			this.clientList[ key ] = [];
		}
		this.clientList[ key ].push( fn );
	},
	trigger: function() {
		var key = Array.prototype.shift.call( arguments ),
			  fns = this.clientList[ key ];
		if( !fns || fns.length === 0 ) {
			return false;
		}
		for( var i = 0, fn; fn = fns[ i++ ]; ) {
			fn.apply( this, arguments );
		}
	},
	remove: function( key, fn ) {
		var fns = this.clientList[ key ];
		if( !fns ) {
			return false;
		}
		if( !fn ) { //如果没有传入具体的参数,表示移除所有的
			fns && ( fns.length = 0 );
		} else {
			for( var l = fns.length - 1; l >=0; l-- ) {
				var _fn = fns[ l ];
				if( _fn === fn ) {
					fns.splice( l, 1 );
				}
			}
		}
	}
};
var installEvent = function( obj ) {
	for( var i in event ) {
		obj[ i ] = event[ i ];
	}
}
var salesOffices = {};
installEvent( salesOffices );
salesOffices.listen( "88平方米" , fn1 = function( price ) {
	console.log( "price ============ " + price );
});
salesOffices.listen( "88平方米" , fn2 = function( price ) {
	console.log( "price = " + price );
})
salesOffices.remove( "88平方米", fn1); //这里要先移除监听再去发布
salesOffices.trigger( "88平方米", 3000000);
```

总结: 发布——订阅模式的实现方式就是把要订阅的内容缓存起来，先发布，然后进行缓存，订阅的时候从缓存里面去查找。

##### 发布——订阅模式的优缺点

发布订阅的优点非常明显，一为__时间上的解耦__,二__对象上的解耦__.缺点是，创建缓存对象要消耗一定的内存和时间，
对象与对象之间的关系变得难以维护，不容易解决bug。




