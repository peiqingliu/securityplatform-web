import request from '@/router/axios';

// 文件上传接口
export const uploadFile = "/cetc/upload/file";

export const getList = (currentPage, pageSize, params) => {
  return request({
    url: '/cetc/system/user/getByCondition',
    method: 'get',
    params: {
      ...params,
      currentPage,
      pageSize,
    }
  })
};

export const searchUserByName = (username) => {
  return request({
    url: '/cetc/system/user/searchByName/'+username,
    method: 'get',
  })
};

export const findUserByDeptId = (deptId) => {
  return request({
    url: '/cetc/system/user/findUserByDeptId',
    method: 'get',
    params:{
      deptId
    }
  })
};

export const remove = (ids) => {
  return request({
    url: '/cetc/system/user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/user/admin/add',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/user/update',
    method: 'post',
    data: row
  })
};

export const getUser = (id) => {
  return request({
    url: '/cetc/system/user/detail',
    method: 'get',
    params: {
      id,
    }
  })
};

export const getUserInfo = () => {
  return request({
    url: '/cetc/system/user/info',
    method: 'get',
  })
};

export const resetPassword = (userIds) => {
  return request({
    url: '/cetc/system/user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
};

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/cetc/system/user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    }
  })
};

export const findRoleListByUserId = (userId) => {
  return request({
    url: '/cetc/system/user/findRoleListByUserId',
    method: 'get',
    params: {
      userId
    }
  })
};

/**
 * 根据用户ids，获取角色信息
 * @param userId
 * @returns {AxiosPromise}
 */
export const getUserRoleTree = (userId) => {
  return request({
    url: '/cetc/system/role/role-tree-keys',
    method: 'get',
    params: {
      userId,
    }
  })
};

export const getSelectedDeptTree = (userId) => {
  return request({
    url: '/cetc/system/role/dept-tree-keys',
    method: 'get',
    params: {
      userId,
    }
  })
};


export const getSelectedAllFlows = (userId) => {
  return request({
    url: '/cetc/system/role/findAllFlowByUserId',
    method: 'get',
    params: {
      userId
    }
  })
};

export const findAllListByUserId = (userId) => {
    return request({
        url: '/cetc/system/approval/permission/findAllListByUserId',
        method: 'get',
        params: {
            userId
        }
    })
};


export const grant = (userIds,roleIds_0, roleIds_1,paramIds, flowIds) => {
  return request({
    url: '/cetc/system/user/grant',
    method: 'post',
    params: {
      userIds,
      roleIds_0,
      roleIds_1,
      paramIds,
      flowIds
    }
  })
};

export const grantApprovalPermission = (approvalPermissions) => {
  return request({
    url: '/cetc/system/user/grantApprovalPermission',
    method: 'post',
    data: approvalPermissions
  })
};


/**
 * 根据角色查询用户
 */
export const findAllUserByRoleId = (roleId) => {
  return request({
    url: '/cetc/system/approval/permission/findAllListByRoleId',
    method: 'get',
    params:{
      roleId
    }
  })
};

export const deleteUserRole = (userId,roleId) => {
  return request({
    url: 'cetc/system/user/role/delete',
    method: 'post',
    params: {
      userId,
      roleId
    }
  })
};

export const deleteRdfById = (id) => {
  return request({
    url: '/cetc/system/rdf/remove',
    method: 'post',
    params: {
      id,
    }
  })
};

export const deleteRdfByRoleId = (roleId) => {
  return request({
    url: '/cetc/system/rdf/remove',
    method: 'post',
    params: {
      roleId,
    }
  })
};

export const deleteRdfByRole = (rdf) => {
  return request({
    url: '/cetc/system/approval/permission/deleteRdfByRole',
    method: 'post',
    data: rdf
  })
};

export const deleteRdfByFactor = (rdf) => {
  return request({
    url: '/cetc/system/approval/permission/deleteRdfByFactor',
    method: 'post',
    data: rdf
  })
};

export const deleteRdfByFlowtype = (rdf) => {
  return request({
    url: '/cetc/system/approval/permission/deleteRdfByFlowtype',
    method: 'post',
    data: rdf
  })
};