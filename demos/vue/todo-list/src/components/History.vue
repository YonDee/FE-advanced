<template>
  <div>
    <h4>History：</h4>
    <ul>
      <li v-for="(item, index) in finished" :key="`finish-${index}`">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finished: []
    }
  },
  created() {
    console.log('before component create')
    this.$bus.$on('finish', (finished) => {
      console.log('do on')
      this.finished = finished
    })
  },
  mounted() {
    console.log(this.finished)
  },
  beforeDestroy() {
    this.$bus.$off('finish')
  },
}
</script>
