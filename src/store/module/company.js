export default {
    state: {
        comdata: {

        },
        groupId: ""
    },
    mutations: {
        changeComdata(state, value) {
            state.comdata = value
        },
        setgroupId(state, value) {
            state.groupId = value;
        }
    }
}