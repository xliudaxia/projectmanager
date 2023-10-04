import request from '@/utils/request';

export type AddProjectItemParamsType = {
  projectName: string;
  projectDescription: string;
  projectadmin: string;
  projectStatus: string;
};

export type UpdateProjectItemParamsType = {
  id: number;
  projectname: string;
  projectdescription: string;
  projectstatus: string;
  CreatedAt: string;
  UpdatedAt: string;
  projectadmin: string;
};



export async function GetProjectList() {
  return request(`/api/v1/projectlist`);
}

export async function QueryProjectList(keyword:string) {
  return request(`/api/v1/queryproject?keyword=${keyword}`);
}

export async function AddProjectItem(params: AddProjectItemParamsType) {
  return request('/api/v1/project', {
    method: 'POST',
    data: params,
  });
}

export async function DelProject(params: { id: number }) {
  return request('/api/v1/project', {
    method: 'DELETE',
    data: params,
  });
}

export async function UpdateProject(params: UpdateProjectItemParamsType) {
  return request('/api/v1/project', {
    method: 'PUT',
    data: params,
  });
}
