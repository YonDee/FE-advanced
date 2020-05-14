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
- defaultValue defaultChecked
- 手动操作 DOM 元素

### 概念
通常会将组件的数据和state进行绑定，输入操作会改变state。而非受控组件切断了这样的联系，输入和state没有关联关系，一般常见例如：`<input defaultValue="this.state.name" ref={this.nameInputRef} />`这样使用 state 只用来设定默认值。

### 使用场景
- 必须手动操作 DOM 元素，setState 实现不了
- 文件上传 `<input type="file" />`
- 某些富文本编辑器，需要传入 DOM 元素

### ref
回顾 Vue 中，对`ref`的使用是直接在dom节点上使用`ref="xxx"`这样的方式来定义，之后在vue中使用`this.$refs.xxx`来获取定义的ref。与 React 的不同在于，ref 在 Vue 中，被定义成一个字符串，而 React 是一个对象，需要提前在组件构造函数中使用`React.createRef()`，例如在构造中声明 `this.nameInputRef = React.createRef()` ，在需要的地方调用`this.nameInputRef.current`来通过 ref 获取 DOM 节点。

