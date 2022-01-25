<template>
  <div id="app">
    <Scene/>
<!--    <QR/>-->
  </div>
</template>

<script>
import Scene from './components/Scene.vue'
// import QR from '@/components/QR'

export default {
  name: 'App',
  components: {
    Scene,
    // QR
  },
}
</script>

<style>
#app {
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
  width: 100%;
  height: 100%;
}
</style>
