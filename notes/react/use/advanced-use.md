# React 高级特性
- 函数组件
- 非受控组件
- Portals
- context
- 异步组件
- 性能优化（通用，且重要的内容）
- 高阶组件 HOC
- Render Props

## 函数组件
- 纯函数，输入 props，输出 JSX
- 没有实例，没有生命周期（可以使用 [Effect Hook](https://zh-hans.reactjs.org/docs/hooks-effect.html) 实现一些生命周期函数独特的功能），没有 state
- 不能扩展其他方法
```javascript
// class 组件
class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { list } = this.props

    return (
      <ul>
        {list.map((item, index) => {
          return <li key={item.id}>
            <span>{item.title}</span>
          </li>
        })}
      </ul>
    )
  }
}

// 函数组件
function List(props) {
  const { list } = this.props
  return (
    <ul>
      {list.map((item, index) => {
        return <li key={item.id}>
          <span>{item.title}</span>
        </li>
      })}
    </ul>
  )
}
```

## 非受控组件
对应[受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)  
关注点：
- ref
- defaultValue defaultChecked (非受控组件的 state 通常只是表达一个默认值)
- 手动操作 DOM 元素

### 概念
通常会将组件的数据和state进行绑定，输入操作会改变state。而非受控组件切断了这样的联系，输入和state没有关联关系，一般常见例如：`<input defaultValue="this.state.name" ref={this.nameInputRef} />`这样使用 state 只用来设定默认值。

### 使用场景
- 必须手动操作 DOM 元素，setState 实现不了
- 文件上传 `<input type="file" />`
- 某些富文本编辑器，需要传入 DOM 元素

### 使用原则
- 优先使用受控组件，符合 React 设计原则
- 必须操作 DOM 时，再使用非受控组件

### ref
回顾 Vue 中，对`ref`的使用是直接在dom节点上使用`ref="xxx"`这样的方式来定义，之后在vue中使用`this.$refs.xxx`来获取定义的ref。与 React 的不同在于，ref 在 Vue 中，被定义成一个字符串，而 React 是一个对象，需要提前在组件构造函数中使用`React.createRef()`，例如在构造中声明 `this.nameInputRef = React.createRef()` ，在需要的地方调用`this.nameInputRef.current`来通过 ref 获取 DOM 节点。


## Portals
中文翻译：传送门  
关注点：一般情况下，组件默认会按照既定层次嵌套渲染。如何让组件渲染到父组件以外？  
### 用法
```javascript
import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
/***
 * ..........
 * **/
  render() {
    // 通常这里返回一个 JSX
    /****
     * ...........
     * **/
    // Portals 应用 ↓
    return ReactDOM.createProtal(
      <div className="modal">{this.props.children}</div>,
      document.body
    )
  }
}

export default App
```
### 应用场景
- 父组件设置了 overflow:hidden，子组件需要跳出限制
- 父组件 z-index 层级太低
- fixed 需要放在 body 第一层级

## [context](https://zh-hans.reactjs.org/docs/context.html) (上下文)
概念：需要将公共信息（语言，主题）传递给每个组件，此时使用 props 太繁琐，用 redux 小题大做。  
### 用法
```javascript
import React from 'react'
// 1. 核心 API ，用于创建上下文
const ThemeContext = React.createContext('light')

// 
```