import request from 'umi-request';
// import Constants from '@/utils/constant'

export async function fakeAccountLogin(params: any) {
  // 登录页面实际调用流程
  return request(`/api/v2/login`, {
    method: 'POST',
    data: params,
  });
}
