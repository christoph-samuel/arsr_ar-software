require('aframe')
require('ar.js')
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'a-scene',
    'a-entity',
    'a-camera',
    'a-box',
    'a-cylinder',
    'a-plane',
    'a-sky',
    'a-marker'
]

new Vue({
    render: h => h(App),
}).$mount('#app')
