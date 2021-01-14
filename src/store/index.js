import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'

import auth from './module/auth'

import company from './module/company'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        auth,
        company
    }
})