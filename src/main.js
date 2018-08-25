// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
/*  import VueUEditor from 'vue-ueditor'  */ 
// import './components/changeTheme/theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/comindex.css';
import './assets/css/common.scss'
import './theme/theme-color.scss'
import "babel-polyfill"
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
/*  Vue.use(VueUEditor)  */
/* eslint-disable no-new */

router.beforeEach((to, from, next ) => {
  if(to.path == '/Login') {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('sesstion')
  }
  let user = JSON.stringify(sessionStorage.getItem('user'))
  console.log(user == 'null')
  if(user == 'null' && to.path != '/Login') {
    next({path: '/Login'})
  } else {
    next()
  }
})
window.app =  new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


