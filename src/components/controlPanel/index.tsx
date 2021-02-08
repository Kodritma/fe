import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  CarryOutOutlined,
  FileTextOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Home from "./Home";
import Progress from "./Progress";
import Profile from "./Profile";
import Settings from "./Settings";
import Playlist from "./Playlist";

const { Content, Sider } = Layout;

function Panel() {
  const [selected, setSelected] = useState<string>("0");

  const renderPanelContent = () => {
    switch (selected) {
      case "1":
        return <Progress />;
      case "2":
        return <Profile />;
      case "3":
        return <Settings />;
      case "4":
        return <Playlist />;
      case "0":
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
          <Menu.Item icon={<FileTextOutlined />} key="0">
            Özet
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} key="1">
            Seviye Detayları
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="2">
            Profil
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />} key="3">
            Ayarlar
          </Menu.Item>
          <Menu.Item icon={<OrderedListOutlined />} key="4">
            Çalma Listeleri
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>{renderPanelContent()}</Content>
    </Layout>
  );
}

export default Panel;
