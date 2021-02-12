import { Layout, Carousel } from "antd";
const { Content } = Layout;

const Home = () => {
  return (
    <Content className="content-style">
      <Carousel autoplay style={{ width: "90vw" }}>
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
  );
};

export default Home;
