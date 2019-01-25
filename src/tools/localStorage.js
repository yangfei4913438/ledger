// cookie默认不使用，优先localStorage，如果无法使用，系统才会调用cookie
import cookie from './cookie'

// 存储数据
function setValue (key, val) {
  // 如果用户关闭了本地存储功能，或者使用隐身模式。使用localStorage会让浏览器抛出异常，导致程序无法执行。
  // 所以这里要进行异常处理

  // 保存数据前，先将数据用JSON进行序列化
  const value = JSON.stringify(val)

  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // 默认cookie存储1天
    let days = 1
    // 如果是语言类型，那就存储1年
    if (key === 'lang') {
      days = 365
    }
    cookie.setCookie(key, value, days)
  }
}

// 获取数据
function getValue (key) {
  try {
    const value = localStorage.getItem(key)
    if (value) {
      // 返回的数据，需要用JSON进行反序列化
      return JSON.parse(value)
    } else {
      return ''
    }
  } catch (e) {
    const value = cookie.getCookie(key)
    if (value) {
      // 返回的数据，需要用JSON进行反序列化
      return JSON.parse(value)
    } else {
      return ''
    }
  }
}

// 删除数据
function delValue (key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    cookie.delCookie(key)
  }
}

/***
 * 清空nms缓存
 * 1、user_id 用户登陆账号
 * 2、user_name 用户昵称
 * 3、role_id 用户的权限ID
 * 4、token
 * 5、new 新账户标识
 * 6、用户的注册信息
 * 7、overview_list overview左侧的树明细
 * 8、device_list device左侧的树明细
 * 9、service_expand 服务概览列表收缩状态记录
 * 10、device_expand 设备概览列表收缩状态记录
 * 11、service_layer 服务概览列表，选中的层级
 * 12、service_index 服务概览列表，选中层级列表下的对象索引属性
 * 13、device_layer 设备概览列表，选中的层级
 * 14、device_index 设备概览列表，选中层级列表下的对象索引属性
 */
function clearNMS () {
  delValue('user_id')
  delValue('user_name')
  delValue('role_id')
  delValue('token')
  delValue('new')
  delValue('register_data')
  delValue('overview_list')
  delValue('device_list')
  delValue('service_expand')
  delValue('device_expand')
  delValue('service_layer')
  delValue('service_index')
  delValue('device_layer')
  delValue('device_index')
}

export default {
  setValue,
  getValue,
  delValue,
  clearNMS
}
