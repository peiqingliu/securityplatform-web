import request from '@/router/axios';


/**
 * 首页数据统计
 * @param id
 */
export const getWelStatistics = () => {
    return request({
        url: '/us/system/welStatistics',
        method: 'get',
        params: {}
    })
};