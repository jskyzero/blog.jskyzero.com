---
layout: post
title: "Linux shadowsocks/服务器配置"
date: 2017/03/03
tags:
    - Code
    - Linux
categories:
    - Code
thumbnail: "https://blogs-images.forbes.com/janakirammsv/files/2016/01/1711471.jpg"
---

本文将讲述一个一般型的云服务服务器的部署，以Ubuntu 16.04下配置shadowsocks server 和 nodejs server 为示例。

<!--more-->

# Linux服务器配置

> 沉迷了两天的巫师三，整个人都不好了，今天不小心把Win10弄炸了，于是重装了系统，又从新配置了服务器，所以干脆把过程总结下来，方便以后使用。


## 前置

在从供应商那里设置好服务器类型和地址等等成功初始化以后，首先寻找一个`console`交互窗口和`root`密码，鉴于服务商为了安全起见密码一般都分长复杂，在登录以后首要任务是使用`passwd`指令修改密码。

接下来的初步是要配置`ssh-server`，方便从本地shell连接到服务器，当然前提是要确保`apt-get`可用，有些服务器可能初始化以后就这些指令就已经可用，如果不能用就见招拆招，大部分的解决方案在网上都查得到。

那么这么一番折腾，我们已经已经可以在本地使用`ssh root@[IP addresss]`来连接到服务器了，输入密码成功的第一个指令往往是`bash`，（为了能有补全233）接下来我们就可以安装一系列的常用软件，比如：
```
apt-get update
apt-get upgrade
apt-get install python
apt-get install python-pip
apt-get install nodejs
```

接下来可以修改`~/.bashrc`文件稍微自定义点东西，比如提示符`PS1="\[\033[01;36m\]\w\[\033[00m\]\$ "`之类的，然后用`useradd [UserName]`建个新用户，`passwd [UserName]`设置密码，再去修改下`/etc/passwd`改下默认登录路径，要注意如果是以管理员账户建立的文件夹，新用户搞不好是没有权限改的，用`sudo chown -R username:group directory`指令修改下所属权就好了。

## 配置shadowsocks

1. 首先我们要安装shadowsocks的服务端：`pip install shadowsocks`
2. 然后建立一个配置文件，路径不是太重要，比如 `touch /etc/shadowsocks.json`
3. 接下来就按要求老老实实填配置就好了，具体每个是对应什么的从名字上就可以看出来。
```
{
     "server": "my_server_ip", 
    "server_port": 8388, 
    "local_address": "127.0.0.1",
    "local_port": 1080, 
    "password": "mypassword",
    "timeout": 300,
    "method": "aes-256-cfb",
}
```
4. 先简单测试下能不能用：`ssserver -c /etc/shadowsocks.json`
5. 将开机自启指令加入`/etc/rc.local`
```
vi /etc/rc.local

// insert content
nohub ssserver -c /etc/shadowsocks.json 2> /tmp/shadowsocks.log 1> /dev/null & 
```

## 其他配置

比如`nodejs`，`python`什么的，实际上方法和本地都是一样的，这里只提醒一下python注意使用虚拟环境。

就不具体举例了。大致流程就是`git clone https://github.com/username/code.git`以后安装依赖项目，然后后台运行就OK了

## 后记

现在比较担心这两天落下来的进度，嗨呀垃圾游戏毁我青春（误）