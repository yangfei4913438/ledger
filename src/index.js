import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import lang from './lang'

// 字体库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

ReactDOM.render(<LocaleProvider locale={lang.antdLang}><App /></LocaleProvider>, document.getElementById('root'));
