/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Message } from 'element-ui'
import lang from '../lang'
import data from './localStorage'

// 超时时间(30秒超时)
axios.defaults.timeout = 30000;

// 拦截器
axios.interceptors.response.use(
  data => {
    return data
  },
  error => {
    if (error.response.status && error.response.status === 502) {
      Message.error(lang.http_err.err502)
    } else {
      switch (error.response.data && error.response.data.errno) {
        case 100:
          // 服务内部错误
          Message.error(lang.http_err.err100);
          break;
        case 101:
          // 鉴权失败
          // 身份异常，清理本机数据，跳转登陆页面
          data.clearNMS();
          window.location.replace('/');
          Message.error(lang.http_err.err101);
          break;
        default:
          Message.error(lang.http_err.err182)
      }
    }
    return Promise.reject(error.response)
  }
)

export default axios
