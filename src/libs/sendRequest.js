import axios from 'axios'
import qs from 'qs'
import {
    Message
} from 'element-ui';
import vueRouter from '../router/index'
import VueCookies from 'vue-cookies'
const instance = axios.create({
    baseURL: 'https://admin.mulook.com/app',
    timeout: 30 * 1000
});
let token = VueCookies.get('token');
let errorNum = 0;
if (token) {
    instance.defaults.headers.common["Authorization"] = token;
}
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.request.use(
    config => {
        // 转为formdata数据格式
        config.data = qs.stringify(config.data)
        return config
    },
    error => Promise.error(error)
)
instance.interceptors.response.use(function(response) {
    let data = response.data;
    // 请求成功时阈值归零
    errorNum = 0;
    if (data.code == 102 || data.code == 101) {
        Message.error({
            message: data.message
        })
        return Promise.reject(response);
    } else {
        return data;
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
        let data = error.response.data;
        let errmsg = data.message;
        if (data.code == 2012 || data.error) {
            // 提示并退出登录
            if (data.error) {
                errmsg = data.error;
            }
            //增加阈值，避免多次弹窗及反复跳转
            if (errorNum)
                return Promise.reject(error);
            errorNum++;
            Message.error({
                message: errmsg,
                onClose: () => {
                    VueCookies.remove('token');
                    vueRouter.push({
                        path: "/login"
                    })
                }
            });
        } else if (data.code == 4000 || data.code == 5000) {
            // 仅提示不退出登录
            Message.error({
                message: data.message
            })
            console.log(123);
        }
        return Promise.reject(error);
    } else {
        Message.error({
            message: error.toString()
        })
    }
});
export default instance