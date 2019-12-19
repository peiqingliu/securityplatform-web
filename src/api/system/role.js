import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/cetc/system/role/getByCondition',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
};
export const grantTree = () => {
  return request({
    url: '/cetc/system/permission/grant-tree',
    method: 'get',
  })
};

export const grant = (roleIds, menuIds, dataScopeIds, apiScopeIds) => {
  return request({
    url: '/cetc/system/role/grant',
    method: 'post',
    data: {
      roleIds,
      menuIds,
      dataScopeIds,
      apiScopeIds
    }
  })
};

export const remove = (ids) => {
  return request({
    url: '/cetc/system/role/remove',
    method: 'post',
    params: {
      ids,
    }
  })
};

export const add = (row) => {
  return request({
    url: '/cetc/system/role/submit',
    method: 'post',
    data: row
  })
};

export const update = (row) => {
  return request({
    url: '/cetc/system/role/edit',
    method: 'put',
    data: row
  })
};


export const getRole = (roleIds) => {
  return request({
    url: '/cetc/system/permission/role-tree-keys',
    method: 'get',
    params: {
      roleIds,
    }
  })
};

export const getRoleTree = (tenantId,roleType) => {
  return request({
    url: '/cetc/system/role/tree',
    method: 'get',
    params: {
      tenantId,
      roleType
    }
  })
};

export const getBasicTable = (tenantId) => {
    return request({
        url: '/cetc/relation/role/basicTableList',
        method: 'get',
        params: {
            tenantId
        }
    })
};

export const getBasicTableData = (tenantId,roleId) => {
  return request({
    url: '/cetc/system/user/getBasicTableData',
    method: 'get',
    params: {
      tenantId,
        roleId
    }
  })
};