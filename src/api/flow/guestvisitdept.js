import request from "@/router/axios";

/**
 *  获取全不数据
 * @param tenantId
 * @returns {AxiosPromise}
 */
export const getList = (tenantId) => {
    return request({
        url: '/cetc/flow/guestVisitDept/list',
        method: 'get',
        params: {
            tenantId
        }
    })
};
