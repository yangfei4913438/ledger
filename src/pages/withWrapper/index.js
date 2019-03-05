import React from 'react';
import logo from '../../logo.svg';
import { Row, Col, Radio } from 'antd';
import './index.styl'
import { LocalStorage } from "yf-jstools";

const defaultLang = LocalStorage.getValue('lang');

// 修改语言
const changeLang = (e) => {
  // 这里不需要直接更新state，最后也没重载的时候，componentWillMount 方法会自动将设置好的值，赋值到state中。
  switch (e.target.value) {
    case 'zh-cn':
      LocalStorage.setValue('lang', 'zh-cn');
      break;
    case 'zh-tw':
      LocalStorage.setValue('lang', 'zh-tw');
      break;
    default:
      LocalStorage.setValue('lang', 'en');
  }
  // 更新语言后，需要手动刷新一次页面。
  window.location.reload();
};

// 一个公共的头部高级组件，以后也可以改造成带页脚等功能的高级组件
const withWrapper = (Component) => {
  return (props) => {
    return (
      <div className="App">
        <header className="App-header-background">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Row>
              <Col span={6} offset={9}>
                <span>Welcome to React</span>
              </Col>
              <Col span={9} className={"App-lang"}>
                <Radio.Group defaultValue={defaultLang} buttonStyle="solid" size={"default"} onChange={changeLang}>
                  <Radio.Button value="zh-cn">简体中文</Radio.Button>
                  <Radio.Button value="zh-tw">繁體中文</Radio.Button>
                  <Radio.Button value="en">English</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </div>
        </header>
        <div className="App-ledger">
          <Component {...props} />
        </div>
      </div>
    )
  }
};

export default withWrapper;
