import request from '@/router/axios';

export const getList = (currentPage, pageSize, params) => {
    return request({
        url: '/cetc/monitor/camera/getByCondition',
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
        url: '/cetc/monitor/camera/remove',
        method: 'post',
        params: {
            ids,
        }
    })
};

export const add = (row) => {
    return request({
        url: '/cetc/monitor/camera/add',
        method: 'post',
        data: row
    })
};

export const update = (row) => {
    return request({
        url: '/cetc/monitor/camera/update',
        method: 'post',
        data: row
    })
};

export const getCamera = (id) => {
    return request({
        url: '/cetc/monitor/camera/detail',
        method: 'get',
        params: {
            id,
        }
    })
};
