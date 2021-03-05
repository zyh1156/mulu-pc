// 懒加载
import reurl from './reurl'
export default {
    path: "/login",
    component: reurl('account/background'),
    children: [{
        path: "",
        component: reurl('account/login')
    }]
}