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
        children: [{
            path: "",
            component: reurl("company/home"),
            name: "company",
        }, {
            path: "brief",
            component: reurl("company/brief"),
            name: "cbrief"

        }, {
            path: "case",
            component: zerus,
            children: [{
                path: "",
                component: reurl("company/case"),
                name: "ccase"
            }, {
                path: ":caseid",
                component: reurl("company/case-detail"),
                name: "ccasedetail"
            }]

        }, {
            path: "data",
            component: reurl("company/data"),
            name: "cdata"

        }]
    }]
}