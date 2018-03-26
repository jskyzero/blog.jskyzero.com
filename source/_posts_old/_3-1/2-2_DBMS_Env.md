---
layout: post
date: 2017/03/04
title: PostgreSQL安装与使用
tags:
    - Code
    - DateBase
categories:
    - Code
thumbnail: "https://www.tutorialspoint.com/postgresql/images/postgresql.jpg"
---

考虑到数据库配套的练习是需要那么个环境，已经栽了一次还是把经历分享出来。

# PostgreSQL安装与使用

> 本文仅以macOS sierra为例，其他OS差别不大。

## 前言

最开始我是用的SQLite3的，追溯到最开始是学习SQL的时候用过python的嵌入式SQLite3，在Linux上安装简便：`sudo apt-get install sqlite3`，使用方便：`sqlite3`，无奈上课时候就发现了关于外码约束的问题，课间问了老师，老师表示嘛这种东西是数据库管理系统实现特异的，要保证完好约束性是需要一些代价的，有些就没有实现。说的一点都没错但是老师您应该制止我在SQLite3的坑上越走越远啊！

直到写这周作业才意识到这和标准SQL差的好像有那么点，远，去查了一下oh NO，这玩意儿只支持了部分的SQL标准，尴尬，某教程是这么说的
```
# From https://www.ibm.com/developerworks/cn/opensource/os-cn-sqlite/

SQLite 不支持一些标准的 SQL 功能，特别是外键约束（FOREIGN KEY constrains），嵌套 transcaction 和 RIGHT OUTER JOIN 和 FULL OUTER JOIN, 还有一些 ALTER TABLE 功能。

```

嗯所以我们还是老老实实装一个正式点的软件吧，最开始使用`bash on windows`装了MySql，嗯服务端启动不了，报错关于socket，后来又试了PostgreSQL一样的不行，然后才反应起来多半是bash的锅，所以切到Mac老老实实安装。

## 安装

先说点题外话，[PostgrSQL 的官网](https://www.postgresql.org/)是很自豪的写上了`The world's most advanced open source database.`，这个`advanced`很值得考究，暂且不管了，关于和MySQL的对比，可以查看[zhihu: PostgreSQL 与 MySQL 相比，优势何在？](https://www.zhihu.com/question/20010554)，嗯我是先选了PostgreSQL的所以主观性的查到了它的优势（实际上是装好一个根本懒得再改），使用MySQL当然也是可行的解决方案。

关于这个软件的读音，很有意思，毕竟SQL很多时候都是读成"sequel"的，据悉，`PostgreSQL开发者把它拼读为"post-gress-Q-L"。`，嗯那我们就姑且这么读。

至于安装，去到官网，点开下载，下一个对应系统的拿下来装就是了，举例来说，可以参考[PostgreSQL - Environment Setup](https://www.tutorialspoint.com/postgresql/postgresql_environment.htm)

## 使用

嗯mac的下载以后会有一个pgAdmin4，姑且理解成GUI吧，然后给了几个文档和安装后续插件的个软件，还有psql，嗯我们就要psql就好了。

运行psql后前面几个都是默认的就可以，输入密码，然后就可以happy了，建立数据库、表格、等等的都可以从官方文档和教程中找到具体步骤，这里不再赘述。

姑且说下GUI的部分，新建的表格似乎是在shemas/public/tables下。

不负责任的给出几个教程
[PostgreSQL新手入门](http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)
[PostgreSQL Tutorial](https://www.tutorialspoint.com/postgresql/index.htm)

## 关于实验

可以参考某同名仓库的代码
