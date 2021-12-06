require('aframe')
require('ar.js')
import Vue from 'vue'
import App from './App.vue'
import options from '@/config'
import '@/main.css'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'a-scene',
    'a-entity',
    'a-camera',
    'a-plane',
    'a-marker',
    'a-assets',
    'a-asset-item',
    'a-gltf-model'
]

new Vue({
    ...options(Vue),
    render: h => h(App),
}).$mount('#app')
