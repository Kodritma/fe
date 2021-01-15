import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext";
import logo from "../images/logo.png";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { isLoggedIn, picture } = useContext(AuthContext);

  const avatar = (
    <img
      src={picture}
      alt="Kullanıcı Profil Resmi"
      style={{ width: 24, borderRadius: 12 }}
    />
  );

  return (
    <AntHeader className="header">
      <img src={logo} alt="Kodritma Logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">Algoritma Alıştırmaları</Menu.Item>
        <Menu.Item key="2">Videolu Dersler</Menu.Item>
        <Menu.Item key="3">Forum</Menu.Item>
        <Menu.Item key="4">Blog</Menu.Item>
        {!isLoggedIn ? (
          <Menu.Item key="5">
            <Link to="/login">Üye Girişi</Link>
          </Menu.Item>
        ) : (
          <SubMenu key="sub1" icon={avatar} title="Panel">
            <Menu.Item key="7">Profil</Menu.Item>
            <Menu.Item key="8">Ayarlar</Menu.Item>
            <Menu.Item key="9">
              <Link to="/logout">Çıkış Yap</Link>
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </AntHeader>
  );
};

export default Header;
