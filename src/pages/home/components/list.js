import React, { PureComponent, Fragment } from 'react'
import { Button, Col, Row } from 'antd';
import { jsonLang } from '../../../lang/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'
import { createActions } from '../store'
import { withRouter } from 'react-router-dom'

class List extends PureComponent {
  // 修改组件
  modifyItem = (item) => {
    this.props.currentEdit(item);
    this.props.modifyIsEdit(true);
    this.props.modifyShowCreate(true);
  };

  render() {
    const { list, deleteItem, choose_date, categorys } = this.props;
    console.log(categorys);
    // 在显示组件里面进行过滤即可。。。
    let arr = choose_date ? list.filter(o => o.date.includes(choose_date)) : list;
    return (
      <Fragment>
        {
          arr && arr.map(item => {
            return (
              <Row className="App-layout-row" key={item.id}>
                <Col span={2} className="App-layout-col">
                  <FontAwesomeIcon className="App-rotate-icon" icon={item.icon} transform="shrink--8"/>
                </Col>
                <Col span={10} className="App-layout-col">{ item.event }</Col>
                <Col span={4} className="App-layout-col">{ item.type === 'income' ? `+${item.price}` : `-${item.price}` }</Col>
                <Col span={4} className="App-layout-col">{ item.date }</Col>
                <Col span={2} className="App-layout-col">
                  <Button type="primary" onClick={() => this.modifyItem(item)}>{jsonLang.btn.edit}</Button>
                </Col>
                <Col span={2} className="App-layout-col">
                  <Button type="danger" onClick={() => deleteItem(item.id)}>{jsonLang.btn.del}</Button>
                </Col>
              </Row>
            )
          })
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // 使用的时候，转换成标准JS来处理
    list: state.getIn(['home', 'list']) ? state.getIn(['home', 'list']).toJS() : null,
    categories: state.getIn(['home', 'categories']) ? state.getIn(['home', 'categories']).toJS() : null,
    choose_date: state.getIn(['home', 'choose_date'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 删除对象
    deleteItem (id) {
      dispatch(createActions.delRecord(id));
    },
    // 修改是否为编辑状态
    modifyIsEdit (res) {
      dispatch(createActions.modifyIsEdit(res));
    },
    // 修改是否显示创建组件
    modifyShowCreate (res) {
      dispatch(createActions.modifyShowCreate(res));
    },
    // 当前编辑对象
    currentEdit (item) {
      switch (item.type) {
        case 'income':
          dispatch(createActions.modifyIncomeIconID(item.cid));
          break;
        default:
          dispatch(createActions.modifyExpenseIconID(item.cid));
          break
      }
      // 更新当前编辑内容
      dispatch(createActions.currentEdit(item));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
