---
layout:     post
title:      "解锁算法"
date:       2018-01-22
tags:
    - Code
    - Algorithm
categories:
    - Reading
---

面向大众读者的算法著作，理解计算机科学中关键算法的简明读本，帮助您开启算法之门。

<!--more-->

## 什么是算法以及为什么要关注算法

什么是算法？一个简单的回答是，算法是描述完成事情的一系列步骤，对于计算机而言，描述要足够精确，精确到可以用编程语言描述让计算机执行。

对于一个算法，我们首先需要正确性，其次是资源的尽可能高效利用，空间/时间复杂度尽可能的低，对于计算机从业人员，关注算法是必须的。在解决特定的复杂问题的时候，在利用现有资源的时候，都需要你对算法知识。

本书比较是面向大众读者的，如果您有兴趣，建议补充阅读《算法导论》，《计算机程序设计艺术》。

## 如何描述和评估计算机算法

如何描述？很自然的，可以使用计算机语言来描述，当然我们可以使用伪代码/流程图等其他形式来描述，这里，我们可以将一些广泛的操作抽象出来，就比如数组的使用/遍历的使用，还有关于程序的一些基本概念，比如函数的调用，参数，返回等等。

在描述的格式上，我们需要给出算法名称，给出输入输出，然后是执行步骤的描述。

除了对过程的描述，还需要描述算法的时间和空间占用，θ既描述上界也描述下界，Ω描述下界，Ο描述上界。

对于计算机算法而言，循环和递归是解决问题的两种强而有效的方法。

## 排序和查找算法

### 排序

+ 选择排序，选择第i个元素的值，交换。
+ 插入排序，取出第i个元素，将其插入第一个对应位置。
+ 归并排序，线性时间的合并，需要额外空间。
+ 快速排序，每次取值大小分开，继续对分开部分排序。

### 查找

+ 线性查找，线性，就是线性遍历
+ 二分查找，对有序的序列，每次折半。

## 排序算法的下届和如何超越下界

+ 计数排序，适用于元素个数有限，对每个元素种类求得个数，然后建新序列返回。
+ 基数排序，将排序关键字看成是d位数字。对相同基数的元素排序，然后组合。

## 有向无环图

+ 拓扑排序，对于没有入度的节点，输出，删除以该节点为起点的路径，对终点判断是否没有入度，加入没有入度的列表。
+ 路径有了权值

## 最短路径

+ Dijkstra算法：每次取最短。
+ Floyd-Warshall算法：局部最短一定是全局最最短。注意顺序，k-》i-》j

## 字符串算法

+ 最长公共子序列LCS：动态规划，包不包含两个夫串最后一个字符
+ [最长公共子串](http://www.cnblogs.com/zhangchaoyang/articles/2012070.html)：要求连续，矩阵斜线
+ 字符串转化
+ 字符串匹配：FA（有穷自动机）

## 密码学基础

+ 简单替代密码
+ 对称密匙加密，使用相同的密匙
+ 非对称密匙加密，使用公钥和私钥，比如RSA

## 数据压缩

+ 无损压缩
    + Huffman编码
    + 索引压缩
+ 有损压缩

## 难？问题

+ 阶乘级别的复杂度，旅行商问题，NP-Hard问题
+ P类问题，多项式-时间算法
+ NP：能在多项式实践内验证
+ NP-Hard：存在一个可以转化
+ NP-complete：NP and NP-Hard