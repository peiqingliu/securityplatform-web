import request from '@/router/axios';

export const getApprovalPermissionTree = () => {
    return request({
        url: '/cetc/system/approval/permission/approvalPermissionTree',
        method: 'get',
        params: {
        }
    })
};

export const userContainPermission = (userId) => {
    return request({
        url: '/cetc/system/approval/permission/getAllRolePermissionByUserId',
        method: 'get',
        params: {
            userId
        }
    })
};