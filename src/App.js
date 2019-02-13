import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Home from './components/home'
import Create from './components/create'

class App extends Component {
  render() {
    return (
      <Router className="App">
        {/* Router 组件下面必须包起来，因为只能有一个DOM元素 */}
        <Fragment>
          {/*
           path: 路径
           exact: 表示需要完全匹配
           component: 路径对应的组件
          */}
          <Route path={"/"} exact component={Home} />
          {/* 创建页面 */}
          <Route path={"/create"} exact component={Create} />
          {/* 编辑页面, 和创建页面公用一个组件 */}
          <Route path={"/edit/:id"} exact component={Create} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
