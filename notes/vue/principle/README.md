# Vue 原理
范围：
- 组件化
- 响应式
- vdom 和 diff
- 模板编译
- 渲染过程
- 前端路由

## 组件化基础
- “很久以前” 就有组件化
- 数据驱动视图（MVVM, setState）

### “很久以前”的组件化
- asp jsp php 已经有组件化了（include，require 等等方式载入视图或代码片段）
- nodejs 中也有类似的组件化

### 数据驱动视图
- 传统组件，只是静态渲染，更新还要依赖于操作 DOM
- 数据驱动视图 - Vue MVVM（vm是view mode的意思。所以mvvm框架是要有一个vm对象，来映射view。也就是vm对象的属性发生改变的时候，对应的视图部分会相对应更新。）
- 数据驱动视图 - React setState（没有纯粹意义上的vm对象，它有的是属性和状态。用属性和状态去映射视图。属性不可变，单向数据流）
> 什么是“数据驱动视图”，不自己操作DOM，修改只需要修改数据，框架根据数据重新渲染视图。这也是在前端基础的DOM操作中虽然我们要会，但是不常用的根本原因所在。数据驱动视图可以使Web应用具有更强大更复杂的功能，而不再让开发难度像操作DOM一样复杂困难。
> 注意 MVVM 代表的框架并不包含 React，参考：react是mvvm架构吗？ - 林志鹏的回答 - 知乎
https://www.zhihu.com/question/310674885/answer/585340871

### Vue MVVM
![](images/2020-04-15-16-19-13.png)
> Model 代表了 vue 的组件 data 或者是 vuex 数据。
MVVM:  
- M: Model
- V: View
- VM: ViewModel（负责视图和数据的连接和处理）