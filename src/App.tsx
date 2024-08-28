import { DesktopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Material from './manage/material';
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

type MItem = MenuItem &
  RouteItem & {
    path?: string;
    label?: string;
  };

const items: MItem[] = [
  {
    label: '首页',
    key: 'home',
    icon: <DesktopOutlined />,
    path: '/',
    element: <Material />,
  },
  {
    label: '材料管理',
    key: 'material',
    icon: <DesktopOutlined />,
    path: '/manage/material',
    element: <Material />,
  },
];
type RouteItem = {
  name?: string;
  element?: React.ReactElement;
};

const routes: RouteItem[] = items.map((i: MItem) => ({
  name: i.label,
  path: i.path,
  element: i.element,
}));

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  console.log('Material', Material);

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
          // onClick={() => navigate('/manage/material')}
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
            <RouterProvider router={router} />
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
