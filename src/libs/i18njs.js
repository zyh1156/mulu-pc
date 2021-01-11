import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vueCookies from 'vue-cookies'
import messages from './i18njs/index'
Vue.use(VueI18n)
export default new VueI18n({
    locale: vueCookies.get('lang') || 'zh-CN',
    messages: messages
})