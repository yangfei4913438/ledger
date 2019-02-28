import React, { PureComponent, Fragment } from 'react'
import Category from './component/category/index'
import PriceForm from './component/priceForm/index'
import { connect } from 'react-redux'
import './create.styl'

class Create extends PureComponent {
  render() {
    const { data_test } = this.props;
    return (
      <Fragment>
        <div>this is create page. {data_test} </div>
        <Category />
        <PriceForm />
      </Fragment>
    )
  }
}

// 映射数据
const mapStatesToProps = (state) => {
  return {
    current_edit: state.getIn(['home', 'current_edit']) ? state.getIn(['home', 'current_edit']).toJS() : null
  }
};

export default connect(mapStatesToProps, null)(Create);
