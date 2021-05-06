import request from '@/utils/request';
import { message } from 'antd';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function getTodoList() {
  return  request(`/tododata/users`,{
    method:"get"
  })
}


export async function addTodoItem(values:any) {
  return  request(`/tododata/users/`,{
    method:"post",
    data:values
  }).then(()=>{
    message.success('添加成功');
  }).catch((err)=>{
    message.error('添加失败！');
  })
}

export async function editTodoItem(values:any) {
  return  request(`/tododata/users/${values.id}`,{
    method:"put",
    data:values
  }).then(()=>{
    message.success('更新成功')
  }).catch((err)=>{
    message.error('更新失败！')
  })
}

export async function deleteTodoItem(id:number) {
  return  request(`/tododata/users/${id}`,{
    method:"delete"
  }).then(()=>{
    message.success("删除成功！");
  }).catch((err)=>{
    console.log(err);
    message.error("删除失败！");
  })
}

//其他
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/v1/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLogout(params: {}) {
  return request('/api/v1/user/logout', {
    method: 'POST',
    data: params,
  });
}
