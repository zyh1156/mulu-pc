// 懒加载
import reurl from './reurl'
// 转发
import zerus from './zerus'
export default {
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
}