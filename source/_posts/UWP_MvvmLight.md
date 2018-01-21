---
layout: post
date: 2017/05/20
title: MvvmLight快速上手
tags:
    - Code
    - UWP
    - C#
categories:
    - UWP
thumbnail: "/img/thumb/uwp.png"
---

嗯本文将结合具体代码帮助读者快速上手MvvmLight，我们希望读者已经了解Mvvm/DI/IoC的相关知识

<!--more-->

# MvvmLight快速上手
> 最近仍然在学习一些包的用法，这次分享关于MvvmLight的相关用法

## 关于Mvvm您需要知道

![The MVVM Pattern](https://i-msdn.sec.s-msft.com/dynimg/IC564167.png)

如果您是第一次接触Mvvm，请参考[这篇文章](https://msdn.microsoft.com/zh-cn/library/hh848246.aspx)，Mvvm的目的和具体方法在上面都有提及，在我们具体实现上，我们只需要注意逻辑分层，使用如上图合理的手段来联系层与层间就好了。


## 关于依赖注入和控制反转容器您需要知道

您可以参考这篇中文文章[控制反转（IoC）与依赖注入（DI）](http://blog.xiaohansong.com/2015/10/21/IoC-and-DI/)，我们说DI/IoC都是为了降低程序的耦合度，如果您对耦合度还没有感觉的话，可能是您代码写得太少，或者您使用某些编程技巧巧妙的避开了这个问题，不管怎样，能解决问题都是好的。

## 关于MvvmLight您需要知道

这里以[这个系列的教程](http://www.cnblogs.com/HelloMyWorld/p/4750070.html)为叙述参考来说一下MvvmLight的主要功能

### ViewModelBase && ObservableObject

嗯这个我们懂的，就是提供一个更新提醒的接口。
```CSharp
RaisePropertyChanged(() => Name);
```
### ViewModelLocator && SimpleIoc

嗯这个就是所谓的IoC容器了我们可以把ViewModel和Server在里面register，然后以后就可以直接getinstance了
```CSharp
ServiceLocator.SetLocatorProvider(() => SimpleIoc.Default);
SimpleIoc.Default.Register<AppViewModel>();
```

### RelayCommand

嗯这个就是和XAML绑定的Command了

如果XAML是事件怎么办？嗯你需要使用EventToCommand解决方法
如
```XAML
<CheckBox>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="Checked">
            <command:EventToCommand Command="{Binding CheckedCommand}"></command:EventToCommand>
        </i:EventTrigger>
        <i:EventTrigger EventName="Unchecked">
            <command:EventToCommand Command="{Binding UnCheckedCommand}"></command:EventToCommand>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</CheckBox>
```
说起来这个i可能需要额外装包呢。

### Messenger

嗯这个就是最重要的消息机制的了，总之一个地方注册一个处理方法，然后就可以消息传递了。
```CSharp
Messenger.Default.Register<string>(this, MessageToken.SendMessageToken, (msg) =>
        {
            Msg = msg;
        });
// token 大概只是个确定特定接受方的字符串
Messenger.Default.Send<string>(Msg, MessageToken.SendMessageToken);
```

### DispatcherHelper

嗯这个就是我们非UI线程与UI线程通信用的了，大概就是在app.cs里面初始化，然后在需要的时候调用接口就好。
```CSharp
DispatcherHelper.Initialize();

DispatcherHelper.CheckBeginInvokeOnUI(() =>
                  {
                      Teacher.Students.Add(new Student()
                      {
                          Name = "LaoLi",
                          Age = 25
                      });
                  });
```

## 后记

就像在一开始说的，本文需要读者预先对一些知识有一定了解，MvvmLight提供了MVVM模式下编程的很多需要使用的模式/解决方案的封装，如果读者本身对MVVM了解就不够多，那么可能看起来就有点云里雾里。

### 我是发牢骚

现在才留意到[亚克力材质](https://docs.microsoft.com/zh-cn/windows/uwp/style/acrylic)的相关说明文章，难受，之前自己用Win2D自己调的半透明啊难受难受。