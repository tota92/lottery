import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/mtaxios'
import './apis/apis'
import "reset-css"
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui'
Vue.use(elementUI)
Vue.config.productionTip = false
router.beforeEach((to,form,next)=>{
  if(to.path ==='/login'){
    next()
  }else{
    var token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      next({path:'/login',query:{redirect:to.path}})
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
