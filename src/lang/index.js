// AntD的语言文件
import Antd_zhCN from 'antd/lib/locale-provider/zh_CN';
import Antd_zhTW from 'antd/lib/locale-provider/zh_TW';
import Antd_en from 'antd/lib/locale-provider/en_US';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import moment from 'moment';

// 导入json文件必须写全扩展名，不能省略.json, 否则会出错的！
import cn from './zh-cn.json';
import tw from './zh-tw.json';
import en from './en.json';

// 数据操作插件
import { LocalStorage } from 'yf-jstools';

// 获取语言设置
let language = LocalStorage.getValue('lang');

// 获取浏览器语言
function getLang () {
  let type = navigator.appName;
  let lang = '';
  if (type === 'Netscape') {
    lang = navigator.language // 获取浏览器配置语言，支持非IE浏览器
  } else {
    lang = navigator.userLanguage // 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
  }
  // 异常处理, 某些浏览器, 中文语言的值是zh
  if (lang.toLowerCase() === 'zh') {
    return 'zh-cn'
  } else {
    return lang.toLowerCase()
  }
}

// 如果取不到值，就临时赋值一个en
if (!language) {
  language = getLang();
  // 重新存储语言类型
  LocalStorage.setValue('lang', language)
}

// 定义一个语言变量
let jsonLang = en;
let antdLang = Antd_en;

// 语言判断
switch (language) {
  case 'zh-cn':
    jsonLang = cn;
    antdLang = Antd_zhCN;
    moment.locale('zh-cn');
    break;
  case 'zh-tw':
    jsonLang = tw;
    antdLang = Antd_zhTW;
    moment.locale('zh-tw');
    break;
  default:
    jsonLang = en;
    antdLang = Antd_en;
    moment.locale()
}

// 导出语言
export {
  jsonLang,
  antdLang
};
