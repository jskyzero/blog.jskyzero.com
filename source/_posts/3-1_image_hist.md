---
layout: post
title: "直方图均衡化/匹配"
date: 2017/10/10
tags:
    - Image
    - Matlab
    - Digital Image Processing
categories:
    - Code
thumbnail: https://it.wisc.edu/wp-content/uploads/DoIT-C-ITWiscEdu-MATLAB-675x300-News-Images.png
---

本文将使用MATLAB来，实现图像的直方图均衡化和直方图匹配。

## 原理

以灰度图为例，直方图就是每个灰度出现的次数的一个统计量，那么有些图像的灰度分布是不均衡的，举个例子来说分布在灰度100-200，那么我们先计算出每个灰度值的概率，然后计算出累计概率分布函数（cdf），利用cdf最终为1，扩大255倍，这样，之前的每一个灰度值，就会变成cdf对应的值的255倍。这样我们就把灰度空间拉大。

直方图匹配，距离来说a图进行A变化从100-200直方图均衡了到0-255了，b图进行B变化均衡了从0-100到了0-255，我们对a图进行A变化后在进行B^-1（B的逆变化），就把a图从100-200到了b图的0-100，实际上我们可能不太好求B的逆变化，这个时候我们找最接近的一个值对应的原值就可以了。

## 代码

其实我觉得贴代码挺蠢的，不过好歹显得有点内容。

```MATLAB
river_img = imread('river.JPG');

% save img info 
[img_x, img_y] = size(river_img);
img_length =  img_x * img_y;
% 
river_hist = imhist(river_img);
sum_hist = @(x) sum(river_hist(1:x, :));
cal_prob = @(x) x / img_length;
river_cdf =  arrayfun(cal_prob, arrayfun(sum_hist, 1:256));
change_table = river_cdf * 255;

% to array

map_value = @(x) uint8(round(change_table(x+1)));
% new_river_img =  arrayfun(map_value, reshape(river_img, [img_length, 1]));
new_river_img =  reshape(arrayfun(map_value, reshape(river_img, [img_length, 1])), [img_x, img_y]);
sample_river_img = histeq(river_img);

hold on;
subplot(1,3,1);
imshow(river_img);
xlabel('initial');
subplot(1,3,2);
imshow(new_river_img);
xlabel('mine');
subplot(1,3,3);
imshow(sample_river_img);
xlabel('sample');
```

上面那个是直方图均衡，下面这个是直方图匹配，注意下面这个的话，文件名需要是`question2.m`，必须这样的原因，我也很讨厌，和MATLAB的函数写法有关。


```MATLAB
function [] = question2()
%{
jskyzero 2017/10/09

Digital Image Processing
%}

lena_img = imread('LENA.png');
eight_am_img = imread('EightAM.png');



function map_table = get_map_table(img_matrix)
    [img_x, img_y] = size(img_matrix);
    img_length =  img_x * img_y;
    img_hist = imhist(img_matrix);
    sum_hist = @(x) sum(img_hist(1:x, :));
    cal_prob = @(x) x / img_length;
    img_cdf =  arrayfun(cal_prob, arrayfun(sum_hist, 1:256));
    change_table = img_cdf * 255;
    cal_table = @(x) uint8(round(x));
    map_table =  arrayfun(cal_table, change_table);
end

lena_map_table = get_map_table(lena_img);
eight_am_table = get_map_table(eight_am_img);

function neareast_index = get_neareast_index(value)
    neareast_index = 1;
    max_length = 255;
    function [] = checkone(index)
        if (lena_map_table(index) - value) <= max_length
            max_length = lena_map_table(index) - value;
            neareast_index = index;
        end  
    end
    arrayfun(@checkone, 1:256);
    neareast_index = uint8(neareast_index);
end

final_map_table = arrayfun(@get_neareast_index, eight_am_table);
map_value = @(x) final_map_table(x+1);
[x, y] = size(eight_am_img);
length =  x * y;
new_eight_am_img =  reshape(arrayfun(map_value, reshape(eight_am_img, [length, 1])), [x, y]);


hold on;
subplot(3,2,1);
imshow(eight_am_img);
xlabel('initial');
subplot(3,2,2);
imshow(new_eight_am_img);
xlabel('new');

subplot(3,2,3);
imhist(lena_img);
xlabel('lena_hist');
subplot(3,2,4);
imhist(eight_am_img);
xlabel('eight_am_hist');
subplot(3,2,5);
imhist(new_eight_am_img);
xlabel('new_eight_am_hist');

end
```

## 实际的输出



![贴图1](/img/markdown/output_img_1.bmp)

第二张图片，我用GIMP高压了，有点失真

![贴图2](/img/markdown/output_img_2.jpg)

## 参考
[Histogram equalization](https://en.wikipedia.org/wiki/Histogram_equalization)


[matlab help](https://cn.mathworks.com/help/)