// 懒加载
import reurl from './reurl'
export default {
    path: "/login",
    component: reurl('account/background'),
    children: [{
        path: "",
        component: reurl('account/login'),
        meta: {
            title: "登录"
        },
        name: "login"
    }, {
        path: "forgot",
        component: reurl('account/forgot'),
        meta: {
            title: "忘记密码",
        },
        name: "forgot"
    }, {
        path: "register",
        component: reurl('account/register'),
        meta: {
            title: "注册",
        },
        name: "register"
    }]
}