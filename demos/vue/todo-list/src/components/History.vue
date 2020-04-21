<template>
  <div>
    <ul>
      <li v-for="(item, index) in finished" :key="`finish-${index}`">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import event from './event'
export default {
  data() {
    return {
      finished: []
    }
  },
  mounted() {
    event.$on('finish', finished => {
      // 这里不用箭头函数的话，this 会指向 event
      this.finished = finished
    })
  }
}
</script>
