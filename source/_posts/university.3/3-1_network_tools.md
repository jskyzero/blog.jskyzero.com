---
layout: post
title: "基于命令行的网络工具"
date: 2017/09/23
tags:
    - Code
categories:
    - Code
thumbnail: https://cdn.worldvectorlogo.com/logos/ping.svg
---

本文將介紹一些基本的命令行的網絡工具，包括Windows和Linux

<!--more-->

## 前言

1. 我們假定您熟悉基本的命令行知識，如果您是第一次接觸命令行，可能需要先學習點基本常識。
2. 本文基於一些現有的書籍和自己的經歷。希望是在現實中可以派上用場。
3. 本文將不會贅述任何參數選項相關，需要的話請自行查閲參考手冊。

## Windows
> 基於`Microsoft Windows [Version 10.0.15063] Powershell`


+ `ping` 用來確定本地主機是否能和另一台主機交換數據。
  ```Shell
  PS C:\Users\jskyzero> ping jskyzero.github.io
  Pinging sni.github.map.fastly.net [151.101.1.147] with 32 bytes of data:
  Reply from 151.101.1.147: bytes=32 time=233ms TTL=42
  Reply from 151.101.1.147: bytes=32 time=233ms TTL=42
  Reply from 151.101.1.147: bytes=32 time=232ms TTL=42
  Reply from 151.101.1.147: bytes=32 time=216ms TTL=42

  Ping statistics for 151.101.1.147:
      Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
  Approximate round trip times in milli-seconds:
      Minimum = 216ms, Maximum = 233ms, Average = 228ms
  ```
+ `nestate` 用來檢驗本機各個端口連接情況。
  ```Shell
  PS C:\Users\jskyzero\> netstat -n
  Active Connections

    Proto  Local Address          Foreign Address        State
    TCP    127.0.0.1:1543         127.0.0.1:4369         ESTABLISHED
    TCP    127.0.0.1:4000         127.0.0.1:6710         ESTABLISHED
    TCP    127.0.0.1:4000         127.0.0.1:6711         ESTABLISHED
    TCP    127.0.0.1:4000         127.0.0.1:6713         ESTABLISHED
    TCP    127.0.0.1:4000         127.0.0.1:6716         ESTABLISHED
  ```
  我們可以組合一下比如`netstat -n  | Select-String "4000"`
+ 接下來介紹一些查看配置信息的指令
  + `ipconfig`用於查看當前TCP/IP協議的配置信息，可以查看到本地IP地址，子網掩碼等
  + `arp`（地址轉化協議）用於確定用戶計算機所屬局域網中對應IP地址的網卡的物理地址
+ 此外還有一些指令比如用來跟蹤數據包的路徑的`tracert`，看起來就不想去用的`netsh`，其餘的一些指令如果能遇見那就等遇見的時候再去管是乾什麽的吧。

## Linux
+ `ping` 還是那個指令，參數有不同，自行查閱參考手冊
+ `ifconfig - configure a network interface`
+ `netstat -apx | grep 4000`
+ 此外的一些指令等用到再說吧。