﻿export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
          {
            name: 'newlogin',
            path: '/user/newlogin',
            component: './NewLogin',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/todolist',
                name: 'todo-list',
                icon: 'smile',
                component: './TodoList',
              },
              {
                path: '/projectlist',
                name: 'project-list',
                icon: 'dashboard',
                routes: [
                  {
                    path: '/projectlist/main',
                    name: 'project-main',
                    icon: 'smile',
                    component: './ProjectList',
                  },
                  {
                    path: '/projectlist/projectdetail',
                    name: 'project-detail',
                    icon: 'smile',
                    component: './ProjectDetail',
                  }
                ],
              },
              {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'smile',
                component: './Dashboard',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  }
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
