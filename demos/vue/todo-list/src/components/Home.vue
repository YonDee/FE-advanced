<template>
  <div>
    <h4>Todo List :</h4>
    <input @input="inputChange()" v-model="inputContent" placeholder="What to plan to do?" />
    <button @click="submit()">submit</button>
    <button @click="showHistory()">history</button>
    <ul>
      <li v-for="(item, index) in contentsList" :key="`contnet-${index}`">
        <input type="checkbox" @change="checkboxClick(item)" :value="item" v-model="checkedArr" /> <span v-bind:class="{finished: checkedArr.indexOf(item) >= 0}"> {{ item }} </span>
      </li>
    </ul>
    <keep-alive>
      <History v-if="isShowHistory" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  components: {
    History: () => import("./History")
  },
  data() {
    return {
      inputContent: '',
      contentsList: [],
      isShowHistory: false,
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
    console.log(this.$store.state.history)
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
      // ues vuex
      this.$store.dispatch('setHistory', this.checkedArr)
    },
    submit() {
      this.inputContent && this.contentsList.push(this.inputContent)
    },
    showHistory() {
      // ues vuex
      this.$store.dispatch('setHistory', this.checkedArr)

      this.isShowHistory = !this.isShowHistory
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
