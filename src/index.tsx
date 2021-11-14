import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
