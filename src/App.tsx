import { Layout } from "antd";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route } from "react-router-dom";
import Authenticate from "./components/Authenticate";

function App() {
  return (
    <Layout className="height-100">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/authenticate" component={Authenticate} />
      <Footer />
    </Layout>
  );
}

export default App;
