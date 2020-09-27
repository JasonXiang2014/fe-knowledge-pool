//MySQL 命令行操作
查看服务器mysql服务有没有开启:
ps -ef | grep mysql

登录到MySQL:
mysql -h 主机名 -u 用户名 -p

-h : 该命令用于指定客户端所要登录的MySQL主机名, 登录当前机器该参数可以省略;
-u : 所要登录的用户名;
-p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

msql -u root -p

一 查看数据库、表、数据字段、数据

查看当前所有的数据库:
show  databases;
选择（进入） 数据库:
use   数据库名;
查看当前数据库所有的表:
show tables;
查看 某个表的字段结构 :
desc  表名;
查询表数据:
select * from  表名;

二  新建数据库、数据表（表）、数据（添加数据）

新建数据库:
create database  数据库名;
新建表:
create table 表名 (
    字段名字   数据类型  修饰,
    ...
);
添加数据:
insert into 表名 valuse（值，值）;

三  修改数据表，修改数据
修改数据表:
alter table 表名 add 字段名 类型 修饰【加的列在表的最后面】
alter table 表名 add 字段名  类型 修饰 after 某列【把新列加在某列后面】

修改数据:
update user set name=新值 where

四 删除数据库，数据表，数据

删除数据库:
drop database 数据库名;
删除数据表:
drop  table  表名;
删除列:
alter table 表名 drop 列名称;
删除数据:
delete  from  表名 where;

MySQL有三大类数据类型
分别为数字、日期\时间、字符串。这三大类中又更细致的划分了许多子类型:

整数: tinyint、smallint、mediumint、int、bigint
浮点数: float、double、real、decimal
 
日期和时间: date、time、datetime、timestamp、year

字符串: char、varchar
文本: tinytext、text、mediumtext、longtext
二进制(可用来存储图片、音乐等): tinyblob、blob、mediumblob、longblob


//MySql环境配置
vim ~/.bash_profile
export PATH=$PATH:/usr/local/mysql/bin
source ~/.bash_profile

