import * as types from './actionTypes'
import axios from 'axios'

// 修改list加载动画的状态
const modifyListLoaderStatus = (status) => {
  return {
    type: types.modifyListLoaderStatus,
    status
  }
};

// 选择日期, 查询数据
export const chooseDate = (val) => {
  // 异步必须通过这种方式来处理。
  return (dispatch) => {
    // 显示加载动画
    dispatch(modifyListLoaderStatus(true));
    // 如果为空，就是全部查，有值就是模糊查询
    let url = val ? '/api/v1/list?date_like=' + val : '/api/v1/list';
    axios.get(url)
      .then(res => {
        // 更新查询关键字
        dispatch(chooseDateSet(res.data, val));
        // 关闭加载动画
        dispatch(modifyListLoaderStatus(false));
      })
      .catch(err => {
        console.log(err);
        // 关闭加载动画
        dispatch(modifyListLoaderStatus(false));
      })
  };
};

// 更新查询关键字
const chooseDateSet = (list, val) => {
  return {
    type: types.chooseDate,
    list,
    choose_date: val,
    ...totalData(list)
  }
};

// 获取初始列表记录
export const initData = () => {
  // redux-thunk 支持这里的返回值为函数类型
  // 这个函数自动接收dispatch方法作为参数
  return async (dispatch) => {
    dispatch(modifyListLoaderStatus(true));
    try {
      // 没有依赖关系的异步操作，可以写成并发请求哦 :)
      const [ list, categories ] = await Promise.all([axios.get('/api/v1/list?_sort=id&_order=desc'), axios.get('/api/v1/categories')]);
      dispatch(setInitData(list.data, categories.data));
      dispatch(modifyListLoaderStatus(false));
    } catch (e) {
      console.log(e);
      dispatch(modifyListLoaderStatus(false));
    }
  }
};

// 更新本地的list数据
const setInitData = (list, categories) => {
  return {
    type: types.initData,
    list,
    categories,
    ...totalData(list) // 将函数返回的对象，变成两个独立的属性（和上面的list一样）
  }
};

// 创建新列，模拟操作
export const createNewRecord = (item) => {
  return (dispatch) => {
    axios.post('/api/v1/list', item)
      .then(() => {
        // 添加完成数据后，获取新的数据
        dispatch(initData())
      })
      .catch(err => {
        console.log(err)
      })
  };
};

// 删除记录
export const delRecord = (id) => {
  return (dispatch) => {
    axios.delete('/api/v1/list/'+id)
      .then(() => {
        // 删除完成后，获取新的数据
        dispatch(initData())
      })
      .catch(err => {
        console.log(err)
      })
  };
};

// 修改记录
export const modifyRecord = (item) => {
  return (dispatch) => {
    axios.put('/api/v1/list/'+item.id, item)
      .then(() => {
        // 修改完成后，获取新的数据
        dispatch(initData())
      })
      .catch(err => {
        console.log(err)
      })
  }
};

// 修改汇总记录的函数
const totalData = (arr) => {
  let expense = 0;
  let income = 0;
  arr.forEach(item => {
    if (item.type === 'expense') {
      expense += item.price
    } else {
      income += item.price
    }
  });
  return {
    expense,
    income
  }
};

// 当前编辑的对象更新
export const currentEdit = (item) => {
  return {
    type: types.currentEdit,
    item
  }
};

// 修改收入图标ID
export const modifyIncomeIconID = (id) => {
  return {
    type: types.modifyIncomeIconID,
    income: id
  }
};

// 修改支出图标ID
export const modifyExpenseIconID = (id) => {
  return {
    type: types.modifyExpenseIconID,
    expense: id
  }
};

// 修改选中的标签页
export const modifyChooseTab = (key) => {
  return {
    type: types.modifyChooseTab,
    activeKey: key
  }
};

// 修改首页的active key
export const modifyHomeActiveKey = (key) => {
	return {
		type: types.modifyHomeActiveKey,
		activeKey: key
	}
};

// 修改是否编辑状态
export const modifyIsEdit = (status) => {
  return {
    type: types.modifyIsEdit,
    isEdit: status
  }
};

// 修改是否显示创建组件
export const modifyShowCreate = (status) => {
  return {
    type: types.modifyShowCreate,
    showCreate: status
  }
};
