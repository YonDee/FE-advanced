# React 基本使用
## JSX
要点
- 变量、表达式
- class style
- 子元素和组件  
### 变量和表达式
React 的插值方式不同于 Vue 的 `{{}}` 而是 `{}`，值得注意的是，无论动态属性、动态引用还是内容插值，都是使用`{}`，如`<p>{ this.state.flag ? 'yes' : 'no' }</p>`, `<img src={this.state.imgUrl}>`。  
### class & style
JSX 虽然看起来很像一个 HTML，但是需要注意在写 `class` 时要写成 `className`
```jsx
render(){
  const classElem = <p className="title">设置 css class</p>
  return classElem
}
```
> 如果需要className是动态的，那么只需要`className={this.state.title}`  

style 属性在 react 中需要传入一个表示 css 的对象
```jsx
render(){
  const styleData = { fontSize: '30px', color: 'blue' }
  const styleElem = <p style={styleData}></p>

  // or

  const styleElem = <p style={{ fontSize: '30px', color: 'blue' }}></p>

  return styleElem
}
```

### 原生 html
插入 html 片段
```jsx
render() {
  const rawHtml = '<span>富文本内容<i>斜体</i><b>加粗</b></span>'
  const rawHtmlData = {
    __html: rawHtml // 必须这么写
  }
  const rawHtmlElem = <div>
    <p dangerouslySetInnerHtml={ rawHtmlData }></p>
    <p>{rawHtml}</p>
  </div>
  return rawHtmlElem
}
```
这里直接使用 `rawHtml` 变量会直接输出字符串。
> 但是通常直接设置 HTML 存在风险，容易使用户暴露于 跨站脚本（XSS）的攻击。

### 条件判断
> 首先要抛去 Vue 中的 `v-if` `v-else` `v-show`这样的模板属性指令来帮助我们做逻辑判断  
```jsx
render() {
  const blackBtn = <button className="btn-clack">clack btn</button>
  const whiteBtn = <button className="btn-white">white btn</button>

  // if else
  if (this.state.theme === 'black') {
    return blackBtn
  } else {
    return whiteBtn
  }

  // 三元运算符
  return <div>
    { this.state.theme === 'black' ? blackBtn : whiteBtn }
  </div>

  // &&
  return <div>
    { this.state.theme === 'black' && blackBtn }
  </div>
}
```
很显然，条件判断直接像写js一样控制就好。

### 列表渲染
```js
class ListDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: 'id-1',
          title: '标题1',
        },
        {
          id: 'id-2',
          title: '标题2',
        },
        {
          id: 'id-3',
          title: '标题3',
        },
      ]
    }
  }
  render() {
    return <ul>
      {
        this.state.list.map((item, index) => {
          return <li key={item.id}>index {index}; title {item.title}</li>
        })
      }
    </ul>
  }
}
```
和 vue 自己有 `v-for` 指令不同，这里直接用 `{}` 写入表达式，并且要设置 JSX 返回值

## 事件
要点
- bind this
- 传递自定义参数
- event 参数  
### bind this
> JSX 中绑定事件时不可直接使用`onclick`而是用驼峰命名方式来使用`onClick`  
开发React应用时，经常会在`constructor`构造函数中使用`bind`来指定组件的自定义函数的`this`指向，默认情况下，在组件的自定义方法中直接调用`this`会指向`undefined`。除了在初始化时绑定，还有一种方式就是使用静态方法进行绑定，两种方式对比如下：
```jsx
// 这里最好在初始化时：this.clickHandler1 = this.clickHandler1.bind(this)
clickHandler1() {
  this.setState({
    name: 'lisi'
  })
}

// 静态方法，this 指向当前实例
clickHandler2 = () => {
  this.setState({
    name: 'lisi'
  })
}
```

### event
要点：
1. React 的 event 是 SyntheticEvent（从 event 的 `__proto__.constructor`），模拟出来 DOM 事件所有能力
2. `evnet.nativeEvent` 是原生事件对象
3. 所有的事件，都被挂载到 document 上
4. 和 DOM 事件不一样，和 Vue 事件（原生的）也不一样
React 中传递的 event 不是原生的 event，是 React 封装的 SyntheticEvent（React event 的构造函数），我们可以在 React 封装的 event 中从 `nativeEvent` 来访问原生 event。  
在 vue 中触发事件的地方是标签，事件绑定的地方也是标签。React 不同的地方在于，事件绑定被挂载到 document 上。