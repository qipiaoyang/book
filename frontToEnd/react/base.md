#### 1.ReactDOM的render方法

```
 render: function (element, container, callback) {
    return renderSubtreeIntoContainer(null, element, container, false, callback);
  },
```
这里我们传入render的第一个参数为 要挂载的元素 ，第二个是容器container，第三个参数是回调函数。
从这个函数我们可以看出一些问题，

1.element和container是唯一的，不能挂载多个

```
const element = (
	<h1>hello,world</h1>
);
const element1 = (
	<span>我是第二个要挂载的元素</span>
);
ReactDOM.render(
	element,
	element1,
	document.getElementById('test'),
); //会报错
```

如果同时挂载多个，会把第二要载的元素当作container，第三个参数当作false来处理，所以会报错。

2. 对于container，一定是一个DOM element并且是有要求的

```
function renderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  !isValidContainer(container) ? invariant_1(false, 'Target container is not a DOM element.') : void 0;
  

True if the supplied DOM node is a valid node element.
@param {?DOMElement} node The candidate DOM node.
@return {boolean} True if the DOM is a valid DOM node.
@internal

function isValidContainer(node) {
  return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable '));
}

var ELEMENT_NODE = 1; // 元素节点
var TEXT_NODE = 3;
var COMMENT_NODE = 8; //
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
```

这里，顺便科普一下js的基础:

1.element    			元素节点

2.Attr       			属性节点

3.Text       			文本节点

4.CDATASelection    	代表文档中的 CDATA 部分（不会由解析器解析的文本）。

5.EntityReference   	代表实体引用

6.Entity            	代表实体。

7.ProcessingInstruction 代表处理指令。

8.Comment				代表注释节点.

9.Document				整个文档根节点

10.DocumentType			向为文档定义的实体提供接口，也就是  <!DOCTYPE………..>

11.DocumentFragment		轻量级的 Document 对象，能够容纳文档的某个部分，文档碎片节点 ,react就是通过fragment来处理的

12.Notation				DTD 中声明的符号。  

#### 2. jsx语法的底层原理

我们在渲染element的时候，看源码就明白他是在调用renderSubtreeIntoContainer方法，而这个方法最终都是DOMRenderer.getPublicRootInstance(root);(这个是在15853行)
然后我们就可以看到

```
var newRoot = DOMRenderer.createContainer(container, shouldHydrate);
    root = container._reactRootContainer = newRoot;
	
```

而DOMRenderer 创建实例的方式都是通过createElement

```
var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
    precacheFiberNode(internalInstanceHandle, domElement);
    updateFiberProps(domElement, props);
```

然后我们接下来就可以具体来看看createElement做了什么事情-------14524行

```
if (namespaceURI === HTML_NAMESPACE) {
    namespaceURI = getIntrinsicNamespace(type);
  }
  if (namespaceURI === HTML_NAMESPACE) {
    {
      var isCustomComponentTag = isCustomComponent(type, props);
      // Should this check be gated by parent namespace? Not sure we want to
      // allow <SVG> or <mATH>.
      warning_1(isCustomComponentTag || type === type.toLowerCase(), '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', type);
    }
	if (type === 'script') {
      // Create the script via .innerHTML so its "parser-inserted" flag is
      //  
      var div = ownerDocument.createElement('div');
      div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
      // This is guaranteed to yield a script element.
      var firstChild = div.firstChild;
      domElement = div.removeChild(firstChild);
    } else if (typeof props.is === 'string') {
      // $FlowIssue `createElement` should be updated for Web Components
      domElement = ownerDocument.createElement(type, { is: props.is });
    } else {
      // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
      // See discussion in https://github.com/facebook/react/pull/6896
      // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
      domElement = ownerDocument.createElement(type);
    }
```

首先是判断是不是html标签，如果不是html标签的话，就创建一个html标签，如果是常规组件isCustomComponentTag，判断是不是大写，如果是小写就
warning 组件通常是首字母大写。 __react组件最好首字母大写__

然后这里面还判断了xxs注入，判断type是不是script。所以还是很贴心的

然后我们看看createElement的方法

```
function createElement$1(type, props, rootContainerElement, parentNamespace) 
```

这里我们要注意，createElement后面的大括号就是一个变量输出表达式，参数写多了就会当成下一个参数上，语法不对。
所以以下几种写法是不对的。

```
React.render(
	<div>123{var a = 1}<div>,// 只能输出一个变量或者抽象单元
	document.getElementById("root")
);
在render里面打印我们可以{console.log(a)},这样是可以的
```

然后写jsx的时候有一些需要注意的地方:

1.不要在HTML模板中写JS关键字，所以 class 应该用 className，for 应该用 htmlFor

2.所有的DOM的标准属性都是驼峰命名法，比如onClick,但是data-x 和 aria-x还是用短横线分隔，这是react在内部做了处理的

3.style接收的是一个key-value的键值对，就像jq写css一样，不是字符串。

4.所有的事件都是和W3C规范一致的！因为React内部对事件做了封装，后面会讲到react的事件处理机制

5.表单输入属性，例如 value 和 checked，以及 textarea





