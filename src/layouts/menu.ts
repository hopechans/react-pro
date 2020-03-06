export const menu = [
    {
        path: '/',
        redirect: '/dashboard/analysis',
      },
    {
        path: '/dashboard',
        name: '仪表盘',
        icon: 'dashboard',
        routes: [
            {
                name: 'analysis',
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
            },
            {
                name: 'workplace',
                path: '/dashboard/workplace',
                component: './dashboard/workplace',
            },
        ],
    },
    // {
    //     path:'/cluster',
    //     name:'集群管理',
    //     icon:'cluster',
    // },
    {
        path:'/workload',
        name:'工作负载',
        icon:'fund',
    },
    {
        path:'/tenant',
        name:'租户管理',
        icon:'user',
        routes: [
            {
                name: '部门管理',
                path: '/tenant/deptManager',
                component: './tenant/dept/deptManager',
            },
            {
                name: '角色权限',
                path: '/tenant/roleManager',
                component: './tenant/role/roleManager',
            },
            {
              name: '人员管理',
              path: '/tenant/userManager',
              component: './tenant/user/userManager',
          },
        ],
      },
    // {
    //   path:'/server',
    //   name:'服务',
    //   icon:'cloud',
    // },
    // {
    //     path:'/application',
    //     name:'应用',
    //     icon:'appstore',
    // },
    // {
    //     path:'/config',
    //     name:'配置',
    //     icon:'setting',
    // },
    // {
    //     path:'/store',
    //     name:'存储',
    //     icon:'database',
    // },
    {
        path:'/ci',
        name:'CI CD',
        icon:'ci',
    },
    // {
    //     path:'/manager',
    //     name:'manager',
    //     icon:'smile',
    //     routes:[
    //     {
    //         name:'add',
    //         path:'/manager/add',
    //         component:'./manager/add',
    //         routes: [
    //         {
    //             name: 'b1',
    //             path: '/manager/add',
    //             component: './manager/components/b2',
    //             hideInMenu:true
    //         },
    //         {
    //             name: 'b1',
    //             path: '/manager/add/b1',
    //             component: './manager/components/b1',
    //             hideInMenu:true
    //         },
    //         {
    //             name: 'b2',
    //             path: '/manager/add/b2',
    //             component: './manager/components/b2',
    //             hideInMenu:true
    //         },
            
    //         ],
    //     }]
    // }
]