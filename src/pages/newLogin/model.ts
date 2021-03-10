import { fakeAccountLogin } from './service';
import { Effect, history, Reducer } from 'umi';
import { parse } from 'qs';



export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // hard code
  // reload Authorized component
  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}

const Model = {
  namespace:"login1",
  state:{
  },
  effects:{
    *login({ payload,callback },{ call,put }){
      const response =  yield call(fakeAccountLogin,payload)
      console.log(response)
      yield put({
        type:"loginInfo",
        payload:response
      })
      if(callback){
        callback(response);
      }
      // Login successfully
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/');
      }
    }

  },
  reducers:{
    loginInfo(state,{payload}){
      // console.log('reduce接收内容', state,payload)
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        message:payload.message,
      };
    }

  }

};
export default Model