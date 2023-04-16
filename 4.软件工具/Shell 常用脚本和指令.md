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
+ Create Big File (5GB)
`[System.IO.Path]::GetTempFileName() | % { [System.IO.File]::Create($_).SetLength(5gb).Close;$_ } | ? { $_ }`
+ nvidia experience 下载目录 
`C:\ProgramData\NVIDIA Corporation\Downloader`


+ Powershll prompt
```
notepad $PROFILE
function prompt {"~: "}
function prompt { "PS " + $( Get-Location | split-path -leaf ) + ": " }
```

+ WSL
```
wsl --shutdown
wsl --export <Distro> <FileName>
wsl --import <Distro> <InstallLocation> <FileName> [Options]
wsl --distribution, -d <Distro>
wsl --set-default, -s <Distro>
# \HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Lxss DefaultUid Dec 1000
```

## Linux

+ apt proxy
```
sudo nano  /etc/apt/apt.conf
Acquire::http::Proxy "http://:@192.168.199.229:7890";
Acquire::https::Proxy "http://:@192.168.199.229:7890";
```
+ gem install proxy
```
sudo gem install -p http://127.0.0.1:7890 github-linguist
```

## Python

+ 水平速度、落地夹角已知，求下落速度
```python
math.tan(math.radians(10))
```

## ImageMagick

```
sudo apt install imagemagick
sudo vi /etc/ImageMagick-6/policy.xml
convert *.png -quality 90 *.jpg
convert *.jpg mydoc.pdf
```

## ffmpeg

+ 合并视频&音频
```
ffmpeg -i video.mp4 -i audio.wav -c copy output.mkv
```

## draw.io
+ [config for image size ](https://github.com/jgraph/drawio/issues/1887)
```
{
"maxImageSize": "10000",
"maxImageBytes": "30000000"
}
```