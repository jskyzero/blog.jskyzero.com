---
layout: post
title: "搜索算法"
date: 2017/10/11
tags:
    - Code
    - Artificial Intelligence
    - Tools
categories:
    - Code
---

本文將以八数码问题为例，讨论在解决问题时候的搜索算法的选择和优化。

<!--more-->

## 以简单的问题切入

其实我也不太懂八数码究竟是什么问题，总之也是给我们一个输入，输出，变化规则，我们需要想办法找到从输入到输出的一个变化的过程，

我们来具体看下输入和输出，输入的是包含`0`的九个数，代表九个格子现在上面的数字，输出是按照1-8，最后是0的顺序。也就是要把数字放到对应的格子的意思，然后变化方法就是，移动0和上下左右的数字交换。

## 将问题转化到搜索上

每个状态可以理解为，一个节点，由一个状态转化到另一个状态可以理解为一条有向边，发现重复的状态的话就不在生成，这样我们就把这个问题变成了一个有向无环图（树），我们只要遍历这棵树，找到符合的目标状态，就算解决问题了。

那么树的遍历我们是熟悉的，无外乎深度优先广度优先。

广度优先可以找到最优解，但是相对而言对内存和时间的需求要高一些，深度的话可以在内存不足的时候起到关键作用。


## 随便实现一下逻辑

引入头文件

```python
import heapq

initial = [8, 7, 6, 5, 4, 3, 2, 1, 0]
final = [1, 2, 3, 4, 5, 6, 7, 8, 0]
```
一些基本函数

```python
def sub_move_choice(now_state):
    next_state = []
    # 0 1 2
    # 3 4 5
    # 6 7 8
    index = now_state.index(0)
    if index % 3 == 0:
        next_state.append(swap(now_state, index, index + 1))
    if index % 3 == 1:
        next_state.append(swap(now_state, index, index - 1))
        next_state.append(swap(now_state, index, index + 1))
    if index % 3 == 2:
        next_state.append(swap(now_state, index, index - 1))
    if index // 3 == 0:
        next_state.append(swap(now_state, index, index + 3))
    if index // 3 == 1:
        next_state.append(swap(now_state, index, index - 3))
        next_state.append(swap(now_state, index, index + 3))
    if index // 3 == 2:
        next_state.append(swap(now_state, index, index - 3))
    return next_state


def swap(now_state, left, right):
    new_state = now_state[:]
    temp = new_state[left]
    new_state[left] = new_state[right]
    new_state[right] = temp
    return new_state
```

核心部分

```python

def BFS(initial_state, end_state):
    next_states = [initial_state]
    traveled = set(tuple(initial_state))
    depth = 0
    while not end_state in next_states and not len(next_states) == 0:
        depth = depth + 1
        new_next_states = []
        for next_state in next_states:
            for sub_next_state in sub_move_choice(next_state):
                if not tuple(sub_next_state) in traveled:
                    new_next_states.append(sub_next_state)
                    traveled.add(tuple(sub_next_state))
        next_states = new_next_states[:]
        # print("depth = ", depth,
        #       "len = ", len(new_next_states),
        #       "traveled = ", len(traveled))
    print( "FAILED" if len(next_states) == 0 else "traveled = ", len(traveled))


def DFS(initial_state, end_state, Afunction):
    next_states = []
    heapq.heappush(
        next_states, (-Afunction(initial_state, end_state), initial_state))
    traveled = set(tuple(initial_state))
    while not len(next_states) == 0:
        top_state = heapq.heappop(next_states)[-1]
        if top_state == end_state:
            print("traveled = ", len(traveled))
            return
        else:
            for next_state in sub_move_choice(top_state):
                if not tuple(next_state) in traveled:
                    heapq.heappush(
                        next_states, (-Afunction(next_state, end_state), next_state))
                    traveled.add(tuple(next_state))
    print("FAILED")


def diferent_bit(one_state, another_state=final):
    return -sum([0 if x == y else 1 for(x, y) in zip(one_state, another_state)])

def diferent_sum(one_state, another_state=final):
    return -sum([abs(x - y) for(x, y) in zip(one_state, another_state)])

def manhadun_space(one_state, another_state):
    space = 0
    for i in range(0, 9, 1):
      j = another_state.index(one_state[i])
      space = space + abs(j % 3 - i % 3) + abs(j // 3 - i // 3)
    return -space
```

我们可以看到这个差别，还是挺明显的。

```python
BFS(initial, final)
DFS(initial, final, diferent_sum)
DFS(initial, final, diferent_bit)
DFS(initial, final, manhadun_space)

# traveled =  181447
# traveled =  18656
# traveled =  1327
# traveled =  247

```