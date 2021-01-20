import { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../authContext";
import googleLoginUrl from "../utils/googleLoginUrl";
import { Button, Layout } from "antd";
import googleIcon from "../images/google-icon.png";

const { Content } = Layout;

const Login = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Content className="login-content">
      {!isLoggedIn ? (
        <Button type="link" href={googleLoginUrl} className="login-button">
          <img src={googleIcon} alt="Google Icon" />
          Google ile Giriş Yap
        </Button>
      ) : (
        <Redirect to="/" />
      )}
    </Content>
  );
};

export default Login;
