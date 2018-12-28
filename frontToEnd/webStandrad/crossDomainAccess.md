### 跨域的解决方案

首先我们得知道为什么会出现跨域问题？根本原因在于浏览器的同源策略。

#### 浏览器的同源策略
同源策略是指当 协议 ，端口号 ，域名都相同下的页面，则两个页面具有相同的源。同源策略限制一个源加载的文档或脚本跟来自另一个源的交互。浏览器的同源策略，出于防范站脚本的攻击，禁止客户端脚本(如javascript)对不同域的服务进行跨站调用。

#### 跨域的解决方案

##### 1.图片跨域或者SCRIPT标签跨域
图片ping常用于跟踪用户点击页面或动态广告曝光次数。
script标签跨域是利用了script标签在不同源的情况下也可以执行

缺点是: 只能发送GET请求，单向的请求。

##### 2.JSONP跨域
​ JSONP（JSON with Padding）是数据格式JSON的一种“使用模式”，可以让网页从别的网域获取数据。jsonp是通过script标签开放的原则(script标签以及其里面的内容最后都可以被js引擎解析成字符流，所以script标签是开放的，就是在任何情况下都可以执行)，通过地址中可变字符串的方式来抓取数据。

```
https://www.douyu.com/ZSMJ?name=123&age=callback

这里就是通过age这个可变的参数来抓取数据，

```
缺点是:
+ 只能使用get请求
+ 不能注册success,error等事件监听函数，不能很容易的确定jsonp请求是否失败
+ jsonp是从其他域中加载代码执行,容易形成跨站请求伪造的攻击，其安全性无法确保


##### 3. CORS方式
​ Cross-Origin Resource Sharing（CORS）跨域资源共享是一份浏览器技术的规范，提供了 Web 服务从不同域传来沙盒脚本的方法，以避开浏览器的同源策略，确保安全的跨域数据传输。现代浏览器使用CORS在API容器如XMLHttpRequest来减少HTTP请求的风险来源。与 JSONP 不同，CORS 除了 GET 要求方法以外也支持其他的 HTTP 要求。服务器一般需要增加如下响应头的一种或几种：

```
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: POST, GET, OPTIONS
    Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
    Access-Control-Max-Age: 86400
```
跨域请求默认不会携带Cookie信息，如果有需要，就需要配置以下参数:
```
    "Access-Control-Allow-Credentials": true
    // Ajax设置
    "withCredentials": true
```

因为同源策略是浏览器才有的，所以只要后台放开请求，就可以通过更改请求头的方式来做到跨域.

##### 4.window.name + iframe
通过iframe标签的跨域能力以及window.name在文档刷新后依旧存在的能力(且最大允许2M左右)

```
<!--
 下述用端口
 10000表示：domainA
 10001表示：domainB
-->

<!-- localhost:10000 -->
<script>
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none'; // 隐藏

  var state = 0; // 防止页面无限刷新
  iframe.onload = function() {
      if(state === 1) {
          console.log(JSON.parse(iframe.contentWindow.name));
          // 清除创建的iframe
          iframe.contentWindow.document.write('');
          iframe.contentWindow.close();
          document.body.removeChild(iframe);
      } else if(state === 0) {
          state = 1;
          // 加载完成，指向当前域，防止错误(proxy.html为空白页面)
          // Blocked a frame with origin "http://localhost:10000" from accessing a cross-origin frame.
          iframe.contentWindow.location = 'http://localhost:10000/proxy.html';
      }
  };

  iframe.src = 'http://localhost:10001';
  document.body.appendChild(iframe);
</script>

<!-- localhost:10001 -->
<!DOCTYPE html>
...
<script>
  window.name = JSON.stringify({a: 1, b: 2});
</script>
</html>

```

##### 注意:
1.直接嵌入其他域（localhots:10001）下的URL会报错，所以需要加载完成替换为当前域的URL(localhots:10000)，proxy.html为空白页面，只为解决该问题；
2.重新设置src（http://localhost:10000/proxy.html）后导致页面不断刷新，所以通过state来控制；
3.全部获取完结果后，清除该iframe。

##### 5. window.postMessage()
​ HTML5新特性，可以用来向其他所有的 window 对象发送消息。需要注意的是我们必须要保证所有的脚本执行完才发送 MessageEvent，如果在函数执行的过程中调用了它，就会让后面的函数超时无法执行。


##### 6. 修改document.domain跨子域
前提条件：这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致，否则无法利用document.domain进行跨域，所以只能跨子域
在根域范围内，允许把domain属性的值设置为它的上一级域。例如，在”aaa.xxx.com”域内，可以把domain设置为 “xxx.com” 但不能设置为 “xxx.org” 或者”com”。
```
现在存在两个域名aaa.xxx.com和bbb.xxx.com。在aaa下嵌入bbb的页面，由于其document.name不一致，无法在aaa下操作bbb的js。可以在aaa和bbb下通过js将document.name = 'xxx.com';设置一致，来达到互相访问的作用。
```

##### 7. WebSocket
这种就不用说了，懂的不说也知道，不懂的人可以去看下websocket。这里如果要访问的服务器支持其他协议也可以进行通信


##### 8.服务端代理
同源策略是针对浏览器端进行的限制，可以通过服务器端来解决该问题

```
DomainA客户端（浏览器） ==> DomainA服务器 ==> DomainB服务器 ==> DomainA客户端（浏览器）
```



> 详细内容请查看 [http://blog.csdn.net/ligang2585116/article/details/73072868](http://blog.csdn.net/ligang2585116/article/details/73072868)