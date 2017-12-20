---
title:      字节顺序
date:       2017-04-30
updated:    2017-04-30
tags:
    - Code
    - "File Encoding"
categories:
    - Code
---

本文将讲述关于编程中可能会遇到并且引起疑惑的字节顺序的相关问题，配合之前关于UTF-8编码的部分一起食用效果更佳。

# 字节顺序
> 字节顺序，又称端序或尾序（英语：Endianness）。在计算机科学领域中，是跨越多字节的程序对象的存储规则。 

## 前言
有仔细看过关于编码的那篇文章的读者应该已经有留意到关于字节顺序的问题（具体来说就是UTF-16的BE/LE两种不同的表示方式）。

这里我们将继续就大小头问题做一个深入的理解，从问题的来源到解决方案。

<!--more-->

## 起源

使用过C语言的读者可能知道，一个类型为`int`的变量可能占用四个字节，很多其他的类型也是这样，需要多个字节为一个单位，每个字节由于硬件设计的原因位的顺序是一般是固定的，多个字节排布的顺序则有可能不同。

我们一般将最高有效位字节储存在最低的内存地址的叫做大端序，最低位字节储存在最低的内存地址的叫做小端序。举例来说：
```
data = 0x01020304
     低位地址 >> 高位地址
大端序 0x01 | 0x02 | 0x03 | 0x04
小端序 0x04 | 0x03 | 0x02 | 0x01
```

### 查看字节序

根据字节序的定义，我们只要知道了数据在内存中的保存方式，自然可以很容易的判断它是那种字节序列。这里以C语言描述为例。具体的逻辑可以参考实际代码，如下。
```C
#include <stdio.c> // for printf()

int main() {
    
    // 假定int为4byte
    int a = 0x01020304;
    
    // 获取首byte地址，并用（也是一个byte的char类型）的指针存储
    char *b = (char *)&a;
    
    // 依照地址增长，打印每个byte
    for (int i = 0; i < 4; i++) {
        printf("%p:%c\n", b, *b);
        b++;
    }
    return 0;
}
```

## 关于Hexdump
> 以下故事只告诉我们要注意仔细看文档
> 关于该工具具体的介绍和使用方法请参考man等


使用Hexdump我们可以以字节为单位很方便的查看文件的原貌，但是请注意关于这个工具的默认查看方式
```
 -x      Two-byte hexadecimal display.  Display the input offset in hexa‐
         decimal, followed by eight, space separated, four column, zero-
         filled, two-byte quantities of input data, in hexadecimal, perline.
        

...

If no format strings are specified, the default display is equivalent to
 specifying the -x option.
```
举例来说，你现在有一个文件里面写入的是`123`(换个表示方法`0x313233`)，假定你的机器是小端序，使用hexdump不加参数查看，你将看到
```
0000000 3231 0033
0000003
```
当然我们直接用hd指令就挺好的
```
00000000  31 32 33                                          |123|
00000003
```
毕竟
```
     -C	     Canonical hex+ASCII display.  Display the input offset in hexa-
	     decimal, followed by sixteen space-separated, two column, hexa-
	     decimal bytes, followed by	the same sixteen bytes in %_p format
	     enclosed in ``|'' characters.

	     Calling the command hd implies this option.

```

## 经常会遇到的其他问题
### 字节顺序标记

BOM大概就是个概念，在编码上还挺容易被烦到，以下取自某不靠谱的百科

> 字节顺序标记（英语：byte-order mark，BOM）是位于码点U+FEFF的统一码字符的名称。当以UTF-16或UTF-32来将UCS/统一码字符所组成的字符串编码时，这个字符被用来标示其字节序。它常被用来当做标示文件是以UTF-8、UTF-16或UTF-32编码的记号。
>
> 字符U+FEFF如果出现在字节流的开头，则用来标识该字节流的字节序，是高位在前还是低位在前。如果它出现在字节流的中间，则表达零宽度非换行空格的意义，用户看起来就是一个空格。从Unicode3.2开始，U+FEFF只能出现在字节流的开头，只能用于标识字节序，就如它的名称——字节序标记——所表示的一样；除此以外的用法已被舍弃。取而代之的是，使用U+2060来表达零宽度无断空白。
>
> 许多视窗程序（包含记事本）会添加字节顺序标记到UTF-8文件。然而，在类Unix系统（大量使用文本文件，用于文件格式，用于进程间通信）中，这种作法则不被建议采用。因为它会妨碍到如解译器脚本开头的Shebang等的一些重要的码的正确处理。它亦会影响到无法识别它的编程语言。如gcc会报告源码档开头有无法识别的字符。而在PHP中，如果没有激活输出缓冲（output buffering），它会使得页面内容开始被送往浏览器（即：用户头文件已被提交），这使PHP脚本无法指定用户头文件（HTTP Header）。字节顺序标记在UTF-8中被表示为序列EF BB BF，对大部分未准备好处理UTF-8的文本编辑器及网页浏览器而言，在ISO-8859-1的环境中则会显示ï»¿。

如果之前有遇到相关情况的，大概看了上面的说明就明白了。

### 换行符

> **换行**（英语：newline，Line break，end-of-line(EOL), Line Feed(LF)），在[计算机](https://zh.wikipedia.org/wiki/%E8%A8%88%E7%AE%97%E6%A9%9F)领域中是一种加在[文字](https://zh.wikipedia.org/wiki/%E6%96%87%E5%AD%97)最后位置的特殊字元，在换行字元的下一个字元将会出现在下一[行](https://zh.wikipedia.org/wiki/%E8%A1%8C)，实际上换行字元根据不同的[硬件](https://zh.wikipedia.org/wiki/%E7%A1%AC%E4%BB%B6)平台或[操作系统](https://zh.wikipedia.org/wiki/%E4%BD%9C%E6%A5%AD%E7%B3%BB%E7%B5%B1)平台会有不同的[编码](https://zh.wikipedia.org/wiki/%E7%B7%A8%E7%A2%BC)方式。
>
> 换行字符可以看作是行的结束符，也可以看作行之间的分隔符，这两种处理方式之间存在一些歧义。如果换行字符被当作分隔符，那么文件的最后一行就不需要再有换行字符。但是多数系统的做法是在最后一行的后面也加上一个换行字符，也就是把换行字符看作是行的结束符。这样的程序在处理末行没有换行字符的文件时，可能会存在问题。相反地，有的程序把换行符看作分隔符，就会把最末尾的换行字符看作是新行的开始，也就是多出了一个空行。
>
> 以[ASCII](https://zh.wikipedia.org/wiki/ASCII)为基础的或相容的字元集使用分别LF（Line feed，0Ah）或CR（Carriage Return，0Dh）或CR+LF；下面列出各系统换行字元编码的列表
>
> + LF：在[Unix](https://zh.wikipedia.org/wiki/Unix)或Unix相容系统（GNU/Linux，AIX，Xenix，Mac OS X，...）、BeOS、Amiga、RISC OS
> + CR+LF：[MS-DOS](https://zh.wikipedia.org/wiki/MS-DOS)、[微软](https://zh.wikipedia.org/wiki/%E5%BE%AE%E8%BB%9F)[视窗操作系统](https://zh.wikipedia.org/wiki/%E8%A6%96%E7%AA%97%E4%BD%9C%E6%A5%AD%E7%B3%BB%E7%B5%B1)（Microsoft Windows）、大部分非Unix的系统
> + CR：Apple II家族，[Mac OS](https://zh.wikipedia.org/wiki/Mac_OS)至版本9

请尤其注意，某些语言对文件的以文本文件打开的方式是根据平台不同而修改过写入的换行符的，这样将会在试图以直接按字节写入文件（二进制处理方式）时带来很多不必要的麻烦，所以后者一定要以二进制方式打开文件。具体可以参考下面的参考。



## 参考

[Difference between CR LF, LF and CR line break types?](http://stackoverflow.com/questions/1552749/difference-between-cr-lf-lf-and-cr-line-break-types)

[Python file IO 'w' vs 'wb'](http://stackoverflow.com/questions/15750660/python-file-io-w-vs-wb)

[fopen中w w+ wb区别](http://blog.csdn.net/guyue6670/article/details/6681037)

 [详解大端模式和小端模式](http://blog.csdn.net/ce123_zhouwei/article/details/6971544)

某不靠谱的Wikipedia若干