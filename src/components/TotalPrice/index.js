import React, { Fragment } from 'react';
import { jsonLang } from '../../lang'

const TotalPrice = (props) => {
  const { total_income, total_expense } = props;
  return (
    <Fragment>
      {jsonLang.label.income}: <span id='income'>{total_income}</span> {jsonLang.label.yuan}
      <span style={{marginRight: '20px'}}/>
      {jsonLang.label.expense}: <span id='expense'>{total_expense}</span> {jsonLang.label.yuan}
    </Fragment>
  )
};

export default TotalPrice;
