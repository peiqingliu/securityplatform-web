import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/cetc/system/dept/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
};

export const getAllDataList = () => {
  return request({
    url: '/cetc/system/dept/allDataList',
    method: 'get',
    params: {
    }
  })
};

export const remove = (ids) => {
  return request({
    url: '/cetc/system/dept/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/dept/submit',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/dept/update',
    method: 'put',
    data: row
  })
};

export const getDept = (id) => {
  return request({
    url: '/cetc/system/dept/detail',
    method: 'get',
    params: {
      id,
    }
  })
};
export const getDeptTree = (tenantId) => {
  return request({
    url: '/cetc/system/dept/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
};

