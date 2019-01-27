import React, { Component } from 'react';
import axios from 'axios';
import { jsonLang } from './lang'
import { LocalStorage } from 'yf-jstools'
import { Alert } from 'antd';

// react 高阶组件，封装 axios 拦截器
export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errorElem: null
      }
    }
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
            this.setState({
              errorElem: (
                <Alert type="error" message={jsonLang.http_err.err502} showIcon />
              )
            });
          } else {
            switch (error.response.data && error.response.data.code) {
              // 服务内部错误
              case 100:
                this.setState({
                  errorElem: (
                    <Alert type="error" message={jsonLang.http_err.err100} showIcon />
                  )
                });
                break;
              // 鉴权失败
              case 101:
                // 身份异常，清理本机数据，跳转登陆页面
                LocalStorage.clearNMS();
                this.setState({
                  errorElem: (
                    <Alert type="error" message={jsonLang.http_err.err101} showIcon
                      afterClose={() => window.location.replace('/')} />
                  )
                });
                break;
              // 其他未定义错误
              default:
                this.setState({
                  errorElem: (
                    <Alert type="error" message={jsonLang.http_err.err182} showIcon />
                  )
                });
            }
          }
          return Promise.reject(error);
        }
      );
    }
    render() {
      return (
        <div>
          { this.state.errorElem }
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}
