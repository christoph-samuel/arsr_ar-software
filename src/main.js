require('aframe')
require('@ar-js-org/ar.js')
require('html5-qrcode')
require('arrive')
import Vue from 'vue'
import App from './App.vue'
import options from '@/config'
import '@/main.css'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'a-scene',
    'a-entity',
    'a-camera',
    'a-marker',
    'a-box',
    'a-gltf-model'
]

new Vue({
    ...options(Vue),
    render: h => h(App),
}).$mount('#app')
