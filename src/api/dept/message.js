import request from '@/router/axios';

export const getList = (currentPage, pageSize, params) => {
    return request({
        url: '/cetc/desk/message/getByCondition',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};


export const getListLimitTen = (currentPage, pageSize, params) => {
    return request({
        url: '/cetc/desk/message/getDataListLimitTen',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};

export const markRead = (ids) =>{
  return request({
      url: '/cetc/desk/message/markRead',
      method: 'post',
      params: {
          ids,
      }
  })
};


export const remove = (ids) => {
    return request({
        url: '/cetc/desk/message/remove',
        method: 'post',
        params: {
            ids,
        }
    })
};