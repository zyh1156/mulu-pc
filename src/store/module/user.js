export default {
    state: {
        avatar: '',
        userName: '目小鹿'
    },
    mutations: {
        changeUser(state, data) {
            state.avatar = data.avatar;
            state.userName = data.userName;
        },
        changeName(state, name) {
            state.userName = name
        }
    }
}