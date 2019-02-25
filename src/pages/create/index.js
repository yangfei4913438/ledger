import React, { Fragment } from 'react'
import Category from './component/category'
import PriceForm from './component/priceForm'
import withWrapper from '../withWrapper'


class Create extends React.Component {
  render() {
    const { match, data_test } = this.props;
    return (
      <Fragment>
        <div>this is create page. {data_test} </div>
        { console.log(match.params.id) }
        <Category tid={match.params.id} />
        <PriceForm tid={match.params.id} />
      </Fragment>
    )
  }
}

export default withWrapper(Create);
