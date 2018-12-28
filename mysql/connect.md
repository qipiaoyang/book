### MYSQL 连接的使用

#### 1. INNER JOIN (内连接，或等值连接): 获取两个表中字段匹配关系的记录。

```
mysql> SELECT a.name,a.age,a.sex,b.name,b.age FROM mingzi a INNER JOIN strong b ON a.age=b.age;
+------+-----+-----+------+-----+
| name | age | sex | name | age |
+------+-----+-----+------+-----+
| 123  |   8 | nan | zxc1 |   8 |
| 456  |  28 | nan | zxc2 |  28 |
+------+-----+-----+------+-----+
2 rows in set
```

等价于下面这个

```
mysql> SELECT a.name,a.age,a.sex,b.name,b.age FROM mingzi a, strong b WHERE a.age=b.age;
+------+-----+-----+------+-----+
| name | age | sex | name | age |
+------+-----+-----+------+-----+
| 123  |   8 | nan | zxc1 |   8 |
| 456  |  28 | nan | zxc2 |  28 |
+------+-----+-----+------+-----+
2 rows in set
```
![INNER JOIN](../images/innerJoin.gif)

#### 2.LEFT JOIN (左连接): 获取左表所有记录，即使右表没有对应匹配的记录。

```
mysql> SELECT a.name,a.age,a.sex,b.name,b.age FROM mingzi a LEFT JOIN strong b ON a.age=b.age;
+------+-----+-----+------+-----+
| name | age | sex | name | age |
+------+-----+-----+------+-----+
| 123  |   8 | nan | zxc1 |   8 |
| 456  |  28 | nan | zxc2 |  28 |
+------+-----+-----+------+-----+
2 rows in set
```

![LEFT JOIN](../images/leftJoin.gif)

#### 3.RIGHT JOIN(右连接): 获取右表所有记录，即使左表没有对应匹配的记录。

```
mysql> SELECT a.name,a.age,a.sex,b.name,b.age FROM mingzi a RIGHT JOIN strong b ON a.age=b.age;
+------+------+------+------+-----+
| name | age  | sex  | name | age |
+------+------+------+------+-----+
| NULL | NULL | NULL | 111  |  21 |
| 123  |    8 | nan  | zxc1 |   8 |
| 456  |   28 | nan  | zxc2 |  28 |
+------+------+------+------+-----+
3 rows in set
```

![RIGHT JOIN](../images/rightJoin.gif)