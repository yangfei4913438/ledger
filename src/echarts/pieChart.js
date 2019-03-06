import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import themeJson from '../theme/wonderland'

class PieCharts extends PureComponent {
	// 组件更新前，先更新图表
	componentWillUpdate () {
		this.createChart();
	}

	createChart () {
		// 注册主题到echarts
		echarts.registerTheme('wonderland', themeJson);

		// 使用 svg 渲染器, 如果要使用canvas，直接修改renderer的值为canvas即可。
		let myChart = echarts.init(this.svgRef, 'wonderland', {renderer: 'svg'});

		let option = {
			series : [
				{
					name: this.props.tip.title,
					type: 'pie',
					radius: this.props.radius,
					center: ['50%', '50%'],
					data: this.props.data,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};

		if (this.props.title.show) {
			option.title = {
				text: this.props.title.name,
				subtext: this.props.title.subtitle,
				x: 'right'
			};
		}

		if (this.props.tip.show) {
			option.tooltip = {
				trigger: 'item',
				formatter: this.props.tip.title ? "{a} <br/>{b} : {c} ({d}%)" : "{b} : {c} ({d}%)"
			}
		}

		if (this.props.showLegend) {
			option.legend = {
				orient: 'vertical',
				left: 'left',
				data: this.props.data.map(o => o.name)
			};
		}

		myChart.setOption(option, true);

		if (this.props.monitorBrowserSize) {
			window.onresize = function(){
				myChart.resize()
			};
		}
	}

	render(){
		return (
			<Fragment>
				{/* 这里不要使用svg标签，否则echarts渲染会出现问题。*/}
				<div ref={r => this.svgRef = r} style={{width: '100%', height: '100%'}} />
			</Fragment>
		)
	}
}

// 依赖关系
PieCharts.propTypes = {
	title: PropTypes.shape({
		name: PropTypes.string,
		subtitle: PropTypes.string,
		show: PropTypes.bool.isRequired
	}).isRequired,
	tip: PropTypes.shape({
		title: PropTypes.string,
		show: PropTypes.bool.isRequired
	}).isRequired,
	showLegend: PropTypes.bool.isRequired,
	radius: PropTypes.string,
	monitorBrowserSize: PropTypes.bool,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})
	)
};

// 默认值
PieCharts.defaultProps = {
	title: {
		show: false
	},
	tip: {
		show: false
	},
	showLegend: false,
	monitorBrowserSize: false,
	radius: '60%'
};

export default PieCharts;
