import React, {PureComponent, Fragment} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css';
import store from './store'
import Home from './pages/home'

// PureComponent 表示自动使用shouldComponentUpdate生命周期函数，如果没有数据被更新，那么当前组件不会更新.
// 使用这个组件，那么数据必须全部使用 immutable 对象，否则会有很多的坑！！！
class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        {/*
          所有的路由，都要写在 BrowserRouter 组件下面.
          使用 react-router-dom 单页路由，避免每次路由跳转，都要加载整个html页面.
        */}
        <BrowserRouter className="App">
          {/* BrowserRouter 组件下面必须包起来，因为只能有一个DOM元素 */}
          <Fragment>
            {/*
             path: 路径
             exact: 表示需要完全匹配
             component: 路径对应的组件
            */}
            <Route path={"/"} exact component={Home} />
            {/*/!* 创建页面 *!/*/}
            {/*<Route path={"/create"} exact component={Create} />*/}
            {/*/!* 编辑页面, 和创建页面公用一个组件 *!/*/}
            {/*<Route path={"/edit/:id"} exact component={Create} />*/}
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
