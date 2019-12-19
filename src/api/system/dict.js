import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/cetc/system/dict/list',
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
    url: '/cetc/system/dict/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/dict/submit',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/dict/submit',
    method: 'post',
    data: row
  })
};


export const getDict = (id) => {
  return request({
    url: '/cetc/system/dict/detail',
    method: 'get',
    params: {
      id,
    }
  })
};
export const getDictTree = () => {
  return request({
    url: '/api/blade-system/dict/tree?code=DICT',
    method: 'get'
  })
};

export const getDictionary = (params) => {
  return request({
    url: '/cetc/system/dict/dictionary',
    method: 'get',
    params,
  })
};
