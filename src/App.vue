<template>
  <div id="app">
    <header-nav></header-nav>
    <div class="main-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'app',
  components: { HeaderNav }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}

.main-view {
  padding: 0 5%;
}

p {
  word-wrap: break-word;
}
</style>
