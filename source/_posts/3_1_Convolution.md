---
layout: post
title: "卷积"
date: 2017/10/16
tags:
    - Image
    - Digital Image Processing
categories:
    - Code
---

卷积是一种通过两个函数生成第三个函数的一种数学算子（算子就理解成一种向量空间的映射）

## 前言

本文第一版的时候出现了日期的错误，这反映了两个问题，第一是写这篇的时候可能状态不太好，第二是出现一个错误的地方会更大可能出现第二个错误，因而本文下面的内容的严谨性可能就不太好了。

感谢Mesekovic的指正。

<!--more-->

## 定义
> 以下定義取自維基百科，這個顯示符號的圖片真的是爲難我了。

卷积是分析数学中一种重要的运算。设：![f(x)](https://wikimedia.org/api/rest_v1/media/math/render/svg/202945cce41ecebb6f643f31d119c514bec7a074),![g(x)](https://wikimedia.org/api/rest_v1/media/math/render/svg/c6ca91363022bd5e4dcb17e5ef29f78b8ef00b59)是![\mathbb {R} ](https://wikimedia.org/api/rest_v1/media/math/render/svg/786849c765da7a84dbc3cce43e96aad58a5868dc)上的两个可积函数，作积分：

![\int _{-\infty }^{\infty }f(\tau )g(x-\tau )\,\mathrm {d} \tau ](https://wikimedia.org/api/rest_v1/media/math/render/svg/5cf6c1df775e00688e8523f8b44ccc4633aadd13)

可以证明，关于几乎所有的![x\in (-\infty ,\infty )](https://wikimedia.org/api/rest_v1/media/math/render/svg/d7aea9be5e96822459afc5c7d9f911a586290dc5)，上述积分是存在的。这个积分就定义了一个新函数![h(x)](https://wikimedia.org/api/rest_v1/media/math/render/svg/02c07825dae28705df03d15daeb8844d49c4dbd4)，称为函数![f](https://wikimedia.org/api/rest_v1/media/math/render/svg/132e57acb643253e7810ee9702d9581f159a1c61)与![g](https://wikimedia.org/api/rest_v1/media/math/render/svg/d3556280e66fe2c0d0140df20935a6f057381d77)的卷积，记为![h(x)=(f*g)(x)](https://wikimedia.org/api/rest_v1/media/math/render/svg/9672cfa71164ef5e28df6fdda3dcaa7408a8b5ae)。


## 意义

我想举一个很简单的例子，先从离散的情况讨论起来吧，大家都应该知道在银行存钱的事，那么现在我们假定一个人每年都会存入1万元，每年的年利息是a，那么第一年存入1万，第二年就是第一年的(1+a) + 1，第三年就是(1+a)^2 + (1+a) + 1，以此类推，我们会发现，第n年存入的钱，在第N年就是(1+a) ^ (N-n)，这个函数也就是我们上面说的g(x)，他的参数是(N-n)，这个其实是反应目前的n距离要求的点N的一个距离的量。

关于其他的辅助理解的例子还可以看这个，这个是一个[实际的计算的一个例子](https://www.zhihu.com/question/22298352/answer/34267457)，上面[关于复利的例子出自这里](https://www.zhihu.com/question/21686447/answer/50481954)

## 如何计算

这个问题是我极其极其不想讲的，大概就是分段讨论法/直接计算法等等等。

分段的话就可以画个图然后分析每一段的计算。

直接来的话就上公式，这里不再举例了，毕竟，这种数学方面的问题我也很弱。。

## 在数字图像处理里面的用法

那我们自然可以讲一小块图像当成一个线性的输入f(x)，然后来自定义这个g(x)，用求得的(f*g)(N)取代之前的f(N)，需要某些性质的时候就修改特定的g(x)，一般可能只是一个离散的系数序列，这个系数怎么排布就可以达到各种各样的滤波/强化边缘等等的效果。

具体的例子和实现这里暂时也不举例了，如果你上面看懂了的话，大概也就是对一张图片每个像素点，取他相关性比较高的连通域然后来个卷积变换，然后得到新的值，代替原来的值，一整张图片的每个像素点都来一次。

