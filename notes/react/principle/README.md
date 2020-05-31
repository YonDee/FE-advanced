# React 原理
要点：
- 函数式编程
- vdom 和 diff
- JSX 本质
- 合成事件
- setState batchUpdate
- 组件渲染过程

## 函数式编程
- 一种编程范式，概念比较多
- 纯函数
- **不可变值**

> 这个概念很好理解，函数也是一等公民，这和其他数据类型一样，我们可以把它放在数组中，放在对象中，当作参数传递，赋值给变量等等。那么，函数式编程就意味着，我们可以用函数去拆解、抽象一般的表达式，最小‘可视’单位是函数的一种编码规范，重点体现‘函数式’。  
> 给予函数更清晰的语义化命名，将一系列对于基础数值的计算和操作放在函数中，并且由函数返回这个计算的结果，这个结果的由函数命名清晰的表达。
> 纯函数是函数式编程的一个概念。

## vdom 和 diff
- h 函数（React.createElement()）
- vnode 数据结构(React.createElement() 返回值)
- patch 函数
---
- 只比较同一级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较
---
- Vue2 Vue3 React 三者实现 vdom 细节都不同
- 核心概念和实现思路，都一样

## JSX
- JSX 使用时的定位很像 Vue 模板
- Vue 模板不是 html
- JSX 也不是 JS，是 JS 的语法扩展  

JSX 会被自动转义成 JS 代码以及 React API。要重点关注`React.createElement()`这个方法，每当JSX有新的标签结构时，就会调用这个方法。
```javascript
const imgElem = <div id="div1">
  <p>some text</p>
  <img src="imgUrl">
</div>

// babel 编译后
React.createElement("div", {id: "div1"}, React.createElement("p", null, "some text"), React.createElement("img", {src: imgUrl}))
```
上面可以看出来，`React.createElement()` 第一个参数是tag的名称，第二个是tag中的参数（例如：style, id, class, 事件 等等），第三个是子元素，子元素也可以这样嵌套（调用 createElement 创建）子元素（套娃就完事了）。  
> 但实际上 `createElement` 第一个参数不一定是 tag 名称，也可能是一个组件的变量名。子元素也可以是组件这样套下去。（从`createElement`第一个参数的首字母大小写，可以知道是 tag 还是组件）

更多可以参考 Babel 提供的在线示例，写入 JSX 之后 Babel 所编译的内容。[测试地址](https://www.babeljs.cn/)


