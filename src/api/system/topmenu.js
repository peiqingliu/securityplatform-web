import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/cetc/system/topMenu/getByCondition',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
};

export const getDetail = (id) => {
  return request({
    url: '/cetc/system/topMenu/detail',
    method: 'get',
    params: {
      id
    }
  })
};

export const remove = (ids) => {
  return request({
    url: '/cetc/system/topMenu/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/topMenu/save',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/topMenu/update',
    method: 'put',
    data: row
  })
};

export const grantTree = () => {
  return request({
    url: '/cetc/system/permission/grant-top-tree',
    method: 'get',
  })
};

export const getTopTree = (topMenuIds) => {
  return request({
    url: '/cetc/system/permission/top-tree-keys',
    method: 'get',
    params: {
      topMenuIds,
    }
  })
};

export const grant = (topMenuIds, menuIds) => {
  return request({
    url: '/cetc/system/topMenu/grant',
    method: 'post',
    params: {
      topMenuIds,
      menuIds,
    }
  })
};
