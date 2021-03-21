---
layout: post
title:  Shell：常用脚本和指令
header-img: "img/site/bg3.jpg"
tags:
---

本文汇总记录一些各个平台上的常用脚本和指令

## Shell

```bash
# 反向连接文件到一个
for i in $(ls -r); do cat $i >> new.md; done;
```

```bash
# 将.png结尾的文件名改为 .jpg
ls | cut -d '.' -f 1 | xargs -I {1} mv {1}.png {1}.jpg

for x in *.jpeg; do mv "$x" "${x%.jpeg}.jpg"; done
```

## Poweshell
```PS1
$PWD = Get-Location

Write-Output "Rove dll"
Remove-Item *.dll

Write-Output "Build Dll"
csc /t:library .\JskyLib.cs
vbc /t:library .\JskyLib-vb.vb

[Reflection.Assembly]::LoadFile("$PWD\JskyLib.dll")
[Reflection.Assembly]::LoadFile("$PWD\JskyLib-vb.dll")


Write-Output "Using JskyLib.Math"
[System.Console]::Write("`n`n1 + 2 = ") 
[JskyLib.Math]::Sum(1, 2)

Write-Output "Using JskyLibVB.MathVB"
[System.Console]::Write("`n`nPrint Version Message`n") 
[JskyLibVB.MathVB]::Version()
```

## Windows常用指令

+ OneDrive 删除注册表
`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace`
+ Create Big File (50MB)
`fsutil file createnew test.txt 52428800` 

## Linux

+ apt proxy
```
sudo nano  /etc/apt/apt.conf
Acquire::http::Proxy "http://:@192.168.199.229:7890";
Acquire::https::Proxy "http://:@192.168.199.229:7890";
```
+ 

