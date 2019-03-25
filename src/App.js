import React, {Fragment, PureComponent} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.styl';
import store from './store'
import Home from './pages/home'
import UI from './ui'
import { message } from 'antd';

// 未匹配的路由，跳转到首页，这里是把url都改成正常的。
const RouteFallback = () => {
  return (
    <Fragment>
      {/* 弹出警告 */}
      { message.warning('您访问的页面不存在!', 5) }
      {/* 路由跳转 */}
      <Redirect to='/' />
    </Fragment>
  )
};

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
        <BrowserRouter>
          {/* BrowserRouter 组件下面必须包起来，因为只能有一个DOM元素 */}
          {/* Switch 可以做路由切换 */}
          <Switch>
            {/*
             path: 路径
             exact: 表示需要完全匹配
             component: 路径对应的组件
            */}
            <Route path={"/"} exact component={Home} />
            {/* 媒体查询库的使用 */}
            <Route path={"/ui"} exact component={UI} />
            {/* 没有找到的都去首页 */}
            <Route component={RouteFallback}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
