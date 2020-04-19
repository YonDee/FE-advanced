<template>
<div>
  <!-- 正确的写法 -->
  <input @input="inputChange()" v-model="inputContent" placeholder="What to plan to do?" />
  <button @click="submit()">submit</button>
  <ul>
    <li v-for="(item, index) in contentsList" :key="`contnet-${index}`">
      <!-- 错误的写法：click 不能同步获取到 data -->
      <!-- <input type="checkbox" @click="checkboxClick(item)" :value="item" v-model="checkedArr" /> {{ item }} -->
      <input type="checkbox" @change="checkboxClick(item)" :value="item" v-model="checkedArr" /> {{ item }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      inputContent: '',
      contentsList: [],
      checkedArr: []
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
    checkboxClick(value) {
      console.log(`checked value: ${value}`)
      console.log(this.checkedArr)
    },
    submit() {
      this.inputContent && this.contentsList.push(this.inputContent)
    }
  }
}
</script>

<style scoped>
</style>
