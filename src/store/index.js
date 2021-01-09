import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'

import another from './module/another'

import auth from './module/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        another,
        auth
    }
})