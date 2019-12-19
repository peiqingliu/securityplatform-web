import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/cetc/system/permission/getByCondition',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
};

export const getMenuTree = () => {
  return request({
    url: '/cetc/system/permission/tree',
    method: 'get',
    params: {}
  })
};


export const getMenuList = (current, size, params) => {
  return request({
    url: '/cetc/system/permission/menu-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
};

export const remove = (ids) => {
  return request({
    url: '/cetc/system/permission/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/permission/submit',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/permission/edit',
    method: 'post',
    data: row
  })
};

export const getMenu = (id) => {
  return request({
    url: '/cetc/system/permission/detail',
    method: 'get',
    params: {
      id,
    }
  })
};

export const getTopMenu = () => request({
  url: '/cetc/system/permission/top-menu',
  method: 'get'
});

/**
 * 获取路由
 * @param topMenuId
 * @returns {AxiosPromise}
 */
export const getRoutes = (topMenuId) => request({
  url: '/cetc/system/permission/routes',
  method: 'get',
  params: {
    topMenuId,
  }
});
