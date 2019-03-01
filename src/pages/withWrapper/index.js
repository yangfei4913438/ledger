import React from 'react';
import logo from '../../logo.svg';
import './index.styl'

// 一个公共的头部高级组件，以后也可以改造成带页脚等功能的高级组件
const withWrapper = (Component) => {
  return (props) => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span>Welcome to React</span>
        </header>
        <div className="App-ledger">
          <Component {...props} />
        </div>
      </div>
    )
  }
};

export default withWrapper;
