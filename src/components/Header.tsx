import { Layout, Menu } from "antd";
import logo from "../images/logo.png";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="header">
      <img src={logo} />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">Algoritma Alıştırmaları</Menu.Item>
        <Menu.Item key="2">Videolu Dersler</Menu.Item>
        <Menu.Item key="3">Forum</Menu.Item>
        <Menu.Item key="4">Blog</Menu.Item>
        <Menu.Item key="5">Üye Girişi</Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
