import React, { Component } from 'react';
import axios from 'axios';
import { jsonLang } from './lang'
import { LocalStorage } from 'yf-jstools'
import { message } from 'antd';

// react 高阶组件，封装 axios 拦截器
export default (WrappedComponent) => {
  return class extends Component {
    componentWillMount() {
      // 超时时间(30秒超时)
      axios.defaults.timeout = 30000;
      // interceptors 拦截器
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response.status === 502) {
            message.error(jsonLang.http_err.err502);
          } else {
            switch (error.response.data && error.response.data.code) {
              // 服务内部错误
              case 100:
                message.error(jsonLang.http_err.err100);
                break;
              // 鉴权失败
              case 101:
                // 身份异常，清理本机数据，跳转登陆页面
                LocalStorage.clearNMS();
                message.error(jsonLang.http_err.err101, 3, window.location.replace('/'));
                break;
              // 其他未定义错误
              default:
                message.error(jsonLang.http_err.err182);
            }
          }
          return Promise.reject(error);
        }
      );
    }
    render() {
      return (
        <div>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}
