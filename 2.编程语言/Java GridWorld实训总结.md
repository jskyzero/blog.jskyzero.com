---
layout:     post
title: 课程总结：GridWorld实训
header-img: "img/site/bg3.jpg"
tags:
    - Java
    - Summary
---

每次实训都可以学到大量的东西，知识出现的过于密集是否能够消化呢？嘛，本文将总结中级实训GridWorld所涉及的知识，一些有用的学习思路，希望能给以后的自己一点帮助。

<!--more-->

# Java GridWorld实训总结
`jskyzero` `2017/03/19`

## 阶段1：项目启动
>  本阶段主要是为实训项目做基本的技术准备，学会使用Vi, JAVA, Ant和Junit, 以及熟悉GridWorld的使用，并完成指定的任务。

+ Java：[Java SE 8 Specification](https://docs.oracle.com/javase/specs/jls/se8/html/index.html)，这上面基本上啥都说了，快速上手的话教程很多，这里不赘述。不管怎么样开发人员记得要装JDK而不是JRE。


+ swing：属于JFC的一个简单GUI，框架？建立在AWT上，要求写简单GUI计算器的时候用的，教程的话可以看这个[Java Swing Tutorial](http://www.javatpoint.com/java-swing),总的来说在代码里面建立页面还是不太习惯，不过还行，也能用。


+ Ant：用XML格式写的执行各种指令的工具，类比make，不过似乎看起来是难用了一些，XML就很值得吐槽，一个属性是放在前括号里还是子元素里？括号套括号不如咱们用缩进用游标卡尺好不好，当然吐槽归吐槽，很多标签都很有用，也找到了一个模板型的build.xml，很好。忘了给[教程](http://wiki.jikexueyuan.com/project/ant/)


+ Junit：就像它名字一样这是单元测试的，用的不是最新版，文档看github上的应该就好。


## 阶段2：基本任务

> 本阶段我们使用提供的GridWorld接口来实现一些要求的任务，实际运用面向对象的编程思想。

+ Bug Variations：使用Bug Class的一些接口来实现特定运行方式的Bug，比如轨迹是环形/螺旋/Z形等等的Bug


+ GridWorld Classes and Interfaces：熟悉GridWorld/Location/Grid/Actor等等的类的接口和结构关系，写一些继承Actor的有特定行为的Actor，比如跳跃（一次前进两格）方式前进的Bug


+ Interacting Objects：进一步写一些行为更加复杂的Actor子类，比如前进方式/会更具周围物体改变自身属性/可以影响周围物体的属性。


+ Grid Data Structures：我们终于开始对Grid动手了，这里考虑用内存空间与实际格子一一对应或者使用树/哈希表等等只保存有物体的格子

## 阶段3：扩展任务
> 本阶段使用之前学习到的工具型技能来进一步辅助学习各种知识


+ ImageProcessing：这次我们对PNG图片下手，这是我在正常的课程教学过程中第一次发现二进制文件处理的内容，具体的PNG格式/使用接口并不重要，重要的是对二进制文件的处理和操作的思想。


+ MazeBug：使用深度优先算法走迷宫


+ N-Puzzle：重排拼图游戏（N-数码问题），广度优先算法，通过相似匹配加速寻找。

## 个人总结

上面已经把这次实训涉及到的知识再次罗列了一次，一路训过来还是确实能学习到东西的，知识层面的也好，为人层面的也好。

这次学习了一门新语言Java，大部分时间都是在对着特定接口的文档看看看学学学，语言本身的一些接口可能还没有接触完全，总的来说就也只是入了一个门，后面要学的东西还是很多。

然后一定要安排好时间，不要沉迷网络游戏。嗯大概就是这些。