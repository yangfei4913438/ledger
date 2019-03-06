import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PieChart from '../../../echarts/pieChart';
import { connect } from 'react-redux'

class Chart extends PureComponent {
	render () {
		const { list, choose_date } = this.props;
		// 在显示组件里面进行过滤即可。。。
		let arr = choose_date ? list.filter(o => o.date.includes(choose_date)) : list;

		const incomeData = arr && arr.filter(o => o.type==='income').map(res => ({name: res.event, value: res.price}));
		const expenseData = arr && arr.filter(o => o.type==='expense').map(res => ({name: res.event, value: res.price}));
		const incomeProps = {
			tip: {
				title: '收入项',
				show: true
			},
			radius: '90%',
			data: incomeData
		};
		const expenseProps = {
			tip: {
				title: '支出项',
				show: true
			},
			radius: '90%',
			data: expenseData
		};
		return (
			<Row>
				<Col span={12} style={{height: '450px'}}>
					{
						incomeData && <PieChart {...incomeProps} />
					}
				</Col>
				<Col span={12} style={{height: '450px'}}>
					{
						expenseData && <PieChart {...expenseProps} />
					}
				</Col>
			</Row>
		)
	}
}

// 映射数据
const mapStatesToProps = (state) => {
	return {
		choose_date: state.getIn(['home', 'choose_date']),
		list: state.getIn(['home', 'list']) ? state.getIn(['home', 'list']).toJS() : null
	}
};

export default connect(mapStatesToProps,null)(Chart);
