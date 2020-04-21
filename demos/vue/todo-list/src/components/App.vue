<template>
<div>
  <router-link to="/">Home</router-link>
  <router-link to="/history">History</router-link>
  <!-- see: https://router.vuejs.org/zh/api/#router-view -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>

<script>
export default {
}
</script>
