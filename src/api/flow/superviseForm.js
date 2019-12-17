import request from "@/router/axios";

/**
 * 添加草稿
 * @param data
 * @returns {AxiosPromise}
 */
export const addSuperviseFormProcess = (data) =>{
    return request({
        url: '/cetc/desk/process/superviseForm/add',
        method: 'post',
        data
    })
};

/**
 * 提交申请
 */
export const applySuperviseFormProcess = (data) => {
    return request({
        url: '/cetc/desk/process/superviseForm/start-process',
        method: 'post',
        data
    })
};


export const completeTask = (data) => {
    return request({
        url: '/cetc/desk/process/superviseForm/complete-task',
        method: 'post',
        data
    })
};


/**
 * 详情
 * @param businessId
 * @returns {AxiosPromise}
 */
export const applySuperviseFormDetail = (businessId) => {
    return request({
        url: '/cetc/desk/process/superviseForm/detail',
        method: 'get',
        params: {
            businessId
        }
    })
};

export const selectUndertakeId = (businessId) => {
    return request({
        url: '/cetc/desk/process/superviseForm/selectUndertakeId',
        method: 'get',
        params: {
            businessId
        }
    })
};
