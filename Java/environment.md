### JAVA 环境安装

学任何一门语言之前都是安装环境，这里就先介绍java的环境安装。

1.可以去官网下载  (http://www.oracle.com/technetwork/java/javase/downloads/index.html)

2.可以去中文网站下载  (https://www.java.com/zh_CN/)

下载好安装包之后，记好安装的文件夹 我的是 D:JAVA

然后去配置环境变量就ok了。

1.右键我的电脑 -> 属性 -> 高级系统设置 -> 高级 ->环境变量
2.在系统变量下面点开新建，我们需要新建3个环境变量

+ JAVA_HOME      ---------   D:JAVA   (根据个人设置的文件夹来配置)
+ CLASSPATH      ---------   .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;   
(这里.;是为了让你在任何目录下面都可以进行编译，后面两个就是为了执行两个jar包);
+ Path           ---------    %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

然后 可以win+r -> cmd  ->    java -version   来测试能不能成功运行了.