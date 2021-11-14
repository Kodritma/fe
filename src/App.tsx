// Global
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

// Local imports
import AuthProvider from "./authContext";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Authenticate from "./components/Authenticate";
import ControlPanel from "./components/controlPanel";
import VideoTutorials from "./components/videoTutorials";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Layout className="height-100">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/authenticate" component={Authenticate} />
          <Route path="/videolu-dersler" component={VideoTutorials} />
          <Route path="/user/panel" component={ControlPanel} />
        </Switch>
        <Footer />
      </Layout>
    </AuthProvider>
  );
}

export default App;
