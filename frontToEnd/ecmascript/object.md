### object方法学习笔记

#### 1. Object.assign( parma1, parma2, parma3...) 方法用于将所有__可枚举属性__的值从一个或多个源对象复制到目标对象，返回目标对象

__Object.assign()是浅拷贝，而不是深拷贝。__

- 第一个参数是目标对象
- 后面的参数都是源对象

```
var obj = {
	a: 1,
	b: 2,
};
var obj1 = Object.assign({c:4},obj);
console.log(obj1); // {a:1,b:2,c:4}  将obj内容复制到对象第一个参数的对象里面
const obj2 = { a: 2 };
Object.assign( obj2 ) === obj2; // true
```

#### 2. Object.is() 方法用来比较两个值是否严格相等 与 严格运算符 ( === )的行为基本一致。这是ES6提出的 "Same-value eqality" 算法

```
Object.is( 'foo', 'foo' );// true
Object.is( {}, {} ); // false
```

#### 3.Object.getOwnPropertyDescriptor() 可获得描述对象的每个属性对应的描述对象

```
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor( obj, "foo" );  // {value: 123, writable: true, enumerable: true, configurable: true}
```

目前有4个属性会忽略enumerable为false的属性

+ for...in 循环: 只遍历对象自身的和__继承的__可枚举属性
+ Object.keys(): 返回对象自身的所有可枚举的属性的键名
+ JSON.stringify(): 只串行化自身的可枚举属性
+ Object.assign(): 忽略enumerable属性为false的属性，只拷贝对象自身的可枚举属性

__ES6规定，所有Class的原型的方法都是不可枚举的__.所以大多时候尽量不要用for...in来循环，而用Object.keys()来循环

#### Object.freeze()可以冻结一个对象，冻结指的是不能给冻结对象添加属性或者修改其已有属性值，也不能删除已有属性，然后返回被冻结的对象。

```
let emptyObj = Object.freeze({}); // 通常用来当作常量来处理
```