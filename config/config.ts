import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';

import darkTheme from '@ant-design/dark-theme'


const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          //authority: ['admin', 'user'],
          routes: [
            {
              path: '/dashboard',
              name: 'dashboard',
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
          {
              path:'/cluster',
              name:'集群管理',
              icon:'cluster',
          },
          {
              path:'/workload',
              name:'工作负载',
              icon:'cluster',
          },
        //   {
        //     path:'/server',
        //     name:'服务',
        //     icon:'cloud',
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
        {
            path:'/ci',
            name:'CICD',
            icon:'ci',
        },
          {
              path:'/manager',
              name:'manager',
              icon:'smile',
              routes:[
              {
                  name:'add',
                  path:'/manager/add',
                  component:'./manager/add',
                  routes: [
                  {
                      name: 'b1',
                      path: '/manager/add',
                      component: './manager/components/b2',
                      hideInMenu:true
                  },
                  {
                      name: 'b1',
                      path: '/manager/add/b1',
                      component: './manager/components/b1',
                      hideInMenu:true
                  },
                  {
                      name: 'b2',
                      path: '/manager/add/b2',
                      component: './manager/components/b2',
                      hideInMenu:true
                  },
                  
                  ],
              }]
          },
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    //...darkTheme,
    
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },

   proxy: {
    '/base/v1': {
      target: 'http://10.200.100.200:8080/',
      changeOrigin: true,
      // pathRewrite: { '^/nezha': '' },
    },
  },
} as IConfig;
