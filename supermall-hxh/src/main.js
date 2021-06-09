import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue3-lazyload'

FastClick.attach(document.body)

createApp(App).use(router).use(store).use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
}).mount('#app')
