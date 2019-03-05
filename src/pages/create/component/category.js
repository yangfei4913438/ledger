import React, { PureComponent, Fragment } from 'react';
import {Row, Col, Tabs} from 'antd';
import { Array } from 'yf-jstools'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {jsonLang} from '../../../lang/index';
import { connect } from 'react-redux'
import { createActions } from '../../home/store/index'

export class Category extends PureComponent {
  componentDidMount () {
    const { current_edit, isEdit, onSelectTab } = this.props;
    // 如果是编辑状态，就把当前的标签类型，修改成编辑数据的标签类型
    isEdit && onSelectTab(current_edit.type);
  }

  render () {
    const TabPane = Tabs.TabPane;
    const { income_cid, expense_cid, activeKey, categories, onSelectCategory, onSelectTab } = this.props;
    const list = Array.split_array(categories, 5);
    return (
      <Fragment>
        <Tabs type="card" activeKey={ activeKey } onChange={onSelectTab}>
          <TabPane tab={<span><FontAwesomeIcon icon={['far','calendar-plus']}/> {jsonLang.label.income}</span>} key="income">
            {
              list.map((item, idx) => {
                return (
                  <Row className={'icon-row'} type="flex" justify="space-around" align="middle" key={idx}>
                    {
                      item.map((row, idx2) =>{
                        const iconClass = row.id === income_cid ? 'App-font-icon active' : 'App-font-icon normal';
                        return (
                          <Col span={3} className={'category-icon'} key={idx2} onClick={() => onSelectCategory('income', row.id)}>
                            <div className={iconClass}>
                              <FontAwesomeIcon icon={row.icon} size={'2x'}/>
                            </div>
                            <div>{row.name}</div>
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              })
            }
          </TabPane>
          <TabPane tab={<span><FontAwesomeIcon icon={['far','calendar-minus']}/> {jsonLang.label.expense} </span>} key="expense">
            {
              list.map((item, idx) => {
                return (
                  <Row className={'icon-row'} type="flex" justify="space-around" align="middle" key={idx}>
                    {
                      item.map((row, idx2) =>{
                        const iconClass = row.id === expense_cid ? 'App-font-icon active' : 'App-font-icon normal';
                        return (
                          <Col span={3} className={'category-icon'} key={idx2} onClick={() => onSelectCategory('expense', row.id)}>
                            <div className={iconClass}>
                              <FontAwesomeIcon icon={row.icon} size={'2x'}/>
                            </div>
                            <div>{row.name}</div>
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              })
            }
          </TabPane>
        </Tabs>
      </Fragment>
    )
  }
}


// 映射数据
const mapStatesToProps = (state) => {
  return {
    income_cid: state.getIn(['home', 'income_cid']),
    expense_cid: state.getIn(['home', 'expense_cid']),
    activeKey: state.getIn(['home', 'activeKey']),
    isEdit: state.getIn(['home', 'isEdit']),
    categories: state.getIn(['home', 'categories']) ? state.getIn(['home', 'categories']).toJS() : null,
    current_edit: state.getIn(['home', 'current_edit']) ? state.getIn(['home', 'current_edit']).toJS() : null
  }
};

// 映射dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCategory(type, id) {
      switch (type) {
        case 'income':
          dispatch(createActions.modifyIncomeIconID(id));
          break;
        default:
          dispatch(createActions.modifyExpenseIconID(id));
          break;
      }
    },
    onSelectTab(key) {
      dispatch(createActions.modifyChooseTab(key));
    }
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(Category);
