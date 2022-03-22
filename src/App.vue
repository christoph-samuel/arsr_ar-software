<template>
  <div id="app">
    <router-view />
<!--    <QR/>-->
  </div>
</template>

<script>
//import Scene from './components/Scene.vue'
// import QR from '@/components/QR'

export default {
  name: 'App',
  components: {
    //Scene,
    // QR
  },
}
</script>

<style>
#app {
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>
