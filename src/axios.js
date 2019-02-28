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
          switch (error.response.status) {
            case 502:
              message.error(jsonLang.http_err.err502, 5);
              break;
            case 404:
              message.error(jsonLang.http_err.err404, 5);
              break;
            default:
              switch (error.response.data && error.response.data.code) {
                // 服务内部错误
                case 100:
                  message.error(jsonLang.http_err.err100, 5);
                  break;
                // 鉴权失败
                case 101:
                  // 身份异常，清理本机数据，跳转登陆页面
                  LocalStorage.clearValue(['token', 'lang']);
                  message.error(jsonLang.http_err.err101, 5, window.location.replace('/'));
                  break;
                // 其他未定义错误
                default:
                  message.error(jsonLang.http_err.err182, 5);
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
