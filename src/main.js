import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 懒加载方案
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    throttleWait: 500,
    error: require('./assets/images/mulook.png'),
    loading: require('./assets/images/mulook.png')
})

// UI框架
import ElementUI from 'element-ui';
import './assets/css/my-theme.scss';
Vue.use(ElementUI);

// 基础样式
import './assets/css/bootstrap-reboot.scss'
import './assets/css/style.scss'

// Ajax请求方案
import axios from './libs/sendRequest'
Vue.prototype.axios = axios;

// cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('3d')

//i18n
import i18n from './libs/i18njs'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')