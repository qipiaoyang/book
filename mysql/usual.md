### 常用的MYSQL语句

#### 插入数据

```
INSERT INTO <TABLE_NAME> (field1, field2) VALUES (value1, value2);

INSERT INTO mingzi (name, age, sex) VALUES ('qipiaoyang', 18, 'nan');
```

#### 插入多条数据

```
INSERT INTO table_name  (field1, field2,...fieldN)  VALUES  (valueA1,valueA2,...valueAN),(valueB1,valueB2,...valueBN),(valueC1,valueC2,...valueCN)......;
```

#### 查询数据

```
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]

SELECT name FROM strong WHERE age>=18 AND name='zxc' LIMIT 10 OFFSET 2;
```

- 查询语句中你可以使用一个或者多个表，表之间用逗号<,>分割。并使用where语句来设定查询条件。
- SELECT命令可以读取一条或者多条记录
- 可以是使用*来代替其他字段，SELECT语句会返回表的所有字段数据。
- 可以使用where来包含任何条件。
- 可以用LIMIT来约束返回的记录数
- 你可以使用OFFSET来指定SELECT语句开始查询数据偏移量。默认为0;

#### UPDATE 查询

```
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]

UPDATE mingzi SET sex='nan' WHERE sex IS NULL; // 这里判断字段是不是为空不能使用sex=null,而是 sex IS NULL;
```

- 可以同时更新一个或多个字段
- 可以在where字句中指定任何条件
- 可以在一个单独表中同时更新数据

#### DELETE 语句

```
DELETE FROM table_name [WHERE Clause];

DELETE FROM mingzi WHERE name='qipiaoyang';
```

- 如果没有指定where子句，MYSQL表中所有的所有记录将被删除。
- 你可以在WHERE子句中指定任何条件。
- 你可以在单个表中一次性删除记录。


#### LIKE 子句

```
SELECT field1, field2,...fieldN 
FROM table_name
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue';

SELECT * FROM strong WHERE name LIKE '%zxc%' AND age>=20;
```

- 你可以在WHERE字句中指定任何条件。
- 你可以在WHERE字句中使用LIKE字句。
- 你可以使用LIKE字句代替等号=。
- LIKE通常与%一同使用,类似于一个元字符的搜索。
- 你可以使用AND或OR指定一个或多个条件。
- 你可以在DELETE或UPDATE命令中使用WHERE...LIKE字句来指定条件。

#### UNION 联合查询字符

```
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT] //默认为DISTINCT,默认已经删除了重复的数据，ALL返回两个结果的并集
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];

SELECT name FROM strong WHERE name LIKE '%zxc%' AND age>=20
UNION ALL
SELECT name FROM strong WHERE age>20;
+------+
| name |
+------+
| zxc2 |
| 111  |
| zxc2 |
+------+
```

#### MYSQL ORDER 排序

```
SELECT field1, field2,...fieldN table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]

// DESC是降序排列,ASC是升序排列
mysql> SELECT * FROM strong WHERE age>=20 ORDER BY age ASC;
+------+-----+-----+
| name | age | sex |
+------+-----+-----+
| 111  |  21 | nan |
| zxc2 |  28 | nan |
+------+-----+-----+
2 rows in set
```

- 你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
- 你可以设定多个字段来排序。
- 你可以使用ASC/DESC关键字来设置查询结果是按升序还是降序排列，默认情况是升序排列。
- 你可以添加WHERE.....LIKE语句来设置条件


#### GROUP BY 语句

```
SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;

// AS zhonglei 相当于取个别名
mysql> SELECT name,COUNT(*) AS zhonglei FROM employee_tbl GROUP BY name ORDER BY COUNT(*) ASC;
+------+----------+
| name | zhonglei |
+------+----------+
| 小丽 |        1 |
| 小王 |        2 |
| 小明 |        3 |
+------+----------+
3 rows in set

```

使用 WITH ROLLUP

WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计(SUM,AVG,COUNT...)。其中记录NULL表示最后的统计的结果。

```
SELECT name,COUNT(*) AS zhonglei FROM employee_tbl GROUP BY name WITH ROLLUP;
```

我们可以使用coalesce(a,b,c),参数说明，如果a=null，则为b，如果b=null，则为c。如果都为null，则为null(无意义)。

```
mysql> SELECT coalesce(name,'总数'),COUNT(*) AS zhonglei FROM employee_tbl GROUP BY name WITH ROLLUP;
+-----------------------+----------+
| coalesce(name,'总数') | zhonglei |
+-----------------------+----------+
| 小丽                  |        1 |
| 小明                  |        3 |
| 小王                  |        2 |
| 总数                  |        6 |
+-----------------------+----------+
4 rows in set
```

#### MYSQL 正则表达式

```
mysql> SELECT * FROM strong WHERE name REGEXP '^z';
+------+-----+-----+
| name | age | sex |
+------+-----+-----+
| zxc1 |   8 | nv  |
| zxc2 |  28 | nan |
+------+-----+-----+
2 rows in set
```