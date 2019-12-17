import request from '@/router/axios';


export const merge = (data) => {
    return request({
        url: '/upload/merge',
        method: 'get',
        params: {
            ...data
        }
    })
};

export const checkBlock = (data) => {
    return request({
        url: '/upload/checkBlock',
        method: 'post',
        data:data
    })
};