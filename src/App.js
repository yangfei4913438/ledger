import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class App extends Component {
  render() {
    const plane = ['fas','plane'];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to React</p>
        </header>
        <div className="App-ledger">
          <Row className="App-layout-row">
            <Col span={2} className="App-layout-col">类型</Col>
            <Col span={10} className="App-layout-col">标题</Col>
            <Col span={4} className="App-layout-col">金额</Col>
            <Col span={4} className="App-layout-col">日期</Col>
            <Col span={4} className="App-layout-col">操作</Col>
          </Row>
          <Row className="App-layout-row">
            <Col span={2} className="App-layout-col"><FontAwesomeIcon className="App-rotate-icon" icon={plane} transform="shrink--8"/></Col>
            <Col span={10} className="App-layout-col">去云南旅游</Col>
            <Col span={4} className="App-layout-col">-200元</Col>
            <Col span={4} className="App-layout-col">2018-09-10</Col>
            <Col span={2} className="App-layout-col"><Button type="primary">编辑</Button></Col>
            <Col span={2} className="App-layout-col"><Button type="danger">删除</Button></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
