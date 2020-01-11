import request from '@/router/axios';

// 文件上传接口

export const getList = (currentPage, pageSize, params) => {
    return request({
        url: '/us/log/getAllByPage',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};