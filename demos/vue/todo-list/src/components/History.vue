<template>
  <div>
    <h4>History：</h4>
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
    event.$on('finish', (finished) => {
      console.log(finished)
      this.finished = finished
    })
  }
}
</script>
