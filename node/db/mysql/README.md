# MySQL 命令行操作

## 查看服务器mysql服务有没有开启:
```ps -ef | grep mysql```

## 登录到MySQL:
### mysql -h 主机名 -u 用户名 -p
#### -h : 该命令用于指定客户端所要登录的MySQL主机名, 登录当前机器该参数可以省略;
#### -u : 所要登录的用户名;
#### -p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

```mysql -u root -p```

## 一 查看数据库、表、数据字段、数据

### 查看当前所有的数据库:
```show  databases;```
### 选择（进入） 数据库:
```use   数据库名;```
### 查看当前数据库所有的表:
```show tables;```
### 查看 某个表的字段结构 :
```desc  表名;```
### 查询表数据:
```select * from  表名;```

## 二  新建数据库、数据表（表）、数据（添加数据）

### 新建数据库:
```create database  数据库名;```
### 新建表:
```
create table 表名 (
    字段名字   数据类型  修饰,
    ...
);
```

### 添加数据:
```insert into 表名 valuse（值，值）;```
## 三  修改数据表，修改数据
### 修改数据表:
```alter table 表名 add 字段名 类型 修饰【加的列在表的最后面】```
```alter table 表名 add 字段名  类型 修饰 after 某列【把新列加在某列后面】```

### 修改数据:
```update user set name=新值 where```

## 四 删除数据库，数据表，数据
### 删除数据库:
```drop database 数据库名;```
### 删除数据表:
```drop  table  表名;```
### 删除列:
```alter table 表名 drop 列名称;```
### 删除数据:
```delete  from  表名 where;```
## MySQL有三大类数据类型
分别为数字、日期\时间、字符串。这三大类中又更细致的划分了许多子类型:

### 整数: tinyint、smallint、mediumint、int、bigint
### 浮点数: float、double、real、decimal
### 日期和时间: date、time、datetime、timestamp、year
### 字符串: char、varchar
### 文本: tinytext、text、mediumtext、longtext
### 二进制(可用来存储图片、音乐等): tinyblob、blob、mediumblob、longblob

## MySql环境配置
```
vim ~/.bash_profile
export PATH=$PATH:/usr/local/mysql/bin
source ~/.bash_profile
```

## 外键
```
CREATE TABLE IF NOT EXISTS `players` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `teamId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
```
```
SELECT `player`.`id`, `player`.`name`, `player`.`createdAt`, `player`.`updatedAt`, `player`.`teamId`, `team`.`id` AS `team.id`, `team`.`name` AS `team.name`, `team`.`createdAt` AS `team.createdAt`, `team`.`updatedAt` AS `team.updatedAt` FROM `players` AS `player` LEFT OUTER JOIN `teams` AS `team` ON `player`.`teamId` = `team`.`id`;
```
```
SELECT `team`.*, `players`.`id` AS `players.id`, `players`.`name` AS `players.name`, `players`.`createdAt` AS `players.createdAt`, `players`.`updatedAt` AS `players.updatedAt`, `players`.`teamId` AS `players.teamId` FROM (SELECT `team`.`id`, `team`.`name`, `team`.`createdAt`, `team`.`updatedAt` FROM `teams` AS `team` WHERE `team`.`name` = '火箭' LIMIT 1) AS `team` LEFT OUTER JOIN `players` AS `players` ON `team`.`id` = `players`.`teamId`;
```

## 数据库表连接
* 内连接（inner join）
只返回两张表匹配的记录，这叫内连接（inner join）。
* 外连接（outer join）
    1. 左连接（left join）
    返回匹配的记录，以及表 A 多余的记录，这叫左连接（left join）。
    2. 右连接 (right join）
    返回匹配的记录，以及表 B 多余的记录，这叫右连接（right join）。
    3. 全连接 (full join）
    返回匹配的记录，以及表 A 和表 B 各自的多余记录，这叫全连接（full join）。
* 交叉连接（cross join）
叉联接也称作笛卡尔积。相当于两个表中的所有行进行排列组合。
若表a有X行，表b有Y行，则将返回XY行记录。

```
SELECT * FROM A  
INNER JOIN B ON A.book_id=B.book_id;
 
SELECT * FROM A  
LEFT JOIN B ON A.book_id=B.book_id;
 
SELECT * FROM A  
RIGHT JOIN B ON A.book_id=B.book_id;
 
SELECT * FROM A  
FULL JOIN B ON A.book_id=B.book_id;
```
