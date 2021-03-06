// 触发更新视图
function updateView() {
  console.log('视图更新')
}


// 重新定义数组原型
const oldArrayProperty = Array.prototype
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () {
    oldArrayProperty[methodName].call(this, ...arguments)
    //  Array.prototype.push.call(this, ...arguments)
    updateView()
  }
})



// 重新定义属性，监听起来 - 使用 Object.defineProperty
function defineReactive(target, key, value) {
  observer(value) // 对监听对象进行递归 从而实现深度监听
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue) // 对修改的值进行深度监听
        // 设置新的值; value 一直在闭包中，此处设置完之后， 再 get 时也是回获取最新的值
        value = newValue
        // 监听到改变触发更新
        updateView()
      }
    }
  })
}

// 监听对象属性
function observer(target) {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 这里修改数组的原型使用自定义原型，如果直接在原数组原型上实现监听会污染全局
  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

// 测试数据
// 简单数据，没有更深层的对象
// const data = {
//   name: 'zhangsan',
//   age: 20
// }
// 复杂数据，具有深层次对象
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: 'Nanjing'
  },
  nums: [10, 20, 30]
}

// 监听测试数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// console.log('age', data.age)
// data.x = '100'  // 新增属性监听不到，vue 用 Vue.set 进行操作
// delete data.name // 删除属性，监听不到，vue 用 Vue.delete 进行操作

// 深度监听测试
// data.info.address = 'Shanghai' // 这里会 get 一次
// data.age = {number: 21}
// console.log('age', data.age)
data.nums.push(40)


