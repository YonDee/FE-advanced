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
  computed: {
    finished: function() {
      return this.$store.state.history
    }
  },
  beforeCreate() {
    console.log(this.$store.state.history)
  }
}
</script>
