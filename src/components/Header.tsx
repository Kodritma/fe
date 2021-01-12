import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="header">
      <img src={logo} alt="Kodritma Logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">Algoritma Alıştırmaları</Menu.Item>
        <Menu.Item key="2">Videolu Dersler</Menu.Item>
        <Menu.Item key="3">Forum</Menu.Item>
        <Menu.Item key="4">Blog</Menu.Item>
        <Menu.Item key="5">
          <Link to="/login">Üye Girişi</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
