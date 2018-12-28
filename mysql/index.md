### MYSQL的个人总结

##### mysql的下载安装
直接点击链接下载就好了，然后安装。一直next，注意勾选上path。

[window 64位下载链接](https://dev.mysql.com/get/Downloads/MySQL-5.5/mysql-5.5.60-winx64.msi)

[window 32位点击下载链接](https://dev.mysql.com/get/Downloads/MySQL-5.5/mysql-5.5.60-win32.msi)

安装完之后，找到安装目录里面的 my.ini ,修改里面的一些配置文件

```
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=C:\wamp-all\mysql-5.7.13
# 设置mysql数据库的数据的存放目录
datadir=C:\wamp-all\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

然后以管理员启动命令行工具，输入下面的命令，就可以启动了
```
mysql -uroot -p(password)      
```


