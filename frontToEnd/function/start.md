### 函数式编程的简介

我不知道大家对于函数的理解是什么，但是这里我说下自己的理解:
"凡此变数中函彼变数者，则此为彼之函数",这是清朝的一个大佬对于函数的定义，我觉得说的还是很对的，一个量中包含另外一个量，则称之为这个为那个函数。量是什么，1个苹果是一个量，一吨苹果也是一个量。量我暂时定义为集合。

有几点作者的约定我比较认同:

1.在不考虑应用场景的情况下，优先使用函数而不是对象
2.零参数的函数用于表示该参数并不重要
3.单行if/else   避免使用大括号，这样可以节省垂直空间
4.喜欢用分号

#### 什么是函数式编程？
    函数式编程通过使用函数来将值转换成抽象单元，接着用于构建软件系统。

#### 函数式编程与面向对象的区别
    面向对象: 如果用面向对象来组合一个大的系统，一般是通过对象的聚集形成一个更大的对象。类似二叉树。
    函数式编程: 函数式变成通过函数的聚集形成一个更抽象的函数。

看到这里，区别就出来了。面向对象的编程，对象会有状态，每一个之间是通过状态来影响的，而函数是无状态的。当然，函数式编程也有他的局限性。

面向对象的优点: 面向对象的方法适合模拟人

函数式编程的优点: 以处理集合为中心的函数式方式更适合处理与人有关的数据，这是作者的原话，我个人的理解是，当状态的层级少的时候函数式编程会方便很多，嵌套过深的函数式编程会变得不容易维护。

这里有一个例子，我们来对比一下:

```
function parsePage(){
    if(!_.isString(age))  throw new Error("Expecting a string!");
    var a;
    console.log("Attempting to parse an age");
    a = parseInt(age,10);
    if(_.isNaN(a)) {
        console.log(["Could not parse age:", age].join(' ');
        a = 0;
    }
    return a;
}
```

```
function fail(thing){
    throw new Error(thing);
}

function warn(thing){
    console.log(["Warning:", thing].join(' '));
}

function note(thing){
    console.log(["Note:", thing].join(' '));
}

function parseAge(age){
    if(!_.isString(age)) fail("Expecting a string!");
    var a;
    note("Attempting to parse an age");
    a = parseInt(age,10);
    if(_.isNaN(a)) {
        warn(["Could not parse age:", age].join(' '));
        a = 0;
    }

    return a;
}
```
我们假如想修改第一个方法的警告呈现方式,只能修改代码，而第二种方式就比较简单。