import React, { PureComponent, Fragment } from 'react'
import Category from './component/category/index'
import PriceForm from './component/priceForm/index'
import './create.styl'

class Create extends PureComponent {
  render() {
    return (
      <Fragment>
        <Category />
        <PriceForm />
      </Fragment>
    )
  }
}

export default Create;
