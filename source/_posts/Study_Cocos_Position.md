---
title: 关于Cocos坐标的问题
date: 2017/05/08
tags: 
    - Code
    - Cocos
categories:
    - Code
---

最近在学习Cocos2dx 3.10，总体来说这还是个不错的框架，只不过C++确实好久没写现在生疏了，这篇文章将讨论一直困扰我的Node Position的问题。

# 关于Cocos坐标的问题

## 基本思路
> 参考[Cocos2d-x 3.0坐标系详解](http://www.cocos.com/docs/native/v3/coordinate-system/zh.html)

笛卡尔坐标系中定义右手系原点在左下角，x向右，y向上，z向外，OpenGL坐标系为笛卡尔右手系。而Cocos2d则使用和OpenGL相同的坐标系。

世界坐标系也叫做绝对坐标系，是游戏开发中建立的概念。因此，“世界”指游戏世界。cocos2d中的元素是有父子关系的层级结构，我们通过Node的setPosition设定元素的位置使用的是相对与其父节点的本地坐标系而非世界坐标系。最后在绘制屏幕的时候cocos2d会把这些元素的本地坐标映射成世界坐标系坐标。

本地坐标系也叫相对坐标系，是和节点相关联的坐标系。每个节点都有独立的坐标系，当节点移动或改变方向时，和该节点关联的坐标系将随之移动或改变方向。

将一个节点添加到父节点里面时，需要设置其在父节点上的位置，本质上是设置节点的锚点在父节点坐标系上的位置。

Anchor Point的两个参数都在0~1之间。它们表示的并不是像素点，而是乘数因子。(0.5, 0.5)表示Anchor Point位于节点长度乘0.5和宽度乘0.5的地方，即节点的中心

在Cocos2d-x中Layer的Anchor Point为默认值(0, 0)，其他Node的默认值为(0.5, 0.5)。

> 关于世界坐标系和本地坐标系的相互转换


```C++
    // 把世界坐标转换到当前节点的本地坐标系中
    Point convertToNodeSpace(const Point& worldPoint) const;

    // 把基于当前节点的本地坐标系下的坐标转换到世界坐标系中
    Point convertToWorldSpace(const Point& nodePoint) const;

    // 这下面注释是不是写反了。
    // 基于Anchor Point把基于当前节点的本地坐标系下的坐标转换到世界坐标系中
    Point convertToNodeSpaceAR(const Point& worldPoint) const;

    // 基于Anchor Point把世界坐标转换到当前节点的本地坐标系中
    Point convertToWorldSpaceAR(const Point& nodePoint) const;
```

## getPosition()

我们可以很清楚的看到getPosition()是和内部_position关联的，返回的是我们设置的值，理论上是该节点相对于其父节点的坐标。

```C++
/// position getter
const Vec2& Node::getPosition() const
{
    return _position;
}

/// position setter
void Node::setPosition(const Vec2& position)
{
    setPosition(position.x, position.y);
}

void Node::getPosition(float* x, float* y) const
{
    *x = _position.x;
    *y = _position.y;
}

void Node::setPosition(float x, float y)
{
    if (_position.x == x && _position.y == y)
        return;
    
    _position.x = x;
    _position.y = y;
    
    _transformUpdated = _transformDirty = _inverseDirty = true;
    _usingNormalizedPosition = false;
}
```

## 世界坐标系和本地坐标系的相互转换

> 实质就是仿射变换，4X4矩阵乘以4X1向量得到4X1结果向量取前2位

### 仿射变换
在有限维的情况，每个仿射变换可以由一个矩阵A和一个向量b给出，它可以写作A和一个附加的列b。一个仿射变换对应于一个矩阵和一个向量的乘法，而仿射变换的复合对应于普通的矩阵乘法，只要加入一个额外的行到矩阵的底下，这一行全部是0除了最右边是一个1，而列向量的底下要加上一个1

AffineTransform类描述了一种二维仿射变换的功能，它是一种二维坐标到二维坐标之间的线性变换，保持二维图形的“平直性”（译注： straightness，即变换后直线还是直线不会打弯，圆弧还是圆弧）和“平行性”（译注：parallelness，其实是指保持二维图形间的相对位置关系不变，平行线还是平行线，而直线上点的位置顺序不变，另特别注意向量间夹角可能会发生变化。）仿射变换可以通过一系列的原子变换的复合来实现，包括：平移（Translation）、缩放（Scale）、翻转（Flip）、旋转（Rotation）和错切（Shear）。

### 源码

```C++
Vec2 Node::convertToNodeSpace(const Vec2& worldPoint) const
{
    // WorldToNodeTransform * worldPoint
    // Matrix 4 * 4         * Matrix 4 * 1
    //  1   0   0   500         x
    //  0   1   0   400         y
    //  0   0   1   0           0
    //  0   0   0   1           1.0f
    Mat4 tmp = getWorldToNodeTransform();
    Vec3 vec3(worldPoint.x, worldPoint.y, 0);
    Vec3 ret;
    tmp.transformPoint(vec3,&ret);
    return Vec2(ret.x, ret.y);
}

Vec2 Node::convertToWorldSpace(const Vec2& nodePoint) const
{
    Mat4 tmp = getNodeToWorldTransform();
    Vec3 vec3(nodePoint.x, nodePoint.y, 0);
    Vec3 ret;
    tmp.transformPoint(vec3,&ret);
    return Vec2(ret.x, ret.y);
}

//   WorldSpace =》convert《= NodeSpace
//   worldPoint =》convert《= nodePoint
//                    +AR 《=》-AR

Vec2 Node::convertToNodeSpaceAR(const Vec2& worldPoint) const
{
    Vec2 nodePoint(convertToNodeSpace(worldPoint));
    return nodePoint - _anchorPointInPoints;
}

Vec2 Node::convertToWorldSpaceAR(const Vec2& nodePoint) const
{
    return convertToWorldSpace(nodePoint + _anchorPointInPoints);
}

Vec2 Node::convertToWindowSpace(const Vec2& nodePoint) const
{
    Vec2 worldPoint(this->convertToWorldSpace(nodePoint));
    return _director->convertToUI(worldPoint);
}

// convenience methods which take a Touch instead of Vec2
Vec2 Node::convertTouchToNodeSpace(Touch *touch) const
{
    return this->convertToNodeSpace(touch->getLocation());
}

Vec2 Node::convertTouchToNodeSpaceAR(Touch *touch) const
{
    Vec2 point = touch->getLocation();
    return this->convertToNodeSpaceAR(point);
}
```

## 关于转化矩阵的计算代码

```C++
// MARK: coordinates

AffineTransform Node::getNodeToParentAffineTransform() const
{
    AffineTransform ret;
    GLToCGAffine(getNodeToParentTransform().m, &ret);

    return ret;
}


Mat4 Node::getNodeToParentTransform(Node* ancestor) const
{
    Mat4 t(this->getNodeToParentTransform());

    for (Node *p = _parent;  p != nullptr && p != ancestor ; p = p->getParent())
    {
        t = p->getNodeToParentTransform() * t;
    }

    return t;
}

AffineTransform Node::getNodeToParentAffineTransform(Node* ancestor) const
{
    AffineTransform t(this->getNodeToParentAffineTransform());

    for (Node *p = _parent; p != nullptr && p != ancestor; p = p->getParent())
        t = AffineTransformConcat(t, p->getNodeToParentAffineTransform());

    return t;
}
const Mat4& Node::getNodeToParentTransform() const
{
    if (_transformDirty)
    {
        // Translate values
        float x = _position.x;
        float y = _position.y;
        float z = _positionZ;
        
        if (_ignoreAnchorPointForPosition)
        {
            x += _anchorPointInPoints.x;
            y += _anchorPointInPoints.y;
        }
        
        bool needsSkewMatrix = ( _skewX || _skewY );
        
        
        Vec2 anchorPoint(_anchorPointInPoints.x * _scaleX, _anchorPointInPoints.y * _scaleY);
        
        // calculate real position
        if (! needsSkewMatrix && !_anchorPointInPoints.isZero())
        {
            x += -anchorPoint.x;
            y += -anchorPoint.y;
        }
        
        // Build Transform Matrix = translation * rotation * scale
        Mat4 translation;
        //move to anchor point first, then rotate
        Mat4::createTranslation(x + anchorPoint.x, y + anchorPoint.y, z, &translation);
        
        Mat4::createRotation(_rotationQuat, &_transform);
        
        if (_rotationZ_X != _rotationZ_Y)
        {
            // Rotation values
            // Change rotation code to handle X and Y
            // If we skew with the exact same value for both x and y then we are simply just rotating
            float radiansX = -CC_DEGREES_TO_RADIANS(_rotationZ_X);
            float radiansY = -CC_DEGREES_TO_RADIANS(_rotationZ_Y);
            float cx = cosf(radiansX);
            float sx = sinf(radiansX);
            float cy = cosf(radiansY);
            float sy = sinf(radiansY);
            
            float m0 = _transform.m[0], m1 = _transform.m[1], m4 = _transform.m[4], m5 = _transform.m[5], m8 = _transform.m[8], m9 = _transform.m[9];
            _transform.m[0] = cy * m0 - sx * m1, _transform.m[4] = cy * m4 - sx * m5, _transform.m[8] = cy * m8 - sx * m9;
            _transform.m[1] = sy * m0 + cx * m1, _transform.m[5] = sy * m4 + cx * m5, _transform.m[9] = sy * m8 + cx * m9;
        }
        _transform = translation * _transform;
        //move by (-anchorPoint.x, -anchorPoint.y, 0) after rotation
        _transform.translate(-anchorPoint.x, -anchorPoint.y, 0);
        
        
        if (_scaleX != 1.f)
        {
            _transform.m[0] *= _scaleX, _transform.m[1] *= _scaleX, _transform.m[2] *= _scaleX;
        }
        if (_scaleY != 1.f)
        {
            _transform.m[4] *= _scaleY, _transform.m[5] *= _scaleY, _transform.m[6] *= _scaleY;
        }
        if (_scaleZ != 1.f)
        {
            _transform.m[8] *= _scaleZ, _transform.m[9] *= _scaleZ, _transform.m[10] *= _scaleZ;
        }
        
        // FIXME:: Try to inline skew
        // If skew is needed, apply skew and then anchor point
        if (needsSkewMatrix)
        {
            float skewMatArray[16] =
            {
                1, (float)tanf(CC_DEGREES_TO_RADIANS(_skewY)), 0, 0,
                (float)tanf(CC_DEGREES_TO_RADIANS(_skewX)), 1, 0, 0,
                0,  0,  1, 0,
                0,  0,  0, 1
            };
            Mat4 skewMatrix(skewMatArray);
            
            _transform = _transform * skewMatrix;
            
            // adjust anchor point
            if (!_anchorPointInPoints.isZero())
            {
                // FIXME:: Argh, Mat4 needs a "translate" method.
                // FIXME:: Although this is faster than multiplying a vec4 * mat4
                _transform.m[12] += _transform.m[0] * -_anchorPointInPoints.x + _transform.m[4] * -_anchorPointInPoints.y;
                _transform.m[13] += _transform.m[1] * -_anchorPointInPoints.x + _transform.m[5] * -_anchorPointInPoints.y;
            }
        }
        
        if (_useAdditionalTransform)
        {
            _transform = _transform * _additionalTransform;
        }
        
        _transformDirty = false;
    }
    
    return _transform;
}

void Node::setNodeToParentTransform(const Mat4& transform)
{
    _transform = transform;
    _transformDirty = false;
    _transformUpdated = true;
}

void Node::setAdditionalTransform(const AffineTransform& additionalTransform)
{
    Mat4 tmp;
    CGAffineToGL(additionalTransform, tmp.m);
    setAdditionalTransform(&tmp);
}

void Node::setAdditionalTransform(Mat4* additionalTransform)
{
    if (additionalTransform == nullptr)
    {
        _useAdditionalTransform = false;
    }
    else
    {
        _additionalTransform = *additionalTransform;
        _useAdditionalTransform = true;
    }
    _transformUpdated = _transformDirty = _inverseDirty = true;
}


AffineTransform Node::getParentToNodeAffineTransform() const
{
    AffineTransform ret;

    GLToCGAffine(getParentToNodeTransform().m,&ret);
    return ret;
}

const Mat4& Node::getParentToNodeTransform() const
{
    if ( _inverseDirty )
    {
        _inverse = getNodeToParentTransform().getInversed();
        _inverseDirty = false;
    }

    return _inverse;
}


AffineTransform Node::getNodeToWorldAffineTransform() const
{
    return this->getNodeToParentAffineTransform(nullptr);
}

Mat4 Node::getNodeToWorldTransform() const
{
    return this->getNodeToParentTransform(nullptr);
}

AffineTransform Node::getWorldToNodeAffineTransform() const
{
    return AffineTransformInvert(this->getNodeToWorldAffineTransform());
}

Mat4 Node::getWorldToNodeTransform() const
{
    return getNodeToWorldTransform().getInversed();
}
```