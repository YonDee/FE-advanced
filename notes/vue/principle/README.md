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

## [Vue 响应式](https://cn.vuejs.org/v2/guide/reactivity.html)
- **组件 data 的数据一旦变化，立刻触发视图的更新**
- 实现**数据驱动视图**(vue 和 react 的特点)的第一步
- 考察 Vue 原理的第一题（一般开始深入原理时初步范围会考察）  
**和平时开发密切相关的原理**  
- **核心 API - Object.defineProperty**
- 如何实现响应式
- Object.defineProperty 的一些缺点（Vue3.0 启用 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) - 兼容性不太好，且无法 [polyfill](https://developer.mozilla.org/zh-CN/docs/Glossary/Polyfill) - 一个兼容性的概念）  
Object.defineProperty 基本用法：  
```javascript
const data = {}
const name = 'zhangsan'
Object.defineProperty(data, "name", {
  get: function () {
    console.log('get')
    return name
  },
  set: function (newVal) {
    console.log('set') 
    name = newVal
  }
})

console.log(data.name)
data.name = 'lisi'
console.log(data.name)
```
output:  
![](images/2020-04-26-16-30-36.png)
> 将赋值(set)和获取(get)变成一个函数，这样便于做监听

### Objcet.defineProperty 实现响应式
- 监听对象，监听数组
- 复杂对象，深度监听
- 几个缺点  

手动实现监听：[observer](../../../demos/observer)  

#### 缺点
- 深度监听，需要递归到底，一次性（对象层级过深 - 递归性能消耗非常大甚至卡死）计算量大 (vue3.0 对深度监听进行了优化)
- 无法监听新增/删除属性（Vue.set / Vue.delete）
- 无法原生监听数组，需要[特殊处理](https://github.com/YonDee/FE-advanced/commit/9d77af68a04f4870ff4af3660665e5886149b748)（修改原型方法的触发方式，但是注意不要污染原型）

## 虚拟 DOM （Virtual DOM） 和 diff
- vdom 是实现 vue 和 React 的重要基石
- diff 算法是 vdom 中最核心、嘴关键的部分
- vdom 是一个热门话题，也是面试中的热门问题

- DOM 操作非常消耗性能
- 以前用 jQuery，可以自行空值 DOM 操作的时机，手动调整（以 JQ 和 JS 操作 DOM 为点来进行优化）
- Vue 和 React 是数据驱动视图， 如何有效控制 DOM 操作？

### 解决方案 - vdom
面临的问题
- 有了一定复杂度，想减少计算次数比较难
- 把计算转为JS计算，因为JS计算执行速度更快
- **vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM**  
DOM：
```html
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```
Virtual DOM:
```javascript
{
  tag: 'div',
  props: {
    className: 'container',
    id: 'div1'
  },
  children: [
    {
      tag: 'p',
      children: 'vdom'
    },
    {
      tag: 'ul',
      props: { style: 'font-size: 20px' },
      children: [
        {
          tag: 'li',
          children: 'a'
        }
        // ...
      ]
    }
  ]
}
```

### [snabbdom](https://github.com/snabbdom/snabbdom)
- 简洁强大的 vdom 库，易学易用
- Vue 参考它实现的 vdom 和 diff
- Vue 3.0 重写了 vdom 的代码，优化了性能
- 但 vdom 的基本理念不变，面试考点也不变
- React vdom 具体实现和 Vue 也不同，但不妨碍统一学习