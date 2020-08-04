---
layout: post
title: "课程总结：C++中的模板元編程"
header-img: "img/posts/cpp.tmp.png"
tags:
    - C++
    - Template MetaProgramming
    - Summary
---

本文將給出一些C++模板以及模板元的寫法的基本介紹，將會結合具體的例子并竟可能的降低閱讀門檻。

<!--more-->

# C++ 模板元編程
`jskyzero` `2019/02/04`

唔，起因大概是上了一節C++模板的課程，然後之前Sushiscript的時候也沒有精力好好理順一下模板以及模板元，平時也很少用到，唔，不過還是出於好奇寫了點相關的代碼，現在把一些內容整理出來。

先從模板開始說起吧，简单来说，模板提供了一种参数化类型的能力，模板在编译时对模板形参进行参数化，编译出对应不同类型的代码，C++是支持重载的，我们的方法（或者理解成操作，毕竟这里不能单独对应函数，应该也要包括操作符，类等）可以对于不同类型有不同的行为，模板使得这种对应不同类型的不同行为实现起来较为简单。

还是稍微扯远一点吧，上面已经说了重载和模板，再来说一下泛型和多态吧，泛型允许我们在“强类型语言”中编写代码时候，使用一些在实例化时才指定类型的类型，这些类型根据不同指定的类型可以有不同的行为。多态在我看来则指相同符号的行为的差异性，比如基类储存不同子类后调用相同函数的差异性，又比如函数在面对不同参数的差异性，后者就比较类似泛型。

还是把话题撤回来，接下来将从模板，模板元，再到最后的效率比较来展开文章。

## 模板速覽

还是老生常谈来说一下吧，上面已经说了模板是什么了，然后模板的好处的话，除了上面说的减少工作量，还有相比虚函数的运行时多态，模板的开销更少，能提高效率。模板大概可以分为函数模板、类模板、成员模板（类的成员函数）。模板形参则可以有类型模板参数、非类型模板参数、模板模板參數。然後一些邊緣情況需要用`typename`關鍵字手動指明這是個類型，防止編譯器誤解，另外的一些知識比如依賴名查找（ADL）這裡也不展開說了。

給一些可能平時不太會見得到的模板寫法吧，比如底層是指針的屬性綁定。
```c++
template <typename ParentType, typename MemberType>
struct Property {
  // typedef member ptr type
  typedef MemberType ParentType::*MemberPtrType;
  // use pointer to change data
  MemberPtrType p;
  // bind pointer
  void Bind(MemberPtrType p_) { p = p_; }
  // change data
  void Set(ParentType& parent, const MemberType& value) { parent.*p = value; }
};

void Property_TEST() {
  SomeClass sc;
  auto prop = Property<SomeClass, int>();
  prop.Bind(&SomeClass::SomeMember);
  prop.Set(sc, 10);

  assert_equal(sc.SomeMember, 10);

  std::cout << "Pass property test" << std::endl;
}
```
又比使用模板特化如從類的成員的指針中獲取成員或者類本身的類型。
```c++
#define TYPE_NAME(x) (typeid(x).name())

template <typename MemPtrType>
struct GetMemTypeFromMemPtr {
};

template <typename ParentType, typename Type>
struct GetMemTypeFromMemPtr<Type ParentType::*> {
  typedef Type Result;
};


template <typename MemPtrType>
struct GetClassTypeFromMemPtr {
};

template <typename ParentType, typename Type>
struct GetClassTypeFromMemPtr<Type ParentType::*> {
  typedef ParentType Result;
};

void TypeTraits_TEST() {
  assert_equal(TYPE_NAME(int), TYPE_NAME(int));
  assert_equal(
      TYPE_NAME(int),
      TYPE_NAME(GetMemTypeFromMemPtr<decltype(&SomeStruct::SomeMember)>::Result));
  assert_equal(
      TYPE_NAME(SomeStruct),
      TYPE_NAME(GetClassTypeFromMemPtr<decltype(&SomeStruct::SomeMember)>::Result));

  std::cout << "Pass type-traits test" << std::endl;
}
```

## 模板元編程速覽

### 從簡單的開始

在談及模板元之前，不妨先想想什麼是元編程，簡單來說，元編程是指對編程語言進行編程，舉個例子，你可以用一段shell代碼生成重複若干次打印一個語句的C代碼，這就是元編程。模板元編程則是利用模板來進行元編程，接下來將會特化到C++中來，C++中的模板因為是圖靈完備的，所以可以在編譯時候就可以執行計算操作，這樣可以把計算過程放在編譯時期，提高效率，另一方面，模板元編程大體上比較反人類，而且調試困難，這種就會不利於團隊合作，所以大概自己寫寫玩還可以。

從一個簡單的計算階乘的例子開始吧。
```c++
#include <iostream>

template<int N>
struct Factorial {
  static const int result = N * Factorial<N - 1>::result;
};

template<>
struct Factorial<0> {
  static const int result = 1;
};


void Factorial_Part() {
  std::cout << std::endl;
  std::cout << "Factorial(5) = " << Factorial<5>::result << std::endl;
}
```
唔，簡單的來說，我們聲明了一個`Factorial`類，然後這個類是一個接受非類型模板參數的模板類，會根據接受到參數的不同而實例化出不同的類，然後關鍵的部分在於那個遞歸，有遞歸自然有終止的地方，因此我們需要用參數特化來指定終結情況的行為。

這種思維方式非常類似之前寫過的haskell中的函數式編程，比如haskell裡面的取反可以這麼寫：
```haskell
myNot :: Bool -> Bool
myNot True = False
myNot False = True
-- myNot x = not x
```
### 實現一個分數

唔，依稀記得haskell當初第一個個人作業就是實現一個符號完備的分數系統，那不妨我們也挪到這裡做做試試看好了。
```c++
typedef int TYPE;

template <TYPE x_, TYPE y_>
struct Pair {
  static const TYPE x = x_;
  static const TYPE y = y_;
};
```
我們使用int，或者long long，或者任何你想使用的整數數據類型來儲存分子和分母，為了方便更改這裡就開始就用了個別名。
```c++
template <TYPE x>
struct Abs {
  static const TYPE result = x > 0 ? x : -x;
};


template <TYPE x, TYPE y>
struct GCD {
  static const TYPE result = GCD<y, x % y>::result;
};

template <TYPE x>
struct GCD<x, 0> {
  static const TYPE result = x;
};

template <TYPE x_, TYPE y_>
struct Fraction {
  static const TYPE gcd = GCD<Abs<x_>::result, Abs<y_>::result>::result;
  //   x_  y_  x  y
  //   +   +   +  +
  //   +   -   -  +
  //   -   +   -  +
  //   -   -   +  +
  static const TYPE sign = y_ < 0 ? -1 : 1;
  static const TYPE x = sign * x_ / gcd;
  static const TYPE y = Abs<y_>::result / gcd;
};

```
然後是為了能夠化簡的最大公因數的計算（GCD），以及這裡把符號留在分子上。
```c++
template <typename f1, typename f2>
struct Addition {
  typedef Fraction<f1::x * f2::y + f1::y * f2::x, f1::y * f2::y> result;
};

template <typename f1, typename f2>
struct Subtraction {
  typedef Fraction<f1::x * f2::y - f2::x * f1::y, f1::y * f2::y> result;
};
```
然後後面的就比較簡單了，加法減法乘法除法都可以隨手寫了。
```c++
template <typename fraction>
std::string FractionToString() {
  return "( " + std::to_string(fraction::x) + " / " + std::to_string(fraction::y) +
         " )";
};
```
順路可以實現一個方便打印的函數。

### 實現一個列表

接下來可以稍微處理一些複雜的東西，比如列表。

```c++
typedef int TYPE;

template <TYPE x>
struct Type {
  static const TYPE value = x;
};

struct NIL {
  typedef NIL Head;
  typedef NIL Tail;
};

template <typename H, typename T = NIL>
struct List {
  typedef H Head;
  typedef T Tail;
};
```
簡單的來說，我們用Type進行一次轉換，就可以把一個基礎數據類型的值變成一個類型，然後就可以列表層層嵌套，這個時候如果要實例化這個列表，會比較像這個樣子`typedef List<Type<3>> l3;typedef List<Type<2>, l3> l2;`。

然後來實現一些基本的操作吧：
```c++
// Length
template <typename list>
struct Length {
  static const size_t result = 1 + Length<typename list::Tail>::result;
};

template <>
struct Length<NIL> {
  static const size_t result = 0;
};
```
比如獲取列表的長度，插入，刪除指定位置的元素，等等，當然也包括打印。

```c++
// ListToString
template <typename list>
std::string ListToString() {
  return "(" + std::to_string(list::Head::value) + ", " +
         ListToString<typename list::Tail>() + ")";
};

template <>
std::string ListToString<NIL>() {
  return std::string("NIL");
};
```

唔，然後是兩個相對複雜的操作。
```c++
// CreateList
template <TYPE... lists>
struct CreateList {
  template <typename head, typename... tail>
  struct __CreateList {
    typedef List<head, typename __CreateList<tail...>::result> result;
  };

  template <typename head>
  struct __CreateList<head> {
    typedef List<head> result;
  };

  typedef typename __CreateList<Type<lists>...>::result result;
};
```
我們不妨簡化一下創建列表的步驟，現在我們就可以直接`typedef CreateList<1, 2, 3>::result l2;`這麼創建一個列表了。
```c++
// Slice [begin, end)
template <typename list, size_t begin, size_t end>
struct Slice {
  template <size_t x>
  struct Type {
    static const TYPE value = x;
  };

  template <typename __list, typename __begin, typename __end>
  struct __Slice {
    typedef typename __Slice<
        typename RemoveItemAt<__list, Length<__list>::result - 1>::result,
        __begin, __end>::result result;
  };

  template <typename __list, typename __begin>
  struct __Slice<__list, __begin, Type<(Length<__list>::result)>> {
    typedef typename __Slice<typename __list::Tail, Type<__begin::value - 1>,
                             Type<(Length<__list>::result - 1)>>::result result;
  };

  template <typename __list>
  struct __Slice<__list, Type<0>, Type<(Length<__list>::result)>> {
    typedef __list result;
  };

  typedef typename __Slice<
      list, Type<begin >= 0 ? begin : 0>,
      Type<end <= Length<list>::result ? end : Length<list>::result>>::result
      result;
};
```
然後我們可以實現一個切片，不過感覺就會有點繁雜。

## 效率比较

唔，這裡的話簡單的比較一下就好，比如傳統的寫法可能是：
```c++
#include <iostream> // for std::cout 
#include "cpp.tmp.hpp"  // for kLOOP_TIMES

int fatorial(int n) { return n == 0 ? 1 : n * fatorial(n - 1); }

int main() {
  for (int i = 0; i < kLOOP_TIMES; i++) {
    fatorial(10);
  }

  return 0;
}
```

雖然比較不一定準確，但是也對比了虛函數調用、循環可能被優化等等幾項，大概的結果是
```bash
# "factorial"
time ././bin/factorial.out
0.48user 0.01system 0:00.50elapsed 99%CPU (0avgtext+0avgdata 1456maxresident)k
0inputs+0outputs (0major+415minor)pagefaults 0swaps
# "factorial with template meta programming"
time ././bin/factorial.tmp.out
0.03user 0.00system 0:00.02elapsed 106%CPU (0avgtext+0avgdata 1452maxresident)k
0inputs+0outputs (0major+413minor)pagefaults 0swaps
# "vector"
time ././bin/vector.out
4.59user 0.01system 0:04.59elapsed 100%CPU (0avgtext+0avgdata 1464maxresident)k
0inputs+0outputs (0major+417minor)pagefaults 0swaps
# "vector with template meta programming"
time ././bin/vector.tmp.out
4.54user 0.00system 0:04.57elapsed 99%CPU (0avgtext+0avgdata 1460maxresident)k
0inputs+0outputs (0major+416minor)pagefaults 0swaps
# "polymorphic"
time ././bin/polymorphic.out
0.25user 0.01system 0:00.26elapsed 101%CPU (0avgtext+0avgdata 1452maxresident)k
0inputs+0outputs (0major+415minor)pagefaults 0swaps
# "polymorphic with template meta programming"
time ././bin/polymorphic.tmp.out
0.18user 0.00system 0:00.19elapsed 94%CPU (0avgtext+0avgdata 1452maxresident)k
0inputs+0outputs (0major+414minor)pagefaults 0swaps
# make all compare finished
```
具體的代碼可以參考下面的參考的說。

## 參考

只貼[一個](https://github.com/oYOvOYo/Cplusplus.TemplateMetaProgramming)好了，是上面提及的全部的代碼都在的倉庫，如果需要參考的話可以點開看看。
