<template>
  <div id="app">

    <back-header/>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: auto;
  color: #2c3e50;
  margin-top: 60px auto auto auto;
  line-height: 40px;
  font-size:18px;
}
/*Fade*/
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-emter-active, .fade-leave-active{
  transition: opacity 0.5s;
}
.fade-enter-to{
  opacity: 1;
}
</style>
