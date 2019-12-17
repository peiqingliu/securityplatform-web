import Layout from '@/page/index/'

export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      i18n: 'dashboard'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel')
  }]
}, {
  path: '/test',
  component: Layout,
  redirect: '/test/index',
  children: [{
    path: 'index',
    name: '测试页',
    meta: {
      i18n: 'test'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/test')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      i18n: 'info'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/info')
  }]
}, {
  path: '/work/process/leave',
  component: Layout,
  redirect: '/work/process/leave/form',
  children: [{
    path: 'form/:processDefinitionId',
    name: '请假流程',
    meta: {
      i18n: 'work'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/work/process/leave/form')
  }, {
    path: 'handle/:taskId/:processInstanceId/:businessId',
    name: '处理请假流程',
    meta: {
      i18n: 'work'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/work/process/leave/handle')
  }, {
    path: 'detail/:processInstanceId/:businessId',
    name: '请假流程详情',
    meta: {
      i18n: 'work'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/work/process/leave/detail')
  }]
},{
    path: '/work/process/material',
    component: Layout,
    redirect: '/work/process/material/form',
    children: [{
      path: 'form/:processDefinitionId',
      name: '物资流程',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/material/form')
    }, {
      path: 'handle/:taskId/:processInstanceId/:businessId',
      name: '处理物资流程',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/material/handle')
    }, {
      path: 'detail/:processInstanceId/:businessId',
      name: '物资流程详情',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/material/detail')
    }]
  },
  {
    path: '/work/process/reimburse',
    component: Layout,
    redirect: '/work/process/reimburse/form',
    children: [{
      path: 'form/:processDefinitionId',
      name: '报销流程',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/reimburse/form')
    }, {
      path: 'handle/:taskId/:processInstanceId/:businessId',
      name: '处理报销流程',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/reimburse/handle')
    }, {
      path: 'detail/:processInstanceId/:businessId',
      name: '报销流程详情',
      meta: {
        i18n: 'work'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/work/process/reimburse/detail')
    }]
  }]
