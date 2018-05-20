import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import '@/icons' // icon
import '@/permission' // 权限

Vue.use(ElementUI, { locale })
Vue.use(BaiduMap, {
  ak: '4oQ81nBUqK3R0uGCgwdTeAaiT5aMUex7'
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
