import { combineReducers } from 'redux-immutable'
import { reducer as HomeReducer } from '../pages/home/store'

// 从 Redux-immutable 库中导出的 combineReducers 方法，可以创建一个immutable类型的state
const reducer = combineReducers({
  home: HomeReducer
});

export default reducer;
