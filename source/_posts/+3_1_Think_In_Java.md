---
layout:     post
title:      "Thinking-in-Java"
date:       2017-09-26
tags:
    - Code
    - Java
categories:
    - Reading
thumbnail:  https://cdn.worldvectorlogo.com/logos/java-1.svg
---

本文将总结Thinking-in-Java一书的内容，本书对于Java初学者，就比如我来说还是非常友好的。


## 前言
我看的电子版的前言如下
```
Thinking in Java (Java 编程思想)
本书来自网络,http://quanke.name 整理成电子书,支持PDF,ePub,Mobi格式,方便大家下载阅读。
阅读地址:https://java.quanke.name
下载地址:https://www.gitbook.com/book/quanke/think-in-java/
github地址:https://github.com/quanke/think-in-java
编辑:http://quanke.name
第13章没有编辑,觉得没有意义,Java的GUI先在应用少,有时间在编辑好。。。
编辑整理辛苦,还望大神们点一下star ,抚平我虚荣的心
Copyright © quanke.name 2016 all right reserved,powered by Gitbook该文件修订时间:
2016-08-23 16:39:29
```

## 对象入门
+ 大多数程序员的首要任务是用现有的对象解决自己的问题，事实上，只有相当少的“专家”能设计出让别人享用的对象。
+ 解决问题的复杂程度直接取决于抽象的种类及质量
  + 许多“命令式”语言(如FORTRAN,BASIC和C)是对汇编语言的一种抽象。
  + 一些早期语言来说,如LISP和APL,它们的做法是“从不同的角度观察世界”——“所有问题都归纳为列表”或“所有问题都归纳为算法”。PROLOG则将所有问题都归纳为决策链。
  + 面向对象的程序设计在此基础上则跨出了一大步,程序员可利用一些工具表达问题空间内的元素。
+ 从技术角度说,OOP(面向对象程序设计)只是涉及抽象的数据类型、继承以及多形性。
+ 单根结构中的所有对象都有一个通用接口,所以它们最终都属于相同的类型。单根结构中的所有对象(比如所有Java对象)都可以保证拥有一些特定的功能。利用单根结构,我们可以更方便地实现一个垃圾收集器。与此有关的必要支持可安装于基础类中,而垃圾收集器可将适当的消息发给系统内的任何对象。

<!--more-->

## 一切都是对象

## 待补充