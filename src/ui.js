import React from 'react';
import PieChart from './echarts/pieChart';

const data = [
	{value:335, name:'直接访问', name1:'直接访问'},
	{value:310, name:'邮件营销', name1:'直接访问'},
	{value:234, name:'联盟广告', name1:'直接访问'},
	{value:135, name:'视频广告', name1:'直接访问'},
	{value:1548, name:'搜索引擎', name1:'直接访问'}
];

const props = {
  title:{
  	name: '用户访问来源',
		subtitle: '纯属虚构',
		show: true
	},
	tip: {
  	title: '访问来源',
		show: true
	},
	showLegend: true,
	data
};

const UI = () => {
  return <PieChart {...props}/>;
};

export default UI;
