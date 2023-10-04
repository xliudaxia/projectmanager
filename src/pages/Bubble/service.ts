import request from '@/utils/request';

export async function queryBubble() {
  return request('/api/v1/todo');
}

export async function triggerBubble(id: number, status: boolean) {
  return request('/api/v1/todo/' + `${id}`, {
    method: 'PUT',
    data: {
      status: !status,
    },
  });
}

export async function deleteBubble(id: number) {
  return request('/api/v1/todo/' + `${id}`, {
    method: 'DELETE',
    
  });
}

export async function addBubble(content: string) {
  return request('/api/v1/todo', {
    method: 'POST',
    data: {
      title: content,
    },
  });
}
