---
layout: post
title: "工具速览：使用Hexo搭建个人博客"
tags:
    - Tutorial
    - Hexo
---
这篇博文将总结这个博客是怎样构建的，认真看完以后当然可以建立出和目前您看到的博客类似或者更好的站点，本文将假定您有一定的编程基础，如果您是初次接触编程，可能需要认真阅读文中给出的参考资料。

<!--more-->

# 使用Hexo搭建个人博客

> 致谢：感谢Mesekovic，AT，和 [hexo-theme-material](https://github.com/viosey/hexo-theme-material) 主题的开发者们。
> 
> 言语所无法传达到的感情，希望总有一天能被知悉。

## 初始化博客

当出了问题，错误，卡住的时候，您可以在Google上搜索报错信息或者您需要完成的目的，很多错误都有前人犯过，有些错误也需要自己经历一次才能成长。

### 安装前置软件
请确保您拥有以下几样东西
1. 计算机的管理员权限
2. 一个shell程序
3. 一个文本编辑程序

所做的事和您所使用的系统无关，您可以选择 `Microsoft Windows 10` `Ubuntu 16.04 LTS` `mac OS sierra` 等任何您喜欢的系统，或许某些时候受限于需要使用的软件存在的平台，但是尽可能把事情纯粹化专注化是没有错的，以shell为例，在`Microsoft Windows 10`您可以使用 PowerShell，类Unix系统可以使用Ternimal。 

我们所要学习的核心是 [hexo](https://hexo.io/), `hexo`是一个`快速、简介且高效的博客框架`，您可以参考[hexo的文档](https://hexo.io/zh-cn/docs/)来完成整个初始化博客部分的内容，不过可能具有一些基本Web课程的知识可能会比较好，例如HTML、CSS、JavaScript、Nodejs的使用。

要安装hexo我们首先需要安装nodejs，利用nodejs的npm包管理来安装hexo，（官方文档上还要求安装Git，这个后面会用到所以也一并装了比较好，具体的安装方法可以先去到对应的官方网站，找到文档部分阅读文档或者教程安装。）

在完成了前置工作以后就可以用如下指令安装hexo

```shell
npm install -g hexo-cli
```

### 简单的开始

安装完hexo以后我们可以先从一个简单的示例（HelloWorld）入手，接触任何一个复杂的新技术时最好都从一个简单的例子开始，逐步理解，明白这个技术所解决的问题，以及背后的大概的工作原理，这样可能对掌握如何更好的使用这门技术有帮助，毕竟写程序很大程度上来讲都是一个举一反三的过程。

```shell
hexo init <floder>
cd <floder>
npm install
```
这样就初始化了一个简单的示例，您可以在hexo的文档中看到更多关于这个示例的信息，比如文件结构和一些配置信息，这对接下来要做的事情很有帮助，有些时候偷懒总是要付出代价的，所以还是浏览一遍hexo的文档明白一个大概比较好，这样能保证您接下来能够进行的更加顺利。

使用如下指令可以将该博客挂在localhost:4000上，打开浏览器输入对应ip:port就可以预览博客的效果。

```shell
hexo server
```

您可以在官方文档上找到该指令对应的简化版本。

## 安装博客主题

> 再次感谢 [hexo-theme-material](https://github.com/viosey/hexo-theme-material#quick-start-%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B) 的开发人员的工作

我们所要使用的主题名字是material，您可以浏览[它的官方站点](https://material.viosey.com/)中的文档部分，完成接下来的几乎全部问题。

我们还是大概的走一遍流程。

```shell
# 安装到根目录下的 node_modules 里面
npm install hexo-material
# 将其挪到 themes 目录下
mv node_modules/hexo-material  themes/
```

然后更改根目录下的`_config.yml`文件，将默认主题修改为 `hexo-material` 就可以了。

我们可以再次本机挂起一次观察情况。

## 自定义化

我们将要完成两个部分的自定义化，一个是根目录下的`_config.yml`文件，一个是`hexo-material`目录下的`_config.yml`文件，两者都有官方中文文档可以参考，特别是`hexo-material`的文档简直好用，对着文档慢慢设置每个的值吧。

如果对这些自定义化还是不满，您可以直接修改主题的源样式表或者自己写自己的主题，当然这需要您对整个博客体系有一定了解，有些具体部件都要自己动手。

## 后记

如果您认真的完成到这里，那么更新博客文章等内容是完全不需要赘言的，至于如何让其他人看见自己的博客，我们可以使用免费的`Github Pages`，使用hexo的部署可以一键发布。

不过还是需要事先提醒注意文件大小，比如使用的图片啊等等，要不然不仅仅是推送到服务器上需要的时间长，用户浏览所载入页面所需要的时间也会变长。

最后可以参考[一个前人的博文](https://linghucong.js.org/2016/04/15/2016-04-15-hexo-github-pages-blog/)，您可以在这上面找到更多关于Hexo + Github Pages的信息，从内容上来讲也比本文更加详实，祝顺利。

---

嘛，新的开始w