### vue3的目标（vue2为啥要升级到vue3）

从鱿鱼丝公开的一些信息当中，他说了大概有以下几个原因导致重写vue。

##### 1.使用新的语言特性

使用新的语言特性，说白了核心就是es7提供了元编程（在语言层面做出修改），可以解决目前vue2存在的一些问题，比如 __data无法监测新增新属性.__ .所以vue3使用了
proxy(代理)、reflect(反射)来解决问题。但是有一个缺点，__因为proxy与reflect无法使用babel的polyfill垫片来解析，所以vue3应该是不支持IE的.__


##### 2.解决体系架构存在的问题并且解耦内部包

简单来说，vue2的代码解藕不够充分，然后导致积累来技术债。

##### 3.切换到TypeScript

引入了flow，然后类型检查减少了前端bug产生。

##### 4.设置RFC（征求修正意见）流程

简单来说就是迎合社区。

##### 5.克服虚拟DOM的瓶颈

vue2还是通过把模板编译成vnode来形成vnode tree，然后对vnode tree去对比，来 __一次性__ 更新视图。这样就会产生一些性能问题，比如有些资源是需要
依赖dom的更新再来加载的，按照目前的vue的更新策略来看，就会无限制的增加loaded时间。

解决方案：

1. 生成命令式dom，解藕dom之间的耦合性，这样子无论是复用，还是可扩展性等等都有很大的提升。（react的处理方式）
2. 优化遍历过程，vue2做了一部分（我们会在后面vue的diff算法阶段来讲解），vue3增加runtime优化。

##### 7.最小化bundle的大小

这里优化bundle主要是通过把一些功能解藕成多个包之后，就可以减少代码体积。