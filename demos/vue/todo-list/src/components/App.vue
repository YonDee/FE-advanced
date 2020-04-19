<template>
<div>
  <!-- 错误的写法，这样不会捕获到 value -->
  <!-- <input @onchange="inputChange()" placeholder="What to plan to do?" /> -->
  <!-- 正确的写法 -->
  <input @input="inputChange()" v-model="inputContent" placeholder="What to plan to do?" />
  <button @click="submit()">submit</button>
  <ul>
    <li v-for="(item, index) in contentsList" :key="`contnet-${index}`">
      {{ item }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      inputContent: '',
      contentsList: []
    }
  },
  beforeCreate() {
    console.log('before create log')
  },
  created() {
    console.log('created log')
  },
  beforeMount() {
    console.log('before mount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('before update log')
  },
  updated() {
    console.log('updated log')
  },
  beforeDestroy() {
    console.log('before destroy log')
  },
  destroyed() {
    console.log(' destroyed log')
  },
  methods: {
    inputChange() {
      console.log('input change')
    },
    submit() {
      console.log('added to do')
      this.contentsList.push(this.inputContent)
    }
  }
}
</script>

<style scoped>
</style>
