import { useState } from "react";
import { Layout, Menu } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

import Home from "./Home";
import Progress from "./Progress";
import Profile from "./Profile";
import Settings from "./Settings";

const { Content, Sider } = Layout;

function Panel() {
  const [selected, setSelected] = useState<string>("");

  const renderPanelContent = () => {
    switch (selected) {
      case "1":
        return <Progress />;
      case "2":
        return <Profile />;
      case "3":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout className="site-layout-background">
      <Sider collapsible className="site-layout-background" width={250}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => setSelected(String(key))}
          selectedKeys={[selected]}
        >
          <Menu.Item icon={<UserOutlined />} key="1">
            Seviye Detayları
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="2">
            Profil
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />} key="3">
            Ayarlar
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        {renderPanelContent()}
      </Content>
    </Layout>
  );
}

export default Panel;
