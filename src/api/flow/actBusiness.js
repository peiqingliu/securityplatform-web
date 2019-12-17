import request from "@/router/axios";

/**
 * 详情
 * @param businessId
 * @returns {AxiosPromise}
 */
export const findActBusinessById = (businessId) => {
    return request({
        url: '/cetc/flow/business/getBusinessById',
        method: 'get',
        params: {
            businessId
        }
    })
};

export const getActbusinessDataList = (currentPage, pageSize, params) => {
    return request({
        url: '/cetc/flow/business/getByCondition',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};

export const getFlowDataList = (currentPage, pageSize, params) => {
    return request({
        url: '/cetc/flow/statistics/getAllDataList',
        method: 'get',
        params: {
            ...params,
            currentPage,
            pageSize,
        }
    })
};

export const getFlowDataDetailNumber = (flowtypeCode) => {
    return request({
    url: '/cetc/flow/statistics/detailNumber',
    method: 'get',
    params: {
        flowtypeCode
    }
})
};

export const getFlowDataDetailDepartAverageTime = (params) => {
    return request({
        url: '/cetc/flow/statistics/detailDepartAverageTime',
        method: 'get',
        params: {
            ...params
        }
    })
};

export const findDepartAverageTimeTopFive = (params) => {
    return request({
        url: '/cetc/flow/statistics/findDepartAverageTimeTopFive',
        method: 'get',
        params: {
            ...params
        }
    })
};


export const getFlowDataDetailNodeAverageTime = (params) => {
    return request({
        url: '/cetc/flow/statistics/detailNodeAverageTime',
        method: 'get',
        params: {
            ...params
        }
    })
};


export const getFlowDataDetailFormDistributed = (params) => {
    return request({
        url: '/cetc/flow/statistics/detailApplyFormDistributed',
        method: 'get',
        params: {
            ...params
        }
    })
};

/**
 *
 * 本部门审批的平均时间
 * @param params
 */
export const findDepartAverageTimeTrend = (params) => {
    return request({
        url: '/cetc/flow/statistics/findDepartAverageTimeTrend',
        method: 'get',
        params: {
            ...params
        }
    })
};

/**
 * 查询每个部门审批的平均时间
 * @param params
 */
export const findEveryDepartAverageTimeTrend = (params) => {
    return request({
        url: '/cetc/flow/statistics/findEveryDepartAverageTimeTrend',
        method: 'get',
        params: {
            ...params
        }
    })
};

/**
 * 查询申请流程的数量
 * @param userId
 */
export const findApplyFlowList = (userId) => {
    return request({
        url: '/cetc/flow/business/getActbusinessListByUserId',
        method: 'get',
        params: {
            userId
        }
    })
};

/**
 * 查询建设部门的详细信息，包括建设单数，空单数等等
 * @param params
 */
export const findBuildDepartFlowDetailStatistics = (params) => {
    return request({
        url: '/cetc/flow/statistics/findBuildDepartFlowDetailStatistics',
        method: 'get',
        params: {
            ...params
        }
    })
};

export const renderUserFlowDetailChart = (params) => {
    return request({
        url: '/cetc/flow/statistics/renderUserFlowCharts',
        method: 'get',
        params: {
            ...params
        }
    })
};

/**
 * 一段时间内获取申请数量
 * @param params
 * @returns {AxiosPromise}
 */
export const getApplyFlowNumbers = (params) => {
    return request({
        url: '/cetc/flow/business/getApplyFlowNumbers',
        method: 'get',
        params: {
            ...params
        }
    })
};

/**
 * 一段时间内获取审批数量
 * @param params
 * @returns {AxiosPromise}
 */
export const getHandleFlowNumbers = (params) => {
    return request({
        url: '/cetc/flow/statistics/countHandleFlowNum',
        method: 'get',
        params: {
            ...params
        }
    })
};

export const getBuildDepartFlowDetail = (params) => {
    return request({
        url: '/cetc/flow/statistics/getBuildDepartFlowDetail',
        method: 'get',
        params: {
            ...params
        }
    })
};

export const getEmptyOrderDetail = (params) => {
    return request({
        url: '/cetc/flow/statistics/getEmptyOrderDetail',
        method: 'get',
        params: {
            ...params
        }
    })
};

export const getBasicDataFlowChart = (params) => {
    return request({
        url: '/cetc/flow/statistics/getBasicDataFlowChart',
        method: 'get',
        params: {
            ...params
        }
    })
};


export const getFlowFields = (flowTypeId) => {
    return request({
        url: '/cetc/flow/statistics/getFlowFields',
        method: 'get',
        params: {
            flowTypeId
        }
    })
};