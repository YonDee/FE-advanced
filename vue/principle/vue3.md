# Vue 3 前瞻
可以参考的内容：
https://juejin.im/post/5e6388366fb9a07cda097c47  

- 全部用 ts 重写（响应式、vdom、模板编译等）
- 性能提升，代码量减少
- 会修改部分 API

## proxy 实现响应式
### Object.defineProperty 的缺点
- 深度监听需要一次性递归
- 无法监听新增属性/删除属性(Vue.set Vue.delete 代替实现)
- 无法原生监听数组，需要特殊处理

### Proxy 基本使用
```javascript
const data = {
  name: 'zhangsan',
  age: 20
}

const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver)
    console.log('get: ', key)
    return result // 返回结果
  },
  set(target, key, val, receiver) {
    const result = Reflect.set(target, key, val, receiver)
    console.log('set', key, val)
    return result // 是否设置成功
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    console.log('delete property', key)
    return result // 是否删除成功
  }
})
```
`Reflect`是一个内置的对象，它提供拦截 JavaScript 操作的方法、这些方法与 proxy handler 的方法相同。（`Reflect`不是一个函数对象，因此它是不可构造的）
