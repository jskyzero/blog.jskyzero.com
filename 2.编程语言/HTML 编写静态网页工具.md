---
layout: post
title: "效率提升：使用HTML编写静态网页工具"
tags:
    - HTML
    - JavaScript
    - Tools
---

使用HTML/JavaScript的方式编写一些辅助小工具。

# 效率提升：使用HTML编写小工具
`jskyzero` `2021/06/23`


## 为什么是HTML+JavaScript

最初在诸多GUI解决方案中犹豫了，并且把目光看向了所有人都会有的浏览器。

只要有浏览器就能打开HTML并且解析JavaScript。

## 解决方案

静态HTML + 简单交互。

再找一个UI库来让界面好看点。

## 细节展示

一个HTML的例子：

```HTML
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>

<body>
  <div>
    <!-- 这里写UI -->
  </div>
  <script>
    <!-- 这里写逻辑 -->
  </script>
</body>
```

一个UI的例子
```HTML
<div class="mt-3 mx-auto p-3 border border-primary" style="width: 600px;">
    <p class="text-center">技能概率计算</p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">概率:</span>
      <input id="key" type="text" class="form-control" value="1000;1000;1000">
      <button id="button" class="btn btn-outline-secondary" type="button">计算</button>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">描述:</span>
      <input id="description" type="text" class="form-control" value="平A 技能A 技能B 防御 绝技">
    </div>
    <pre id="result" class="px-2 text-center"></pre>
  </div>
```
看起来大概如下所示：

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
  integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
<div class="mt-3 mx-auto p-3 border border-primary" style="width: 600px;">
    <p class="text-center">技能概率计算</p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">概率:</span>
      <input id="key" type="text" class="form-control" value="1000;1000;1000">
      <button id="button" class="btn btn-outline-secondary" type="button">计算</button>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">描述:</span>
      <input id="description" type="text" class="form-control" value="平A 技能A 技能B 防御 绝技">
    </div>
    <pre id="result" class="px-2 text-center"></pre>
  </div>


一个逻辑的例子
```JavaScript
document.getElementById("button").onclick = () => {
      let text = document.getElementById("key").value;
      let descriptions = document.getElementById("description").value.split(" ");

      let result = document.getElementById("result");
      let values = text.split(";").map(a => parseInt(a)).filter(a => Number.isInteger(a));
      let total = values.reduce((a, b) => a + b, 0);
      let valuesProbability = values.map(a => a / total);

      let valuesZip = values.map((e, i) => {
        // return [e, valuesProbability[i]];
        return e + "\t\t" + Math.floor(valuesProbability[i] * 100) + "%\t";
      });

      valuesZip = valuesZip.map((e, i) => {
        let label = descriptions[i] === undefined ? "空" : descriptions[i];
        return label + "\t\t" + e;
      })

      result.innerText = valuesZip.join("\n");
    }
```

用了一些map & reduce之类的方法，还挺实用的。