### this、call 和apply

关于this似乎永远是javascript永远逃不开的话题。这里我就谈谈自己的拙见吧。
我们知道this是伴随着function产生的。

```
var obj = function(arg) {
	console.log(this);//指向test1
};
var test1 = obj();
function obj(arg) {
	console.log(this);//指向window
}
obj();
```
我们在创建函数的时候就会有this,这个东西似乎跟c语言的指针对象一样。
this通常只有2个指向，一个是指向顶层对象(在浏览器里指向window),另外一个指向函数实例化后的对象。

这里面为什么指向顶层对象其实很好理解，因为他本身就是属于顶层对象里面的函数啊。
(这里特别说明一点，在创建匿名函数，其实跟创建对象一样，都是分配一个内存地址，只不过
匿名函数的指针对象没有分配，而实例化之后有了固定的指针对象)。


#### 改变this指向的几种方法 call、apply、bind

这两种方法都可以改变this的指向，说白了就是更改指针对象。(如果这里不理解可以去看下慕课网的c语言教程);

call与apply都可以接受参数，第一个参数的this对象的指向，apply后面是接一个数组，而call后面是每一个参数

call是包装在apply上面的一个语法糖。
```
var func = function(a,b,c) {
	alert([a,b,c]); //输出[1,2,3]
};
func.apply(null,[1,2,3]);
func.call(null,1,2,3);
```

这里我们会发现call和apply都会执行函数返回结果。如果不想返回结果，我们就可以使用bind

```
func.bind(null,4,5,6)(); // 4,5,6, undefinedfunc.bind(null,4,5,6)(); // 4,5,6, undefined
最后一个undefined是因为函数自执行了一遍
```