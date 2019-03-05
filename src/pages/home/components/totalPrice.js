import React, { PureComponent, Fragment } from 'react';
import { jsonLang } from '../../../lang/index'
import { connect } from 'react-redux'


export class TotalPrice extends PureComponent {
  render() {
    const { total_income, total_expense } = this.props;
    return (
      <Fragment>
        {jsonLang.label.income}: <span id='income'>{total_income}</span> {jsonLang.label.yuan}
        <span style={{marginRight: '20px'}}/>
        {jsonLang.label.expense}: <span id='expense'>{total_expense}</span> {jsonLang.label.yuan}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    total_income: state.getIn(['home', 'total_income']),
    total_expense: state.getIn(['home', 'total_expense'])
  }
};

export default connect(mapStateToProps, null)(TotalPrice);
