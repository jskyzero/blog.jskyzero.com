---
layout: post
title: "工具速览：gitmoji让你的提交日志更可读"
header-img: "img/site/bg3.jpg"
tags:
    - Git
    - Tools
---

gitmoji给你的git提交信息提供了一个分类和装饰的作用，本文将整理一些平时会经常使用的表情。

<!--more-->

# gitmoji 让你的提交日志更可读
`jskyzero` `2020/08/01`

## 为什么要使用gitmoji

首先，git commit信息如果没有专门的约束和规范的话，很容易写上一些毫无意义的内容，最后就不方便管理，gitmoji提供了一种实用的分类方式，大多数你的修改都可以落到已有的修改类型上。

其次，大部分情况，git message都是纯粹的文本，直观上需要理解文本内容才能明白提交的修改内容，而使用gitmoji则可以直观的从图标上理解，嘛，能简化理解本身就是一件好事。

## 如何使用gitmoji

很简单，在提交的时候在开头（为什么是开头，其实在任何不影响解析的地方理论上都是可以的，不过考虑到人类的阅读习惯，在开口放上重要的信息似乎没什么不对。）加上特定的字符串就好啦。

如果你使用一些命令行的工具查看提交日志，一般还是以字符形式展现的，但是如果你是使用一些支持字符表情的方式，就可以看到你的gitmoji被翻译成了形象具体的图标。

就咱的跨平台使用来讲，被翻译成不同的图标是常有的事情，不过还是图案的含义还是没有改变的。

## 常用的moji

+ 项目流程
    + 初始化，`:tada:`，`Initial commit.`
    + 发版本，`:bookmark:`，`Releasing / Version tags.`
    + 升级依赖，`:arrow_up:`，`Upgrading dependencies.`
+ 日常开发
    + 施工中，`:construction:`，`Work in progress.`
    + 新特性，`:sparkles:`，`Introducing new features.`
    + 写文档，`:pencil:`，`Writing docs.`
    + 修bug，`:bug:`，`Fixing a bug.`
    + 删文件，`:fire:`，`Removing code or files.`
    + 写垃圾，`:poop:`，`Writing bad code that needs to be improved.`
    + 符合规则，`:ok_hand:`，`Updating code due to code review changes.`
    + 更新资源，`:bento:`，`Adding or updating assets.`
+ 让项目变得更好
    + 艺术，`:art:`，`Improving structure / format of the code.`
    + 提速，`:zap:`，`Improving performance.`
    + 写注释，`:bulb:`，`Documenting source code.`
    + 陶醉，`:beers:`，`Writing code drunkenly.`

## 陶醉 / :beers:

希望这些有趣的小东西可以让你更加喜欢上编程w

## Reference

+ [gitmoji](https://gitmoji.carloscuesta.me/)
+ [github gitmoji](https://github.com/carloscuesta/gitmoji/)