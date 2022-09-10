import {
  AppstoreOutlined,
  FileDoneOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderUserWrap from "src/components/HeaderUserWrap";
import { RouterPaths } from "src/types/commonType";
import "./PageWrap.scss";

const PageWrap = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="page-wrap">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <span style={{ fontSize: 24, fontWeight: 700 }}>AIBB</span>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: <NavLink to={RouterPaths.HOME}>Dashboard</NavLink>,
              },
              {
                key: "2",
                icon: <TeamOutlined />,
                label: <NavLink to={RouterPaths.USER}>User</NavLink>,
              },
              {
                key: "3",
                icon: <FileDoneOutlined />,
                label: <NavLink to={RouterPaths.TODO}>To Do</NavLink>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="header-wrap">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <HeaderUserWrap />
            </div>
          </Header>
          <Content className="">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Outlet />
    </div>
  );
};

export default PageWrap;
