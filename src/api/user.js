import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const loginByUsername = (tenantId, username, password, type) => request({
  url: '/cetc/login',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId
  },
  params: {
    tenantId,
    username,
    password,
    grant_type: "password",
    scope: "all",
    type
  }
});

export const refreshToken = (refresh_token, tenantId) => request({
  url: '/api/blade-auth/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId
  },
  params: {
    tenantId,
    refresh_token,
    grant_type: "refresh_token",
    scope: "all",
  }
});

export const getButtons = () => request({
  url: '/cetc/system/permission/buttons',
  method: 'get'
});

/**
 * 获取当前用户的信息
 * @returns {AxiosPromise}
 */
export const getUserInfo = () => request({
  url: baseUrl + '/cetc/system/user/info',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
});

export const logout = () => request({
  url: baseUrl + '/user/logout',
  method: 'get'
});
