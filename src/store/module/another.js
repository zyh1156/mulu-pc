export default {
    state: {
        // 标记滚动刷新
        loadmore: false,
        // 标记清单刷新
        newbill: false,
        //标记物料书
        bookdetail: {},
        //共享一级分类
        categoryList: []
    },
    mutations: {
        reload(state, value) {
            state.loadmore = value
        },
        rebill(state, value) {
            state.newbill = value
        },
        changeBook(state, value) {
            state.bookdetail = value
        },
        changeCategory(state, value) {
            state.categoryList = value
        }
    }
}