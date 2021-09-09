import React, { useState } from 'react';
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
//import { useSelector } from 'react-redux';
//import { Counter } from './features/counter/Counter';
//import { Textdisplay } from './features/textdisplay/Textdisplay';
//import { Cosmonauts } from '../../features/cosmonauts/Cosmonauts';
//import {
//  selectDisplay,
//} from './features/textdisplay/displaySlice';
import '../..//App.css';
import { Layout, Menu, Button } from 'antd';
import { Typography } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

async function onLogout () {
  await signOut();
  window.location.href = "/";
}

export function Mainscreen() {
  const [collapsed, setCollapsed] = useState(true);
  const collapsing = () => setCollapsed(!collapsed);

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={collapsing}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
          <Title>Feline information system</Title>
          <Button onClick={onLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>Kittun Inc. All rights reserved.</Footer>
        </Layout>
      </Layout>
  );
}

//export default Mainscreen;