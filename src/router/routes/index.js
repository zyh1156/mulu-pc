// 首页
import index from '@/views/index.vue'
// 懒加载
import reurl from './reurl'
// 转发
import zerus from './zerus'
// 用户中心
import user from "./user"
// 商家店铺
import company from './company'
// 登陆注册
import login from './login'
export default [{
        path: '/',
        name: "index",
        component: index
    },
    {
        path: '/case',
        name: 'case',
        component: reurl('case/index')

    },
    {
        path: '/demand',
        name: 'demand',
        component: reurl('demand/index')

    }, {
        path: "/product",
        component: zerus,
        children: [{
            path: "",
            component: reurl("product/index"),
            name: 'product',
        }, {
            path: ":materid",
            component: reurl("product/materiel"),
            name: 'materiel'
        }]
    }, {
        path: '/about',
        component: reurl('pages/about'),
        name: 'about'
    }, {
        ...user
    }, {
        ...company
    }, {
        ...login
    },
]