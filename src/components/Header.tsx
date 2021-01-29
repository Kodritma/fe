import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { AuthContext } from "../authContext";
import logo from "../images/logo.png";
import googleLoginUrl from "../utils/googleLoginUrl";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { isLoggedIn, loading, picture, logout } = useContext(AuthContext);
  const history = useHistory();

  const avatar = (
    <img
      src={picture}
      alt="Kullanıcı Profil Resmi"
      style={{ width: 24, borderRadius: 12 }}
    />
  );

  return (
    <AntHeader className="header">
      <Link to="/">
        <img src={logo} alt="Kodritma Logo" />
      </Link>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">Algoritma Alıştırmaları</Menu.Item>
        <Menu.Item key="2">Videolu Dersler</Menu.Item>
        <Menu.Item key="3">
          <a href="https://forum.kodritma.com" title="Kodritma Forum">
            Forum
          </a>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="https://blog.kodritma.com" title="Kodritma Blog">
            Blog
          </a>
        </Menu.Item>
        {!loading && !isLoggedIn ? (
          <Menu.Item key="5">
            <a href={googleLoginUrl} title="Üye Girişi">
              Üye Girişi
            </a>
          </Menu.Item>
        ) : (
          <SubMenu
            key="sub1"
            title={<>Kontrol Paneli {avatar}</>}
            className="panel-menu"
            onTitleClick={() => history.push("/user/panel")}
          >
            <Menu.Item key="9">
              <Link to="/" onClick={logout} title="Çıkış Yap">
                Çıkış Yap
              </Link>
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </AntHeader>
  );
};

export default Header;
