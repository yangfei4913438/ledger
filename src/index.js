import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './reset.css'
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import { antdLang } from './lang'
import axios from './axios'

// 字体库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

// 用拦截器封装 App 组件
const HocApp = axios(App);

ReactDOM.render(<LocaleProvider locale={antdLang}><HocApp /></LocaleProvider>, document.getElementById('root'));
