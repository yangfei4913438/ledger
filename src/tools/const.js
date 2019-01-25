// 错误颜色定义
const levelColor = {
  level0: '#2df033',
  level1: '#f4d630',
  level2: '#fc6a22',
  level3: '#ff0200',
  default: '#8492A6'
}

const showColor = {
  error: levelColor.level3,
  right: levelColor.level0
}

// 常用颜色
const blueColor = '#409EFF'
const greenColor = '#67C23A'
const greenFontColor = '#389818'

// 定义一半亮度的颜色
const levelHalfColor = {
  level0: '#99f0a0',
  level1: '#f4e496',
  level2: '#fcac8d',
  level3: '#ff979e',
  default: '#8492A6'
}

// 获取一半亮度的颜色
function getHalfColor (i) {
  switch (i) {
    case 1:
      return levelHalfColor.level0
    case -1:
      return levelHalfColor.level1
    case -2:
      return levelHalfColor.level2
    case -3:
      return levelHalfColor.level3
    default:
      return levelHalfColor.default
  }
}


// 获取不同级别的颜色
function getLevelColor (i) {
  switch (i) {
    case 1:
      return levelColor.level0
    case -1:
      return levelColor.level1
    case -2:
      return levelColor.level2
    case -3:
      return levelColor.level3
    default:
      return levelColor.default
  }
}

// 获取不同级别的标签名称
function getLevelName (i) {
  switch (i) {
    case 1:
      return 'OK'
    case -1:
      return 'Warning'
    case -2:
      return 'Error'
    case -3:
      return 'Fatal'
    default:
      return 'Undefined'
  }
}

// 获取树形图线条的颜色
function getLineColor (i) {
  switch (i) {
    case 1:
      return levelColor.level0
    case -1:
      return levelColor.level1
    case -2:
      return levelColor.level2
    case -3:
      return levelColor.level3
    default:
      return levelColor.default
  }
}

// 获取一半亮度的颜色
function getHalfLineColor (i) {
  switch (i) {
    case 1:
      return levelHalfColor.level0
    case -1:
      return levelHalfColor.level1
    case -2:
      return levelHalfColor.level2
    case -3:
      return levelHalfColor.level3
    default:
      return levelHalfColor.default
  }
}

// 根据协议数值获取协议名称
function getProtocol (type) {
  switch (type) {
    case 0:
      return 'R2TP'
    case 1:
      return 'UDP'
    case 2:
      return 'RTMP'
    case 3:
      return 'HTTP'
    case 4:
      return 'FILE'
    case 5:
      return 'R2TP V3'
    default:
      return 'Undefined Type'
  }
}

// 获取协议的种类
function getProtocolType (type) {
  switch (type) {
    case 0:
      return 'PUSH'
    case 1:
      return 'PULL'
    default:
      return 'Undefined'
  }
}

export default {
  blueColor,
  greenColor,
  greenFontColor,
  levelColor,
  levelHalfColor,
  getLevelColor,
  getLevelName,
  getHalfColor,
  showColor,
  getLineColor,
  getHalfLineColor,
  // 根据协议数值获取协议名称
  getProtocol,
  // 获取协议的种类
  getProtocolType
}
