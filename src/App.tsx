import { Layout } from "antd";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route } from "react-router-dom";

function App() {
  return (
    <Layout className="height-100">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Footer />
    </Layout>
  );
}

export default App;
