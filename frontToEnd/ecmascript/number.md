####  数字的方法

#### 1. 直接是对象的属性

##### 1.1 Number.isNaN() 

判断一个数字是不是NaN,如果是NaN就返回true,如果不是NaN, 返回false

```
console.log(Number.isNaN("a"/true)); //true    因为"a"/true 结果为NaN
console.log(Number.isNaN(2));// false  因为结果不是NaN
console.log(Number.isNaN("a"))；// false 因为结果不是NaN
```

##### 1.2 Number.parseFloat(string[)

将参数的值解析为浮点型,第一个参数为要解析的参数

```
console.log(Number.parseFloat("0.0010"));// 0.0010
console.log(Number.parseFloat("00.0010"));// 0.001 这里涉及到隐式转换，后面会讲到
```

##### 1.3 Number.parseInt(string[, radix=10)  

将参数的值解析为整型,第一个参数为要解析的参数，第二个参数为解析前的格式(通常我们默认不写，某些情况下,我们可以把二进制字符串或者其他的解析成数字)

```
console.log(Number.parseInt("110.0010"));// 110
console.log(Number.parseInt("111.00", 10));// 111 这里跟第一个例子是相同的，都是默认把参数转化为十进制数字
console.log(Number.parseInt("0110",2));// 6 这里就会把 0110这个字符串转换成二进制
```

这里有几个点需要注意一下：
1. __parseFloat方法是没有第二个参数的, 而parseInt存在第二个参数，转换前的格式__
2. __console.log(Number.parseFloat === parseFloat);// true 这说明Number下面的parseFloat方法 跟全局的parseFloat 方法是一致的，所以我们可以直接写parseFloat方法。(parseInt同理)__
3. __上面三个方法都是直接挂在Number对象下面的方法，是直接通过Number.方法名 就可以直接使用的__

#### 2. 对象原型上面的方法

##### 2.1 Number.prototype.toFixed(param = 0)  保留小数的方法

方法使用定点表示法来格式化一个数值，相当于保留几位小数并且四舍五入。默认里面的参数为0

__IE下面是四舍五入，chrome是五舍六入,所以处理金额的时候慎用，可能有bug,使用的话建议通过判断后一位是大于4还是小于4__

```
console.log(1.234.toFixed());// 1 默认
console.log(1.255.toFixed(2));// 1.25 保留小数点后两位,五舍六入为 1.25 IE为1.26
console.log(1.256.toFixed(2));// 1.26 保留小数点后两位,五舍六入为 1.26
```


##### 2.2  Number.prototype.toExponential(param = length)  以指数的方式展现，同时保留几位小数，默认是展现全部   __这点与toFixed不一样__

方法使用指数表示法来格式化一个数值，相当于保留几位小数并且四舍五入。默认里面的参数为全部展现

```
console.log(1.234.toExponential());// 1.234e+0 默认展现全部(这点与toFixed不一样)
console.log(1.255.toExponential(2));// 1.25e+0 保留小数点后两位,五舍六入为 1.25 IE为1.26
console.log(1.256.toExponential(2));// 1.26e+0 保留小数点后两位,五舍六入为 1.26
```


##### 总结

数字下面虽然提供了这些方法，但是如果涉及到一些关键数据的计算，最好手动判断字符串来判断。
