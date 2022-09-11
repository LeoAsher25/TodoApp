import {
  AppstoreOutlined,
  FileDoneOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderUserWrap from "src/components/HeaderUserWrap";
import NotificationWrap from "src/components/NotificationWrap";
import { routerPaths } from "src/constant";
import "./PageWrap.scss";

const PageWrap = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
  }, []);

  return (
    <div className="page-wrap">
      <Layout>
        <Sider
          breakpoint="lg"
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
        >
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
                label: <NavLink to={routerPaths.HOME}>Dashboard</NavLink>,
              },
              {
                key: "2",
                icon: <TeamOutlined />,
                label: <NavLink to={routerPaths.USER}>User</NavLink>,
              },
              {
                key: "3",
                icon: <FileDoneOutlined />,
                label: <NavLink to={routerPaths.TODO}>To Do</NavLink>,
              },
              {
                key: "4",
                icon: <SettingOutlined />,
                label: <NavLink to={routerPaths.SETTING}>Setting</NavLink>,
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
              <div className="action-wrap">
                <NotificationWrap />
                <HeaderUserWrap />
              </div>
            </div>
          </Header>
          <Content className="">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageWrap;
