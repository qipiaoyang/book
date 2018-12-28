### 迭代器模式

定义： 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
__迭代器模式可以把迭代的过程从业务逻辑中分离出来__.

#### 1.内部迭代器

```
let each = function(arr,callback) {
	for(let i = 0, l = arr.length; i < l; i++) {
		callback.call(arr[i],i,arr[i]);  //将每一个回调函数的指向，指向每一个元素
	}
};
each([1,2,3,4],function(i,n) {
	console.log(i,n);
});
```

内部迭代器的实现原理就是遍历聚合对象的属性，然后改变每一个回调函数的属性。
__内部迭代器的好处就是你不用关注里面实现原理，你只需要关注结果就好了__

#### 2.外部迭代器

外部迭代器必须显示地请求迭代下一个元素。内部迭代器与外部迭代器的区别可以按照这样理解，一个是垂直向的封装，一个是
水平方向的封装。内部迭代器是封装整个方法，迭代的逻辑是固定的，只是把结果暴露出来。外部迭代器是垂直向封装，
把迭代过程中的对象暴露出来，而迭代过程还是需要自己写。


```
//外部迭代器
let outIterater = function(obj) {
	let count = 0;
	let next = function() {
		count += 1;
	};
	let isEnd = function() {
		return count >= obj.length;
	};
	let getItem = function() {
		return obj[count];
	};
	return {
		next:next,
		isEnd:isEnd,
		getItem:getItem,
	}
};

let compare = function(iterator1,iterator2) {
	while(!iterator1.isEnd() && !iterator2.isEnd()) {
		if(iterator1.getItem() !== iterator2.getItem()) {
			throw new Error ("iterator1 和 iterator2 不相等");
		}
		iterator1.next();
		iterator2.next();
	}
	console.log("iterator1 和 iterator2 相等");
};
let iterator1 = outIterater([1,2,3,4]); //外部迭代器把原本的对象封装成一个(迭代器对象)
let iterator2 = outIterater([1,2,3,4]);
compare(iterator1,iterator2);
```

#### 3.迭代类数组的对象和字面量对象

只要被迭代的聚合对象有length属性而且可以用下标访问，那么它就可以被迭代。
所以以下这几种都可以被迭代。

- 类数组对象  arguments/[7,8,9]
- 数字			7,8,9
- 字符串  "111111111111"


#### 4.倒序迭代器

倒序迭代器就是改变迭代的顺序就可以了，这里就不过多做介绍.

```
var reverseEach = function(arr,callback) {
	for(let len = arr.length, i = len - 1; i >= 0 ; i--) {
		callback(i, arr[i]);
	}
};
reverseEach([0,1,2], function(i,n) {
	console.log(n); // 2,1,0
});
```

#### 5.中止迭代器

迭代器可以像for循环中的break一样，提供一种跳出循环的方法。

```
var each = function( arr, callback ) {
	for(let i = 0, len = arr.length; i < len; i++ ) {
		if( callback( i, arr[i]) === false ) { //callback的执行结果返回false，提前终止迭代
			break;
		}
	}
}
each( [1,2,3,4,5], function(i,n) {
	if( n > 3 ) {
		return false;
	}
	console.log(n);// 1,2,3
});
```


















