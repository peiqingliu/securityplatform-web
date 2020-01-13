import request from '@/router/axios';

export const getList = (currentPage, pageSize, params) => {
    return request({
        url: '/us/monitor/camera/getByCondition',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};

/**
 * 开启自动注册服务
 */
export const startAutoRegisterService = () => {
    return request({
        url: '/us/monitor/camera/startAutoRegisterService',
        method: 'get',
        params: {}
    })
};


export const remove = (ids) => {
    return request({
        url: '/us/monitor/camera/remove',
        method: 'post',
        params: {
            ids,
        }
    })
};

export const add = (row) => {
    return request({
        url: '/us/monitor/camera/save',
        method: 'post',
        data: row
    })
};

export const update = (row) => {
    return request({
        url: '/us/monitor/camera/update',
        method: 'post',
        data: row
    })
};

export const getCamera = (id) => {
    return request({
        url: '/us/monitor/camera/detail',
        method: 'get',
        params: {
            id,
        }
    })
};
