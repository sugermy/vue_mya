import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Ajax from './plugins/ajax'
import './styles/reset.less'
import { Message } from 'element-ui';
Vue.prototype.$ajax = new Ajax()
//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  if (to.name === '/' || to.name === 'login') {
    localStorage.removeItem('code')
    next()
  } else {
    let code = localStorage.getItem('code')
    if (code) {
      let params = JSON.parse(code)
      let thisTimer = new Date().getTime()
      if ((thisTimer - params.timer) / 1000 > 600) {
        Message(
          {
            type: 'warning',
            message: '请重新登陆'
          }
        )
        localStorage.removeItem('code')
        next({ path: "/login" });
      } else {
        Vue.prototype.$ajax._axios.defaults.headers[params.key] = params.value
        delete Vue.prototype.$ajax._axios.defaults.headers.code
        next()
      }
    } else {
      next({ path: "/login" });
    }
  }
});

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
