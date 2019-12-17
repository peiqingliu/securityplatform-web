import request from "@/router/axios";

/**
 * 多条件分页查询
 * @param current
 * @param size
 * @param params
 * @returns {AxiosPromise}
 */
export const getList = (current, size, params) => {
    return request({
        url: '/cetc/flow/type/getByCondition',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
};

export const remove = (ids) => {
    return request({
        url: '/cetc/flow/type/remove',
        method: 'post',
        params: {
            ids,
        }
    })
};

export const add = (row) => {
    return request({
        url: '/cetc/flow/type/submit',
        method: 'post',
        data: row
    })
};

export const update = (row) => {
    return request({
        url: '/cetc/flow/type/update',
        method: 'put',
        data: row
    })
};

export const getFlow = (id) => {
    return request({
        url: '/cetc/flow/type/detail',
        method: 'get',
        params: {
            id,
        }
    })
};

export const getFlowList = (tenantId) => {
    return request({
        url: '/cetc/flow/type/list',
        method: 'get',
        params: {
            tenantId,
        }
    })
};

/**
 * 根绝角色关系表单选择表单
 * @param roleId
 * @returns {AxiosPromise}
 */
export const getFlowListByRole = (roleId) => {
    return request({
        url: '/cetc/flow/type/listByRoleId',
        method: 'get',
        params: {
            roleId
        }
    })
};

export const getFlowTypeTree = (tenantId,code,name) => {
    return request({
        url: '/cetc/flow/type/tree',
        method: 'get',
        params: {
            tenantId,
            code,
            name
        }
    })
};

export const getFlowTypeChildrenList = (tenantId) => {
    return request({
        url: '/cetc/flow/type/childrenList',
        method: 'get',
        params: {
            tenantId,
        }
    })
};

export const getFlowtypeById = (id) => {
  return request({
      url: '/cetc/flow/type/findFlowTypeById',
      method: 'get',
      params: {
          id
      }
  })
};