---
layout: post
title: "效率提升：使用Python将富文本转CSV格式"
tags:
    - Python
    - Tools
---

最近遇到的数据处理问题，做个记录，以后可以再此基础上修改为其他文本处理程序！


# Python 富文本转CSV格式
`jskyzero` `2023/04/16`


## 背景概述

打算制作一个朴素的索引网页，里面是GameAIPro的大量文章，在原有信息的基础上多一些需要显示的批注字段。本来是打算直接动手的，但是写了10篇就感觉`markdown`表格的长行，编辑起来太难受了。

研究了一下`github`自带的`jekyll`是可以用`_data/*.csv`来实现数据导入的，再自己随便写点`jekyll`的模板就完事了。使用csv格式，我们就可以来使用类excel的表格工具管理编辑数据，不错。

问题又来到了如何将现有网站上的信息转化到csv格式，手动吗？约200篇文章，手动多少有点费事，还是写个中转工具吧，就决定是你了，Python启动！


## 控制流模型

我们要做的事情大概是这样：

<!-- https://mermaid.live/edit#pako:eNqrVkrOT0lVslJKy8kvT85ILCpR8AmKyVMAAsfo53snvly4NVZBV9eu5umS3qcd255vmvFiy5YaBafop-t7nk1rfzZnTSxEtRNYVUBlSUZ-3tMlLc8ntNUoOEc7B4c9W7Dn6Z5-oNrnqxcA1SrpKOWmFuUmZqYALa0G6Y1RKslIzU2NUbICMlNS0xJLc0pilGLyaoFKE0tL8oMr85KVrEqKSlN1lEoLUhJLUl0yE9OLEnOVrNISc4pTawGaVlE6 -->

![](https://mermaid.ink/svg/pako:eNqrVkrOT0lVslJKy8kvT85ILCpR8AmKyVMAAsfo53snvly4NVZBV9eu5umS3qcd255vmvFiy5YaBafop-t7nk1rfzZnTSxEtRNYVUBlSUZ-3tMlLc8ntNUoOEc7B4c9W7Dn6Z5-oNrnqxcA1SrpKOWmFuUmZqYALa0G6Y1RKslIzU2NUbICMlNS0xJLc0pilGLyaoFKE0tL8oMr85KVrEqKSlN1lEoLUhJLUl0yE9OLEnOVrNISc4pTawGaVlE6)


继续用用面向过程的方式来描述的化，Python的控制流大概是这样子的：

<!-- https://mermaid.live/edit#pako:eNotTr8OwUAcfpXLb-YFOkio0URi6Rku7RVJ_0hdI6Ld0IXU0loMJJhQMQl9HHc8hpP6pi_fv3wT0F2DggKm5Y70HvEYajSxgySq2id78tmBZwuRRmJz6qByuRLwZfLZ_ZUA1TR-Xr9Px9f9xvfT92ou4hWPU5FcxfLSKYZqRS_LefQIkKqprbbY5jyPpQ8lsKlnk74hP0x-eQysR22KQZHUoCbxLYYBO6GMEp-5rbGjg8I8n5bAHxiE0XqfdD1ig2ISa0jDL1EhXYQ -->

![](https://mermaid.ink/svg/pako:eNotTr8OwUAcfpXLb-YFOkio0URi6Rku7RVJ_0hdI6Ld0IXU0loMJJhQMQl9HHc8hpP6pi_fv3wT0F2DggKm5Y70HvEYajSxgySq2id78tmBZwuRRmJz6qByuRLwZfLZ_ZUA1TR-Xr9Px9f9xvfT92ou4hWPU5FcxfLSKYZqRS_LefQIkKqprbbY5jyPpQ8lsKlnk74hP0x-eQysR22KQZHUoCbxLYYBO6GMEp-5rbGjg8I8n5bAHxiE0XqfdD1ig2ISa0jDL1EhXYQ)


面向过程的程式写的有些多了，不如这次试试面向对象的方式：

<!-- https://mermaid.live/edit#pako:eNqrVkrOT0lVslJKzkksLnbJTEwvSsyNyVMAArCIQkhFiZFzcVk1RExBQfvZtPZnc9Ygc5-vXpCTWVwCF3qxd-_T1qUQdRqaCkjia572THvWMcE5OExDEy78tG3m0_ZdSGK1yPZDzH--cXc1mpVPd_U_7d-OJvhsQfvLRTPQBF9O3vesbylcMCknEYIQyua1vGxY8LR977OpGwg5GOi4mDwlHaXc1KLcxMwUYMiBHRajVJKRmpsao2QFZKakpiWW5pTEKMXk1QKVJpaW5AdX5iUrWZUUlabqKJUWpCSWpELDWskqLTGnOLUWAP-TmlY -->

![](https://mermaid.ink/svg/pako:eNqrVkrOT0lVslJKzkksLnbJTEwvSsyNyVMAArCIQkhFiZFzcVk1RExBQfvZtPZnc9Ygc5-vXpCTWVwCF3qxd-_T1qUQdRqaCkjia572THvWMcE5OExDEy78tG3m0_ZdSGK1yPZDzH--cXc1mpVPd_U_7d-OJvhsQfvLRTPQBF9O3vesbylcMCknEYIQyua1vGxY8LR977OpGwg5GOi4mDwlHaXc1KLcxMwUYMiBHRajVJKRmpsao2QFZKakpiWW5pTEKMXk1QKVJpaW5AdX5iUrWZUUlabqKJUWpCSWpELDWskqLTGnOLUWAP-TmlY)


## 编码部分

+ 载入文件

对每一行进行单独处理：

```Python
def read(self, file_path):
        """read txt"""
        with open(file_path, "r", encoding="utf-8") as txt_file:
            for line in txt_file:
                if line.startswith("Section"):
                    self.current_section = line.split(':')[1].strip()
                    # print(self.current_section)
                elif line.startswith("-") or line == "\n":
                    pass
                else:
                    article = Article(line, self.current_section)
                    self.articles.append(article)
        return self
```

+ 文本类的文本处理

这里有一个有意思的工具方法，slice，将字符串进行切分，再对切分后的字符串进行一次切片操作，以此来快速将富文本中的关键信息提取出来。

```Python
    def __init__(self, line, section):
        self.section = section
        # 2\. [title](src), authur [demo code](demo_src)\
        self.index, line = self.slice(line, '.', None, -1, 1, None)
        # [title](src), authur [demo code](demo_src)\
        self.title, line = self.slice(line, ']', 1, None, 1, None)
        # (src), authur [demo code](demo_src)\
        self.src, line = self.slice(line, ')', 1, None, 2, None)
        if "demo" in line:
            # authur [demo code](demo_src)\
            self.authur, line = self.slice(line, '[', None, None, None, None)
            # [demo code](demo_src)\
            _, line = self.slice(line, '(', None, None, None, None)
            # (demo_src)\
            self.demo_src, _ = self.slice(line, ')', 1, None, None, None)
        else:
            # authur\
            self.authur = line
            self.demo_src = ""
        # authur\
        if self.authur.endswith("\\"):
            self.authur = self.authur[:-1]
        # print(str(self))

    @staticmethod
    def slice(str, chr, a=None, b=None, c=None, d=None):
        index = str.find(chr)
        left = str[0:index].strip()
        right = str[index:].strip()
        return (left[a:b].strip(), right[c:d].strip())
```

+ 处理导出

这部分就比较简单了，直接map一下然后写入文件就行。

```Python
    def to_csv(self):
        self.csv = map(lambda x: x.to_csv(), self.articles)
        return self

    def write(self, file_path):
        with open(file_path, 'w') as f:
            # using csv.writer method from CSV package
            write = csv.writer(f)
            write.writerow(Article.to_csv_header())
            write.writerows(self.csv)
        return self

```


## 参考

+ [源码](https://github.com/jskyzero/GameAIPro/blob/main/_data/raw/txt_2_csv.py)
