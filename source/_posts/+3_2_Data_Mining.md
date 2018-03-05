---
layout:     post
title:      "数据挖掘"
date:       2018/03/02
tags:
    - Data Mining
categories:
    - Reading
    - Data Mining
---

老师是数学转计算机科学，机器学习/计算机视觉，医学数据分析。

## Overview
+ Prerequisite: Linear Algebra, Statistics, Data Structure, Programing.
+ Overview
  + Supervised Learning: Liner / Loigistic Regression, SVM, decition tree, ensemble methods, neural networks, overfitting.
  + Unsupervised learing: PCA, manifold learning, clustering
  + Revommendation: ...
  + Association: ...
  + Recent advanced techniques: ...
+ Reference:
  + PowerPoint: http://www.xieguotian.cn
  + Many Reference books
+ Assessment:
  + 3-4 Assignments, mid-term / final open-ended project attendance.
+ Mhy Learn Data Mining ?
  + ~~for me, now learn it is useful to find a job.~~
  + Large-scale data is every where.
  + Greate opportunities to solve society's major problem (via infomation)
  + Commercial viewpoint, many company.
  + Data Mining can provide a better sevices not only in IT field.
  + ~~help you find a job / persue advanced degree~~
+ what is data mining
  + history
    + Bayes' theorem: 1768
    + Regression: 1805
    + 1936: Terning machine
    + 1943：Neural networks
    + 1959: Machine learing
    + 1965: Evolutionary Compution
    + 1970s: Databases
    + 1975: Genetic algorithm
    + KDD: 1989
    + SVM: 1992
    + Data science teams: 2001
    + Moneyball: 2003
    + Today: Big data
    + Today: Deep Learning
    + ...
  + Definition
    + Extract useful patterns from (usually large-scale) data
    + Stored (System) / Managed (Dayabeses) / Analysis (this class)
    + Data Mining = Big data = ...
    + Not Data Mining: Search / Query
    + is Data Mining: Class, Group ...
  + Tasks
    + Predictive mathods: Regression / Classification / Recommender System
    + Descriptive methods: Clustering / Association (make it human-interpretable)
    + ...
  + Overlap with Databases(query) / Machine learning(model) / CV Theory


## Linear Regression
+ 有监督式学习：给定一些“正确”的样本。
+ 预测未知的结果：预测一些未知情况的结果。
+ Train Set -> Learning Algorithm -> Hypothesis(假设)
  + x -> h -> h(x)
  + linear: h(x) = ax + b
    + different a, b => different result => different cost 
    + cost funcion => minimize cost function
    + example: $H_{cost}(a, b) =  \frac{1} {2m}  \sum_{i = 1}^{m}(h_{a, b}(x^{i}) - y^{(i)})$
  + how to solve it
    + 采用梯度下降的方法
    + 给定初始值，同过迭代减少cost，可能会收敛到局部最小值。