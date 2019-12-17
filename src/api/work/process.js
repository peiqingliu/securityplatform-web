import request from '@/router/axios';

// =====================参数===========================

export const historyFlowList = (processInstanceId) => {
  return request({
    url: '/api/blade-flow/process/history-flow-list',
    method: 'get',
    params: {
      processInstanceId
    }
  })
}


// =====================请假流程===========================

export const leaveProcess = (data) => {
  return request({
    url: '/api/blade-desk/process/leave/start-process',
    method: 'post',
    data
  })
}

export const leaveDetail = (businessId) => {
  return request({
    url: '/api/blade-desk/process/leave/detail',
    method: 'get',
    params: {
      businessId
    }
  })
};

/*******************************邮寄物资********************************/

export const materialProcess = (data) => {
  return request({
    url: '/api/blade-desk/process/material/start-process',
    method: 'post',
    data
  })
};

export const materialDetail = (businessId) => {
  return request({
    url: '/api/blade-desk/process/material/detail',
    method: 'get',
    params: {
      businessId
    }
  })
};

/******************************报销***************************************/

export const reimburseProcess = (data) => {
  return request({
    url: '/api/blade-desk/process/reimburse/start-process',
    method: 'post',
    data
  })
};

export const reimburseDetail = (businessId) => {
  return request({
    url: '/api/blade-desk/process/reimburse/detail',
    method: 'get',
    params: {
      businessId
    }
  })
};
