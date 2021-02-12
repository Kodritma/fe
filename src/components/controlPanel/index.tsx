import { useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  CarryOutOutlined,
  FileTextOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import PanelHome from "./PanelHome";
import Progress from "./Progress";
import Profile from "./Profile";
import Settings from "./Settings";
import Playlist from "./Playlist";

const { Content, Sider } = Layout;

function Panel() {
  const [selected, setSelected] = useState<string>("0");

  let { path, url } = useRouteMatch();

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
            <Link to={`${url}`}>Özet</Link>
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} key="1">
            <Link to={`${url}/progress`}>Seviye Detayları</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="2">
            <Link to={`${url}/profile`}>Profil</Link>
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />} key="3">
            <Link to={`${url}/settings`}>Ayarlar</Link>
          </Menu.Item>
          <Menu.Item icon={<OrderedListOutlined />} key="4">
            <Link to={`${url}/playlist`}>Çalma Listeleri</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Switch>
          <Route path={path} exact component={PanelHome} />
          <Route path={`${path}/progress`} component={Progress} />
          <Route path={`${path}/profile`} component={Profile} />
          <Route path={`${path}/settings`} component={Settings} />
          <Route path={`${path}/playlist`} component={Playlist} />
        </Switch>
      </Content>
    </Layout>
  );
}

export default Panel;
