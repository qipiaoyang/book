### react系列笔记

现在很多大公司都会选择react作为前端的技术栈，我也是用react做了2个后台管理系统，然后在这里
把react系列知识结合源码以及工作总结，记了一个笔记。

学任何东西都是从hello,world！开始。

__这里推荐安装node7.6以上的版本__
	
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<div id="root"></div>
<script src="react.development.js"></script>
<script src="react-dom.development.js"></script>
<script src="babel.js" type="text/javascript" charset="utf-8"></script>
<script type="text/babel"> // 这里注意是text/babel
const element = (
	<h1>hello,world</h1>
);
ReactDOM.render(
	element,
	document.getElementById('root'),
);
</script>
</body>
</html>
```

1.npm init && npm install react react-dom --save

2.把node_modules/react/umd/react.development.js 以及 nodu_modules/react-dom/umd/react-dom.development.js copy到当前文件夹

3.引入babel.js

4.在网页上打开这个文件就显示出了hello,world！

这里面有几个点值得关注:

1.react 使用的jsx语法

2.怎么开始用react创建一个页面

这里我们从源码的角度来解析一下这个问题：

1.ReactDOM调用的是方法在_react-dom.development.js里面的15255行开始__

2.jsx语法的底层原理

