import request from '@/router/axios';

export const getList = (currentPage, pageSize, params) => {
  return request({
    url: '/us/system/user/getByCondition',
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
    url: '/us/system/user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/us/system/user/admin/add',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/us/system/user/update',
    method: 'post',
    data: row
  })
};

export const getUser = (id) => {
  return request({
    url: '/us/system/user/detail',
    method: 'get',
    params: {
      id,
    }
  })
};


export const resetPassword = (userIds) => {
  return request({
    url: '/us/system/user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
};

