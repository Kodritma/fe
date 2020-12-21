import { Layout, Menu, Carousel } from "antd";
import logo from "./images/logo.png";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="height-100">
      <Header className="header">
        <img src={logo} />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Algoritma Alıştırmaları</Menu.Item>
          <Menu.Item key="2">Videolu Dersler</Menu.Item>
          <Menu.Item key="3">Forum</Menu.Item>
          <Menu.Item key="4">Blog</Menu.Item>
          <Menu.Item key="5">Üye Girişi</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Carousel autoplay style={{width:"90vw"}}>
          <div>
            <h3 className="carousel-title">1</h3>
          </div>
          <div>
            <h3 className="carousel-title">2</h3>
          </div>
          <div>
            <h3 className="carousel-title">3</h3>
          </div>
          <div>
            <h3 className="carousel-title">4</h3>
          </div>
        </Carousel>
      </Content>
      <Footer style={{ textAlign: "center" }}>Kodritma © 2020</Footer>
    </Layout>
  );
}

export default App;
