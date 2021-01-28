import { Layout } from "antd";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import AuthProvider from "./authContext";
import Logout from "./components/Logout";
import ControlPanel from "./components/controlPanel";

function App() {
  return (
    <AuthProvider>
      <Layout className="height-100">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/authenticate" component={Authenticate} />
        <Route exact path="/user/panel" component={ControlPanel} />
        <Footer />
      </Layout>
    </AuthProvider>
  );
}

export default App;
