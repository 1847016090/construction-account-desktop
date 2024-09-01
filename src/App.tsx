import Material from '@/manage/material';
import Person from '@/manage/person';
import { DesktopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Route, RouteProps, Routes, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

type MItem = MenuItem &
  RouteItem & {
    path?: string;
    label?: string;
    children?: MItem[];
  };

const items: MItem[] = [
  {
    label: '首页',
    key: '/',
    icon: <DesktopOutlined />,
    element: <Person />,
  },
  {
    label: '配置',
    key: '/setting',
    icon: <DesktopOutlined />,
    element: <Material />,
    children: [
      {
        label: '人员管理',
        key: '/setting/person',
        element: <Person />,
      },
      {
        label: '材料管理',
        key: '/setting/material',
        element: <Material />,
      },
    ],
  },
];
type RouteItem = {
  name?: string;
  element?: React.ReactElement;
  path?: string;
};

const flatRoute = (routeList: MItem[]) => {
  const routes: RouteProps[] = [];
  const deep = (items: MItem[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.forEach((route: any) => {
      const { children, key, ...rest } = route;
      if (children) {
        deep(children);
      }
      routes.push({ ...rest, path: key });
    });
  };

  deep(routeList);

  return routes;
};

const routes: RouteProps[] = flatRoute(items);

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, .2)' }}
          className="m-4 h-8 rounded-md"
        ></div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={(info) => {
            console.log('info');
            navigate(info.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {routes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
