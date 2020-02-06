import axios from "axios";
import { Notification } from "element-ui";
const baseURL = window.SYSTEM_CONFIG.webServer; //基础服务地址
export default class Ajax {
    /**
     * @param { String } baseURL        基础请求地址
     * @param { String } Token   通行凭证token
     * @param { Number } TIMEOUT        超时时间
     */
    constructor(Token = "", TIMEOUT = 60000) {
        // 创建一个新的axios实例，并设置默认请求地址和请求头
        this._axios = axios.create({
            // baseURL,
            TIMEOUT,
            headers: { code: '' }
        });
        this._axios.interceptors.request.use(
            config => {
                return config;
            },
            error => {
                Notification({
                    title: "网络请求失败",
                    message: "请检查网络请求是否配置正确",
                    type: "error",
                    showClose: false
                });
                return Promise.reject(error);
            }
        );
        this._axios.interceptors.response.use(
            response => {
                if (response.data) {
                    return response.data
                } else {
                    Notification({
                        title: "网络请求失败",
                        message: "请检查网络请求是否配置正确",
                        type: "error",
                        showClose: false
                    });
                    return response;
                }
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
    // 请求方式优化
    get(url, params = {}) {
        return this._axios({ method: "get", url, params });
    }
    patch(url, params = {}) {
        return this._axios({ method: "patch", url, params });
    }
    post(url, data = {}, params = {}) {
        return this._axios({
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            url,
            data,
            params
        });
    }
    put(url, data = {}, params = {}) {
        return this._axios({
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            url,
            data,
            params
        });
    }
}