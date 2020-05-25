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
官方定义：Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。  
概念：需要将公共信息（语言-地区偏好，主题）传递给每个组件，此时使用 props 太繁琐，用 redux 小题大做。  
### 用法
```javascript
import React from 'react'

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('light')

// 底层组件 - 函数是组件
function ThemeLink (props) {
    // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

    // 函数式组件可以使用 Consumer
    return <ThemeContext.Consumer>
        { value => <p>link's theme is {value}</p> }
    </ThemeContext.Consumer>
}

// 底层组件 - class 组件
class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context // React 会往上找到最近的 theme Provider，然后使用它的值。
        return <div>
            <p>button's theme is {theme}</p>
        </div>
    }
}
ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
            <ThemeLink />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
    }
    render() {
        return <ThemeContext.Provider value={this.state.theme}>
            <Toolbar />
            <hr/>
            <button onClick={this.changeTheme}>change theme</button>
        </ThemeContext.Provider>
    }
    changeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light'
        })
    }
}

export default App
```
核心API：`const MyContext = React.createContext(defaultValue)`，更多具体参考文档的[Context API部分](https://zh-hans.reactjs.org/docs/context.html#api) 
> 例如上面示例中的 `ThemeContext.Provider` 就是在 `React.createContext` 创建了`ThemeContext`这个 Context 之后使用的API。很好理解  
> 关注点还是在 Context 的应用场景，Context 适合很少修改，主要从根节点（最外层定义的语言、地域，主题信息）下发数据的情形。

## 异步组件
> 在 vue 中，我们使用`import()`去加载组件来实现异步组件，实际上`import()`是ES的一个异步加载的标准语法。
  
React 不同于`import()`进行异步加载:
### 关键 API
- React.lazy()
- React.Suspense
```javascript
// 异步加载
const ContextDemo = React.lazy(() => import('./ContextDemo'))

// 使用异步加载并且设置默认显示
<React.Suspense fallback = { <div>Loading...</div> }>
  <ContextDemo />
</React.Suspense>
```

## 性能优化
性能优化对于 React **更加**重要  
要点：
- setState 的不可变值
- shouldComponentUpdate（简称 SCU）
- PureComponent 和 React.memo
- 不可变值 immutable.js

### SCU 基本用法
从概念上说这是性能优化一个非常重要的项目，但是并不代表一定要使用，有性能问题再考虑使用。
```javascript
shouldComponentUpdate(nextProps, nextState) {
  if (nextState.count !== this.state.count) {
    return true // 可以渲染
  }
  return false // 不重复渲染
}
```
在 react 中，没有优化时，**父组件的更新会触发子组件的更新**，`shouldComponentUpdate` 默认情况下返回 `true` 也就是触发渲染，反过来说我们可以利用`shouldComponentUpdate`（在函数中用条件）控制组件的渲染，从而提升性能。（如果违反不可变值规则，数据被提前更新，SCU 将不会按照预期渲染组件）

## PureComponent 和 memo
PureComponent ，SCU 中实现了浅比较（为了性能，但遵从不可变值，满足大多数情况，尽量不要做深度比较）
### PureComponent
概念：纯组件（取代前身 PureRenderMixin），可以减少不必要的 render 次数，从而提高性能。并且可以少写`shouldComponentUpdate`函数，节省了代码。
> 在一般的`React.Component`中，并没有实现`shouldComponentUpdate()`，而 `React.PureComponent` 中以浅层对比 prop 和 state 的方法来实现了该函数  
大多数情况下，如果需要优化性能，这是一个比较常用的API。尽量可以避免编写 SCU。
```javascript
class List extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {list} = this.porps

    return <ul>{
      list.map((item, index) => {
        return <li>
          <span>{item.title}</span>
        </li>
      })
    }</ul>
  }
  // 这个可以省略
  shouldComponentUpdate(){ /*浅层比较*/ }
}
```

### React.memo
概念：一个 React 提供的包装函数的 API，与 `React.PureComponent` 非常相似，但只适用于**函数组件**，而不适用于 **class** 组件
```javascript
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

## immutable.js
贯彻 **不可变值** 概念的不可变库。了解其存在即可，使用需要一定的学习。[项目地址](https://github.com/immutable-js/immutable-js)