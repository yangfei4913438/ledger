import { fromJS } from 'immutable'
import * as types from './actionTypes'
import { defaultState } from './defaultState'


export default (state=defaultState, action) => {
  switch (action.type) {
    case types.chooseDate:
      return state.merge({
        list: fromJS(action.list),
        choose_date: action.choose_date,
        total_expense: action.expense,
        total_income: action.income
      });

    case types.initData:
      return state.merge({
        list: fromJS(action.list),
        categories:  fromJS(action.categories),
        total_expense: action.expense,
        total_income: action.income
      });

    case types.modifyListLoaderStatus:
      return state.set('listLoader', action.status);

    case types.currentEdit:
      return state.set('current_edit', fromJS(action.item));

    case types.modifyIncomeIconID:
      return state.set('income_cid', action.income);

    case types.modifyExpenseIconID:
      return state.set('expense_cid', action.expense);

    case types.modifyIsEdit:
      return state.set('isEdit', action.isEdit);

    case types.modifyShowCreate:
      return state.set('showCreate', action.showCreate);

    case types.modifyChooseTab:
      return state.set('activeKey', action.activeKey);

    default:
      return state
  }
}
