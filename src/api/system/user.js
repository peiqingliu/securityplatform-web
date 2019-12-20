import request from '@/router/axios';

export const getList = (currentPage, pageSize, params) => {
  return request({
    url: '/cetc/system/user/getByCondition',
    method: 'get',
    params: {
      ...params,
      currentPage,
      pageSize,
    }
  })
};


export const remove = (ids) => {
  return request({
    url: '/cetc/system/user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/user/admin/add',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/user/update',
    method: 'post',
    data: row
  })
};

export const getUser = (id) => {
  return request({
    url: '/cetc/system/user/detail',
    method: 'get',
    params: {
      id,
    }
  })
};


export const resetPassword = (userIds) => {
  return request({
    url: '/cetc/system/user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
};

