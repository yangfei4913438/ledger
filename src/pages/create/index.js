import React from 'react'
import Category from '../category'
import PriceForm from '../priceForm'


class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: {
        id: 1
      },
      expense: {
        id: 2
      },
      categorys: [
        {
          id: 1,
          name: '工资',
          icon: ['fas', 'hand-holding-usd']
        },
        {
          id: 2,
          name: '旅行',
          icon: ['fas', 'plane']
        },
        {
          id: 3,
          name: '健身',
          icon: ['fas', 'swimmer']
        },
        {
          id: 4,
          name: '购物',
          icon: ['fas', 'shopping-cart']
        },
        {
          id: 5,
          name: '餐饮',
          icon: ['fas','utensils']
        },
        {
          id: 6,
          name: '数码',
          icon: ['fas', 'mobile-alt']
        },
        {
          id: 7,
          name: '支付宝',
          icon: ['fab', 'alipay']
        },
        {
          id: 8,
          name: '交通',
          icon: ['fas', 'taxi']
        }
      ]
    };
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }
  onSelectCategory(type, id) {
    if (type === 'income') {
      this.setState({
        income: {
          id: id
        }
      });
    } else {
      this.setState({
        expense: {
          id: id
        }
      });
    }
  };
  render() {
    const { match } = this.props;
    return (
      <div className={'App'}>
        <div className={'App-ledger-create'}>
          <div>this is create page. {match.params.id}</div>
          <Category status={this.state} onSelectCategory={this.onSelectCategory}/>
          <PriceForm />
        </div>
      </div>
    )
  }
}

export default Create;
