// Global
import { Layout } from "antd";
import { Route } from "react-router-dom";

// Local
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
        <Route exact path="/" component={Home} />
        <Route exact path="/authenticate" component={Authenticate} />
        <Route exact path="/videolu-dersler" component={VideoTutorials} />
        <Route exact path="/user/panel" component={ControlPanel} />
        <Footer />
      </Layout>
    </AuthProvider>
  );
}

export default App;
