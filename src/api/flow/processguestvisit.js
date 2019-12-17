import request from "@/router/axios";

export const getStatisticsCherts = (applyUser) => {
    return request({
        url: '/cetc/desk/process/guestvisit/statistics/echarts',
        method: 'get',
        params: {
            applyUser
        }
    })
};

export const getStatisticsChertsPie = () => {
    return request({
        url: '/cetc/desk/process/guestvisit/statistics/echarts/pie',
        method: 'get',
        params: {
        }
    })
};