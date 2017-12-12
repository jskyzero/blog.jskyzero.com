---
layout:     post
title:      操作系统概念
date:       2017/06/29
tags:
    - "Operation System"
    - Todo
categories:
    - Reading
---

本文将概述某学校的操作系统课程的相关内容，所涉及的到的知识为授课时最基本的一部分，可以用来概览知识和复习要点，如果有纰漏之处还请多多指正。

# 操作系统概念

> 请知悉：本文对应为教材：
> 书名:操作系统概念(第七版 影印版)
> 出版社：高等教育出版社
> 出版日期：2007-03-01
> ISBN：9787040209280

## 序言部分

课程前置学科：
1. 计算机组成原理
2. 数据结构与算法
3. 程序设计

## Introduction

操作系统：电脑用户和计算机硬件的充当中介的一个程序。其目的是方便用户高效的执行程序。

抽象的计算机系统组成
1. 硬件部分：CPU 与 内存 与 I/O 设备
2. 操作系统：控制和协调用户的应用程序对硬件的使用
3. 系统和应用程序：规定了（资源的）的使用方式
4. 用户：人或者系统。

操作系统的某个定义：从开机就一直在运行的一个程序（内核）

开机运行BIOS，硬件自检，初始化硬件地址

主机通过总线连接其他设备，通过驱动程序固定的接口使用这些设备（地址，控制器，缓存 = 数据，状态，指令）

并发：同一时间还是只有一个核在运行（可以有并行）
并行：可以有多个核多个程序同时运行

> 以下计算机基本知识部分可以参考软件工程导论相关。

冯·诺伊曼结构
![冯·诺伊曼结构的设计概念。](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Von_Neumann_architecture.svg/280px-Von_Neumann_architecture.svg.png)

CPU：
ALU + PC/IR + registers
执行指令循环，周而复始。
指令=操作码 + 操作数，机器特异

计算器是中断驱动的。
中断{软件,硬件}，判断是否进入中断处理程序，中断向量，保存现场，转移控制权。

设备表，请求队列。
IO基本模式：
1. 同步IO
2. 异步IO，中断
3. 异步IO，DMA，直接内存访问
4. 通道，启动后由PPU负责

储存器结构：
高速缓存至关重要，优化。

操作系统结构：
多道程序同时运行系统
分时系统
任务规划系统
虚拟内存/物理内存

双道模式操作
实模式/保护模式
核心模式/用户模式
特权指令
定时器，定期将控制权交还给操作系统
操作系统的功能

## OS Structions
> 本节内容：操作系统提供的服务/操作系统的多种结构/解释操作系统是怎么安装和自定义化的

操作系统提供的服务：
1. 用户接口
2. 程序执行
3. I/O操作
4. 文件系统
5. 进程沟通
6. 错误检测
7. 资源分配
8. 记账
9. 保护和安全

用户系统接口：
1. 操作元接口（CLI/GUI）
2. 程序远接口（系统调用）

Shell: 命令解释器（内建函数 + 可执行文件）

系统调用：对于高级语言，允许直接使用系统调用。

涉及到资源分配/设备访问/IO/特权指令一般都是需要系统调用。

系统调用好处：1.可以执行特权指令 2.屏蔽硬件信息

通过陷入进入中断，然后执行指定的指令序列。（传递 调用功能号/其他参数）

操作系统程序/操作系统设计和实现
操作系统结构：MS-DOS/UNIX，微内核/包
虚拟机：模拟硬件接口
操作系统生成和启动

## Process Management
> 进程是程序的一次执行过程

### 进程

内存中的进程包括：代码段，数据段，堆，运行栈
进程的状态包括：加载态，准备态，等待态，运行态，截止态。

PCB（进程控制块）：状态，编号，PC，寄存器值，设备列表。

进程调度：任务队列，短期策略，长期策略，上下文切换。

进程通信：共享内存模型/信息传递模型

### 线程

由于进程切换上下文还是需要一定时间的，于是就有了线程。

线程又被分为用户线程和系统线程，中间有个对应关系，系统线程的话系统就可以调度，用户线程的话，就只能靠写程序的人自觉来管理了。

一般操作系统的都提供的有线程库，使用的时候去查询对应的接口就好了

### CPU调度
一般来说我们希望进程尽可能的切换频繁一点，来达到对外设资源占用的最大化，不过考虑到进程的上下文切换也是要时间的。。

CPU的调度有长中短三种，短期调度就是从就绪队列中选一个来执行，如果进程只能在进入终止或者等待的时候才能调度，那么就是协同调度，如果在切换就绪的时候也允许调度，那就是抢占调度，CPU通过分配器（Dispatcher）来切换上下文等进行进程调度。

我们先看一下对于调度的评价的方式，周转时间是指运行时间+等待时间，等待时间，就是字面上的意思，响应时间是两次执行的时间间隔。

调度算法有FCFS，SJF，PS，RR，具体的细节就不再赘述，实际上的调度队列是多级队列多中调度方法结合起来的。

### 进程同步
当两个进程同时访问一个关键性数据段，由于中断的不确定性，很可能造成意想不到的问题，必须通过一些手段来放置。

可以在程序层面通过编程解决这个问题，不过一般操作系统还是会提供响应的wait，signal接口，由操作系统来保证操作的原子性，一般这俩函数传递的值叫信号量，可以是计数型或者双值型，在具体的实现层面上可以采用自旋锁的形式。

有一些经典问题，比如生产者消费者问题，读者写者，哲学家用餐问题等等，通过给的接口都可以巧妙的解决。

### 死锁
细心的读者可能会想到，由于wait的限制，很有可能有线程永远也没办法执行，我们称这种情况为死锁。

死锁的必要条件是互斥/占有并等待/非抢占调度/环路，我们可以通过资源分配图来判断死锁，死锁的预防只要是的上面任一条件不成立就可以了，在避免死锁上，系统可以采用银行家算法保证至少一个进程可以被完成，这样资源就会被返还，不过实际上对于一个进程占用的资源估计并不是那么容易。

## Memory Management

###  前置知识
关于指令和数据的地址：
1. 绝对位置，加载快/可能造成冲突
2. 重定位，静态：装入时候决定，依然写死。动态：执行时，需要硬件支持（MMU）

关于链接：
1. 静态链接
2. 动态链接，装入时：根据表填入，运行时：使用指令装入

动态加载技术，根据是否使用决定是否加载。

连续内存分配
1. 固定分区：限制了进程数目，内存大小限死，内碎片
2. 不固定分区：利用率，碎片回收=》内存紧缩

分页，页表。逻辑地址被分为页号+页偏移，通过页表将内存离散化，外碎片基本被消灭，内碎片可以忽略，但是代码共享需要逻辑地址统一，不支持动态链接，使用cache缓存加速

分段，段表，每一段都从零开始，短号+段内偏移，好处：接近用户观点容易理解，支持动态链接，但是最好段号一样。缺点：外碎片

段页式，对每个段再上个页表离散，缺点：需要三次内存访问才能拿到数据。

### 虚拟内存

依据时间/空间局部性原则。

在页表上增加一位判断是否有效，若无效则进入中断，去外存拿，然后重新执行指令。一条语句可能造成多次中断。性能正比与在主存的比率，使得CopyOnRight成为可能，加快了进程创建速度。

拿回来可能是内存是满的，于是需要替换算法。假定指导调用次序，最优页替换绝对是最好的，FIFO可能会出现物理页越多，效率越低的情况。LRU是替换最近最少使用的页，可以通过时间计数器/双向列表栈来实现，同时可以增加一位判断是否修改有必要写回。还有一些比如两次机会算法，两次都没用就干掉，还有LFU是干掉被访问次数最少/MFU干掉刚被使用的count最小的。

对于每个进程分配多少内存有动态/固定之分，固定又分为等额/比例分配，动态分配则和具体的淘汰算法有关。

## File System

因为现在已经是考完试了，内容也不太想说的太细，大概就是文件系铺路的构建，索引/文件的格式一类的东西，Linux的Inode，Windows的fat表，其他的就算了。

顺带操作系统也就算了学完了，自己的NASM还没学完，这就很尴尬了。




