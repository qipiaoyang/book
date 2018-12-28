#### 循环优化

for循环是平常用的最多的一种遍历方式，这里有几种一些常见的优化方式。

#### 1.避免重新赋值

```
let arr = ['1','2','3'];
// 重新赋值版本
for(let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
// 非重新赋值版本
for(let i = 0, len = arr.length; i < len; i++) {
	console.log(arr[i])
}
```

#### 2.过程优化

通过二叉树来减少遍历过程。(时间能够减少很多)
```
var str1 = 'bgg';
var res1 = '';
var i = 5;
while (i) {
	if(i % 2 === 1) {
		res1 += str1; //二叉树的左边第一个节点拼接
	}
	if(i > 1) {
		str1 += str1; //二叉树的每一层拼接
	}
	i >>= 1;
}
```

#### 3.通过Iterator接口

Iterator接口是通过调用底层指针去循环判断的。
```
var someString = "hiaa";
var iterator = someString[Symbol.iterator]();
let result = iterator.next();
while(!result.done) {
	console.log(result);
	result = iterator.next();
}
```
