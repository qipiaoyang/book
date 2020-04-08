#### 数据库以及数据表的创建，删除，选择

#####1.创建数据库

```
CREATE DATABASE <数据库名>;
```

#####2.删除数据库

```
DROP DATABASE <数据库名>;
```

#####3.选择数据库

```
USE <数据库名>;
```

#####4.创建数据表

创建数据表之前一定要先选定数据库

```
USE <数据库名>;
CREATE TABLE IF NOT EXISTS <数据表名> (<字段名> <字段属性>,<字段名> <字段属性>) <数据表的属性>;
CREATE TABLE IF NOT EXISTS test (`name` VACHAR(100) NOT NULL, `age` INT AUTO_INCREMENT)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#####5.删除数据表

```
DROP TABLE <数据表名>;
```

##### 6.添加表字段

```
ALTER TABLE mingzi ADD COLUMN id1 INT AFTER name;
```

##### 7.删除表字段

```
ALTER TABLE mingzi DROP id1;
```

##### 8.修改表字段

```
ALTER TABLE mingzi CHANGE id1 id2 INT NOT NULL DEFAULT 100;
ALTER TABLE mingzi CHANGE id2 id1 INT NULL DEFAULT 100;
```

##### 9.修改表名

```
ALTER TABLE mingzi RENAME TO mingzi1;
```

##### 10.数据表清空，并且让id从0开始

```
truncate table tableName;
```