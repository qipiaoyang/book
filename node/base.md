### node 基础知识

1.console.trace(label); 可以将当前位置的栈信息作为标准错误信息进行输出
```
let test = 2;
console.trace(test);
//输出结果:
Trace: 2
    at Object.<anonymous> (D:\gongzuo\lesson\bluej010\test\js\base.js:2:9)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:393:7)
    at startup (bootstrap_node.js:150:9)
    at bootstrap_node.js:508:3

```
2.console.assert(label); 用于对一个表达式的执行结果进行断言评估
```
let name = "2";
console.assert(test === name);
//输出结果:
assert.js:81
  throw new assert.AssertionError({
  ^
AssertionError: false == true
    at Console.assert (console.js:95:23)
    at Object.<anonymous> (D:\gongzuo\lesson\bluej010\test\js\base.js:4:9)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:393:7)
    at startup (bootstrap_node.js:150:9)
```

3.exports 与 module.export 、 require 之间的关系
 这里先解释一下 module.exports 是用来作为模块的输出口，而require是用来加载模块的
 首先打印一下module(模块) 
 ```
 Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'D:\\gongzuo\\lesson\\bluej010\\test\\js\\base.js',
  loaded: false,
  children: [],
  paths:
   [ 'D:\\gongzuo\\lesson\\bluej010\\test\\js\\node_modules',
     'D:\\gongzuo\\lesson\\bluej010\\test\\node_modules',
     'D:\\gongzuo\\lesson\\bluej010\\node_modules',
     'D:\\gongzuo\\lesson\\node_modules',
     'D:\\gongzuo\\node_modules',
     'D:\\node_modules' ] }
D:\gongzuo\lesson\bluej010\test\js\test.js
 ```
 这里我们发现几个事情，
 + 每一个模块都有一个唯一的ID
 + module.filename 是当前模块的绝对路径
 + 模块的子模块是以多元数组的形式存在的
 + module.path是从当前模块的node_modules开始寻找的，然后一直往上级目录来寻找，
 + module.exports是用来输出的  所以我们可以打印一下console.log(module.exports === exports); //true
 + 所以export其实是module对象的一个属性，并且指向当前模块的输出
 
 然后我们打印require
 ```
 { [Function: require]
  resolve: [Function: resolve],
  main:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: 'D:\\gongzuo\\lesson\\bluej010\\test\\js\\base.js',
     loaded: false,
     children: [],
     paths:
      [ 'D:\\gongzuo\\lesson\\bluej010\\test\\js\\node_modules',
        'D:\\gongzuo\\lesson\\bluej010\\test\\node_modules',
        'D:\\gongzuo\\lesson\\bluej010\\node_modules',
        'D:\\gongzuo\\lesson\\node_modules',
        'D:\\gongzuo\\node_modules',
        'D:\\node_modules' ] },
  extensions: { '.js': [Function], '.json': [Function], '.node': [Function] },
  cache:
   { 'D:\gongzuo\lesson\bluej010\test\js\base.js':
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename: 'D:\\gongzuo\\lesson\\bluej010\\test\\js\\base.js',
        loaded: false,
        children: [],
        paths: [Object] } } }
 ```
 然后我们发现require是用来引入模块的，然后有以下特点:
 + 我们写java或者其他语言经常会有一个主函数，而模块化编程也提供了这种东西，require.main表示该模块的主模块
 + require.extensions 表示引入的模块的扩展名
 + require.cache能够捕捉已经引入的模块，并且把__引入模块的绝对路径__当作键,模块的内容当作值
 + require.resolve()可以查询模块的绝对路径
 
 
 4. __filename 和 __dirname
 
 ```
 console.log("文件名",__filename,"文件所在目录的名字",__dirname);
 
 //输出的内容是:
 文件名 D:\gongzuo\lesson\bluej010\test\js\base.js 文件所在目录的名字 D:\gongzuo\lesson\bluej010\test\js
 ```