---
layout:     post
title:      "使用github.io构建个人网站"
date:       2017-02-05
updated:     2017/02/28
tags:
    - Git
    - Github
categories:
    - Code
thumbnail:  https://cdn.worldvectorlogo.com/logos/github-icon.svg
---

某次培训的时候写的,讲述关于Git/Github/Github pages的内容，毕竟是免费就可以使用的东西还是利用下好。

# 使用github.io构建个人网站

`2016/12/09` `Git` `Github`

## 涉及内容

1. Github的使用
2. Git工具的使用

>预计培训时间 2小时

## GitHub(1)

>GitHub是一个通过[Git](https://zh.wikipedia.org/wiki/Git)进行[版本控制](https://zh.wikipedia.org/wiki/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)的软件源代码托管服务
>
>GitHub是最流行的Git存取站点。
>
>~~Github是全球知名某特殊群体交友网站~~



1. [Sign up](https://github.com/join) 
2. [Sign in](https://github.com/login)
3. Edit Profile (~~换头像~~)

>至此初步工作完成w



## Git(1)

>git是一个[分散式版本控制](https://zh.wikipedia.org/wiki/%E5%88%86%E6%95%A3%E5%BC%8F%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)软件
>
>git内核已经成熟到可以独立地用作版本控制
>
>采用了分布式版本库的作法，不需要服务器端软件，就可以運作版本控制，使得源代码的发布和交流极其方便。git的速度很快，这对于诸如Linux内核这样的大项目来说自然很重要。git最为出色的是它的合并追踪能力。

1. [Download](https://git-scm.com/)
2. Set Up
3. more things



> First-Time Git Setup

```shell
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
git config --list
```

> Getting a Git Repository

```shell
git init 
git add *.c
git add LICENSE
git commit -m "intiial project version"
git clone https://github.com/jskyzero/PictureToAscii
```

> Recording Changes to the Repository

```shell
git status
vim .gitignore
git diff
```

> Viewing the Commit History

```shell
git log
git log -p -2 
```

> Undoing Things

```shell
git checkout -- CONTRIBUTING.md
```

>  Working with Remotes

```shell
git remote -v
git fetch [remote-name]
git push origin master
git remote show origin
```

## Git(2) & Git(3)

>Branching means you diverge from the main line of development and continue to do work without messing with that main line

```shell
 git branch testing
 git checkout testing
 git merge hotfix
 git branch -d hotfixc
 git branch -v
 git push origin serverfix
```

>Many Git servers authenticate using SSH public keys. In order to provide a public key, each user in your system must generate one if they don’t already have one. This process is similar across all operating systems. 

```shell
ssh-keygen
cd ~/.ssh
```

## GitHub(2)

> After add SSH keys

Add [new repository](https://github.com/new)  named `YourName.github.io`

> structure (C example)

```shell
.
├── bin
│   └── SimpleCalculator
├── build
│   ├── calculate.o
│   ├── error.o
│   └── shellUI.o
├── include
│   ├── calculate.h
│   ├── error.h
│   └── shellUI.h
├── LICENSE
├── makefile
├── README.md
└── src
    ├── calculate.c
    ├── error.c
    ├── shellUI.c
    ├── SimpleCalculator.c
    └── study.c

```

----

Sleep Sleep Sleep...
中场休息

---


## Github.io

建立一个仓库`yourname.github.io`，添加网页代码。提交并推送。

## Reference

[Github](https://github.com/)

[Github.io](https://pages.github.com/)

[Git](https://git-scm.com/)

[W3School HTML](http://www.w3school.com.cn/tags/index.asp)

[W3School CSS](http://www.w3school.com.cn/cssref/index.asp)

[developer.mozilla](https://developer.mozilla.org/en-US/)

