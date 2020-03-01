/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
  PageLoading,
  SettingDrawer,
} from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { isAntDesignPro, getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
import { SmileOutlined, HeartOutlined, DashboardOutlined} from '@ant-design/icons';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  dashboard:<DashboardOutlined />
};

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

let defaultMenus:Array<object> =  [   {
  path: '/dashboard',
  name: 'dashboard',
  icon: 'dashboard',
  routes: [
    {
      name: 'analysis',
      icon: 'smile',
      path: '/dashboard/analysis',
      component: './dashboard/analysis',
    },
    // {
    //   name: 'monitor',
    //   icon: 'smile',
    //   path: '/dashboard/monitor',
    //   component: './dashboard/monitor',
    // },
    {
      name: 'workplace',
      icon: 'smile',
      path: '/dashboard/workplace',
      component: './dashboard/workplace',
    },
  ],
},{
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
  }]



const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));


const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = <DefaultFooter copyright="2020 亚美科技" links={[]} />;

const footerRender: BasicLayoutProps['footerRender'] = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};



const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMenuData([]);
    setLoading(true);
    setTimeout(() => {
      setMenuData(defaultMenus);
      setLoading(false);
    }, 2000);
  }, [index]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {

    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <>
      <ProLayout
        logo={logo}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        menuRender={(_, dom) =>
          loading ? (
            <div
              style={{
                width: 256,
                backgroundColor:'transparent',
                height: '100%',
              }}
            >
              <PageLoading />
            </div>
          ) : (
            dom
          )
        }
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={() => loopMenuItem(menuData)}
        // menuDataRender={() => menuData}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
