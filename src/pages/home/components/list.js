import React, { PureComponent, Fragment } from 'react'
import { Button, Col, Row } from 'antd';
import { jsonLang } from '../../../lang/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'
import { createActions } from '../store'
import { withRouter } from 'react-router-dom'

class List extends PureComponent {
  // 修改组件
  modifyItem = (id) => {
    // withRouter 组件，可以取到history数据
    this.props.history.push(`/edit/${id}`)
  };

  render() {
    const { list, deleteItem, choose_date } = this.props;
    // 在显示组件里面进行过滤即可。。。
    let arr = choose_date ? list.filter(o => o.date.includes(choose_date)) : list;
    return (
      <Fragment>
        {
          arr.map(item => {
            return (
              <Row className="App-layout-row" key={item.id}>
                <Col span={2} className="App-layout-col">
                  <FontAwesomeIcon className="App-rotate-icon" icon={item.icon} transform="shrink--8"/>
                </Col>
                <Col span={10} className="App-layout-col">{ item.event }</Col>
                <Col span={4} className="App-layout-col">{ item.type === 'income' ? `+${item.price}` : `-${item.price}` }</Col>
                <Col span={4} className="App-layout-col">{ item.date }</Col>
                <Col span={2} className="App-layout-col">
                  <Button type="primary" onClick={() => this.modifyItem(item.id)}>{jsonLang.btn.edit}</Button>
                </Col>
                <Col span={2} className="App-layout-col">
                  <Button type="danger" onClick={() => deleteItem(list, item.id)}>{jsonLang.btn.del}</Button>
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
    list: state.getIn(['home', 'list']).toJS(),
    choose_date: state.getIn(['home', 'choose_date'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 删除对象
    deleteItem (arr, id) {
      dispatch(createActions.delRecord(arr, id));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
