---
layout: post
title: "wireshark使用说明"
date: 2017/10/10
tags:
    - Code
    - Computer Network
    - Tools
categories:
    - Code
thumbnail: "https://cdn.worldvectorlogo.com/logos/wireshark.svg"
---

Wireshark是世界上最广泛使用的网络协议分析器。(Wireshark is the world’s foremost and widely-used network protocol analyzer. )

## 安装

请在[这里](https://www.wireshark.org/#download)找windows和macOS的，至于linux的话，我是直接`apt-get install wireshark`就可以。

## 使用方法

这种带界面的理论上来说没啥好说的使用方法，要注意在开始界面需要选择一个设备（？或者是网络适配器一类的东西）才能进入监听状态。

然后可以自己编写表达式筛选自己需要的数据，如果筛选做得不好的话，捕捉到需要的数据包以后就早点停止。

可以具体看到原始的数据，以及处理后的可见部分，实际上还是相当好用的，不过如果只是上层的HTTP的话，在浏览器里面分析其实也不错。

## 示例

假装这里有一些贴图。

后来想了想还是放点图，是在做[这个练习](https://web.sonoma.edu/users/f/farahman/sonoma/courses/es465/lab/mod_Wireshark_HTTP.pdf)的截图，这个练习也可以拿来练手和熟悉HTTP。

![界面贴图](/img/markdown/wireshark8.png)

我们是可以看到原始的数据的。

![界面贴图](/img/markdown/wireshark9.png)

## 参考

[wireshark.org](https://www.wireshark.org/)

[ask.wireshark](https://ask.wireshark.org/)