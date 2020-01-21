/**
 * 全局配置文件
 */
export default {
  title: "综合安防",
  logo: "S",
  key: 'Security',//配置主键,目前用于存储
  indexTitle: '综合安防平台',
  clientId: 'Security', // 客户端id
  clientSecret: 'Security_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  lockPage: '/lock',
  tokenTime: 300000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  },
  qrcodeIP:"http://129.211.24.126:8088"
}
