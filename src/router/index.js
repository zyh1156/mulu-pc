import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'link-active',
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }

})
router.beforeEach((to, from, next) => {
    next();
});
router.afterEach(to => {
    let meta = to.meta.title ? '-' + to.meta.title : '';
    document.title = '目鹿选材' + meta;
    window.scrollTo(0, 0)
})

export default router