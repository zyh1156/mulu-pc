export default {
    state: {
        authList: [],
        authType: ""
    },
    mutations: {
        setAuthlist(state, value) {
            state.authList = value;
        },
        setAuthType(state, value) {
            state.authType = value;
        }
    },
    getters: {
        getAuth: state => code => {
            let arr = state.authList,
                flag = false;
            // 基础权限匹配
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].authorityId == code) {
                    flag = true;
                    break;
                }
            }
            // 区分普通用户
            if (state.authType == 'USER' && (code == 11 || code == 15 || code == 4)) {
                flag = false
            }
            if (code == 94) {
                flag = true
            }
            return flag
        }
    }
}