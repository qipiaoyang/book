### react系列笔记————挂载vnode

如何把vnode挂载到真实节点上。主要有以下2步：
1.构建元素节点
2.挂载属性节点

#### 1.构建元素节点

```
    // 如果是字符串
    if(typeof vnode === "string") {
        const textNode = document.createTextNode(vnode);
        return container.appendChild(textNode)
    }
    const dom = document.createElement(vnode.tag);
    if(vnode.children) {
        vnode.children.forEach(child => render(child, dom));
    }
    // 如果有元素节点上有属性就渲染属性节点
    if(vnode.attrs) {
        Object.keys(vnode.attrs).map((k,v) => {
            setAttribute(dom, k, v);
        })
    }
    return container.appendChild(dom);
```


#### 2.挂载属性节点

渲染vnode上面的节点的属性有以下几个类型：

1.style 我们在写react/vue的时候，直接写在节点上的style标签会被 dom.cssText = value;

2.dom本身的属性，比如src 或者其他的, 执行 dom[key] = value;

3.其他属性，比如class、data等  执行 dom.setAttribute(key, value);

4.空属性， 比如 <span test="" ></span> 执行 dom.removeAttribute(key);


```
function setAttribute(dom, key, value) {
    if(key === "style") {
        dom.cssText = value || "";
    } else {
        if(key !== 'class' && key in dom) {
            dom[key] = value;
        }
        if(value) {
            dom.setAttribute(key, value);
        } else {
            dom.removeAttribute(key);
        }
    }
}

```

总结： 完成以上两点，可以把一个dom节点基本渲染出来了
