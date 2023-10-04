import request from '@/utils/request';

export async function queryBubble() {
  return request('/api/v1/todo',{
    headers:{
      'M-Token':`${localStorage.getItem('M-Token')}`
    }
  });
}

export async function triggerBubble(id: number, status: boolean) {
  return request('/api/v1/todo/' + `${id}`, {
    method: 'PUT',
    headers:{
      'M-Token':`${localStorage.getItem('M-Token')}`
    },
    data: {
      status: !status,
    },
  });
}

export async function deleteBubble(id: number) {
  return request('/api/v1/todo/' + `${id}`, {
    method: 'DELETE',
    headers:{
      'M-Token':`${localStorage.getItem('M-Token')}`
    }
  });
}

export async function addBubble(content: string) {
  return request('/api/v1/todo', {
    method: 'POST',
    headers:{
      'M-Token':`${localStorage.getItem('M-Token')}`
    },
    data: {
      title: content,
    },
  });
}
