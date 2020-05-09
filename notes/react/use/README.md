# React 基本使用
- JSX 基本使用
- 条件
- 列表
- 事件
- 表单
- 组件和 props
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
1. React 的 event 是 [SyntheticEvent](https://zh-hans.reactjs.org/docs/events.html)（从 event 的 `__proto__.constructor` 知悉），模拟出来 DOM 事件所有能力，官方称之为**合成事件**，
2. `evnet.nativeEvent` 是原生事件对象
3. 所有的事件，都被挂载到 document 上
4. 和 DOM 事件不一样，和 Vue 事件（原生的）也不一样
React 中传递的 event 不是原生的 event，是 React 封装的 SyntheticEvent（React event 的构造函数），我们可以在 React 封装的 event 中从 `nativeEvent` 来访问原生 event。  
在 vue 中触发事件的地方是标签，事件绑定的地方也是标签。React 不同的地方在于，事件绑定被挂载到 document 上。

## 表单
要点：
- 受控组件
- 类似的双向绑定实现

## 组件使用
要点：
- props 传递数据
- props 传递函数
- props 类型检查

## setState
要点：
- *不可变值
- 可能是异步更新
- 可能会被合并
### 不可变值
在 setState 中更改数据，不可以修改原本的 state。这个 data 可以是原来 state 的一个副本，但是不可以是这个 state 本身
```javascript
const list5Copy = this.state.list5.slice()
list5Copy.splice(2, 0, 'a')
this.setState({
  list1: this.state.list1.concat(100), // 追加
  list2: [...this.state.list2, 100], // 追加
  list3: this.state.lisst3.slice(0, 3), // 截取
  list4: this.state.list4.fliter(item => item > 300), // 筛选
  list5: list5Copy // 其他（复杂）操作
})
```
不可以直接对 `this.state.list` 进行 `push`, `pop`, `splice` 等，这样违反不可变原则，不可变值得思想和纯函数的思路一致  
除了数组，对象也不可以直接修改
### state 异步
在`setState`结束后，如果直接获取相关 state，可能会取不到新值。因为异步的关系，如果想要同步拿到数据，我们需要使用`setState()`的第二个参数设置回调函数。
```javascript
this.setState({
  count: this.state.count + 1
}, () => {
  // 联想 vue 的 $nextTick
  console.log('count by callback', this.state.count)
})

console.log('count', this.state.count) // 这样因为 setState 是异步的，拿不到最新值
```
但是
```javascript
// setTimeout 中 setState 是同步的
setTimeout(() => {
  this.setState({
    count: this.state.count + 1
  })
  console.log('count in setTimeout', this.state.count)
}, 0)
```
```javascript
// 自定义的 DOM 事件，setState 是同步的
bodyClickHandler = () => {
  this.setState({
    count: this.state.count + 1
  })
  console.log('count in body event', this.state.count)
}
componentDidmount() {
  document.body.addEventListener('click', this.bodyClickHandler)
}
componentWillUnmount() {
  document.body.removeEventListener('click', this.bodyClickHandler)
}
```
> `setState` 直接使用的时候是异步的，但是在`setTimeout`和自定义事件中使用`setState`，是同步的

### setState 合并 state
```javascript
// 传入对象，会被合并。执行结果只一次 +1 (类似 Object.assign)
this.setState({
  count: this.state.count + 1
})

this.setState({
  count: this.state.count + 1
})

this.setState({
  count: this.state.count + 1
})
// 传入函数，不会被合并
this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})
this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})
this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})
```

## React 生命周期
[一图流](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
> 父子组件生命周期，和 Vue 的一样
