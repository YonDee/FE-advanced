<template>
  <div>
    <input @input="inputChange()" v-model="inputContent" placeholder="What to plan to do?" />
    <button @click="submit()">submit</button>
    <button @click="goToHistory()">history</button>
    <ul>
      <li v-for="(item, index) in contentsList" :key="`contnet-${index}`">
        <input type="checkbox" @change="checkboxClick(item)" :value="item" v-model="checkedArr" /> <span v-bind:class="{finished: checkedArr.indexOf(item) >= 0}"> {{ item }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
import event from './event'
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
      event.$emit('finish', this.checkedArr)
    },
    submit() {
      this.inputContent && this.contentsList.push(this.inputContent)
    },
    goToHistory() {
      console.log('go to history')
      console.log(this.$routes)
    }
  }
}
</script>

<style scoped>
.finished {
  text-decoration: line-through;
  color: #ccc;
}
</style>
