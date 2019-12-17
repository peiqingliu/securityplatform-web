import request from "@/router/axios";

/**
 * 添加草稿
 * @param data
 * @returns {AxiosPromise}
 */
export const addDeclarationFormProcess = (data) =>{
    return request({
        url: '/cetc/desk/process/declarationForm/add',
        method: 'post',
        data
    })
};

/**
 * 提交申请
 */
export const applyDeclarationFormProcess = (data) => {
    return request({
        url: '/cetc/desk/process/declarationForm/start-process',
        method: 'post',
        data
    })
};


export const completeTask = (data) => {
    return request({
        url: '/cetc/desk/process/declarationForm/complete-task',
        method: 'post',
        data
    })
};


/**
 * 详情
 * @param businessId
 * @returns {AxiosPromise}
 */
export const declarationFormDetail = (businessId) => {
    return request({
        url: '/cetc/desk/process/declarationForm/detail',
        method: 'get',
        params: {
            businessId
        }
    })
};

export const getDeclarationFormDataList = (currentPage, pageSize, params) => {
    return request({
        url: '/cetc/desk/process/declarationForm/getByCondition',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};