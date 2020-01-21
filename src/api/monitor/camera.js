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
 * 检测服务是否开启
 */
export const checkServiceOpened = () => {
    return request({
        url: '/us/monitor/camera/checkServiceOpened',
        method: 'get',
        params: {}
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

/**
 * 关闭服务
 */
export const stopService = () => {
    return request({
        url: '/us/monitor/camera/stopService',
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
        url: '/us/monitor/camera/add',
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

/**
 * 远程截图
 * @param row
 */
export const remoteCapture = (row) => {
    return request({
        url: '/us/monitor/camera/remoteCapture',
        method: 'post',
        data: row
    })
};

/**
 * 登出设备
 * @param row
 */
export const logout = (id) => {
    return request({
        url: '/us/monitor/camera/logout',
        method: 'post',
        params: {
            id,
        }
    })
};