import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

// 中间件数组, 可以填入多个中间件
const middleWares = [thunk];

// 应用中间件
const middlewareEnhancer = applyMiddleware(...middleWares);

// 用redux开发工具封装中间件
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

// 创建store，加入中间件参数
const store = createStore(reducer, composedEnhancers);

export default store;
