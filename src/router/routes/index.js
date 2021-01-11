// 首页
import index from '@/views/index.vue'
// 懒加载
import reurl from './reurl'
// 转发
import zerus from './zerus'
// 用户中心
import user from "./user"
export default [{
        path: '/',
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

    },
    {
        path: '/material',
        name: 'material',
        component: reurl('material/index')
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
        path: "/company",
        component: zerus,
        children: [{
            path: "",
            redirect: "/about",
        }, {
            path: ":companyid",
            component: reurl("company/index"),
            name: "company"
        }]
    }, {
        path: '/about',
        component: reurl('pages/about'),
        name: 'about'
    }, {

        ...user
    }
]