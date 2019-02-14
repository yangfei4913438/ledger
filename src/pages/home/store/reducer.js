import { fromJS } from 'immutable'
import * as types from './actionTypes'
import { defaultState } from './defaultState'


export default (state=defaultState, action) => {
  switch (action.type) {
    case types.createNewRecord:
      return state.merge({
        list: fromJS(action.list),
        total_expense: action.expense,
        total_income: action.income
      });

    case types.delRecord:
      return state.merge({
        list: fromJS(action.list),
        total_expense: action.expense,
        total_income: action.income
      });

    case types.modifyRecord:
      return state.merge({
        list: fromJS(action.list)
      });

    case types.modifyTotalData:
      return state.merge({
        total_expense: action.expense,
        total_income: action.income
      });

    case types.chooseDate:
      return state.merge({
        choose_date: action.choose_date,
        total_expense: action.expense,
        total_income: action.income
      });

    default:
      return state
  }
}
