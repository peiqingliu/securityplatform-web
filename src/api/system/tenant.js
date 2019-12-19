import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/tenant/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
};

export const getTenantAll = (row) => {
  return request({
    url: '/cetc/system/tenant/getAll',
    method: 'get',
    data: row
  })
};

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/tenant/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/api/blade-system/tenant/submit',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/api/blade-system/tenant/submit',
    method: 'post',
    data: row
  })
};
