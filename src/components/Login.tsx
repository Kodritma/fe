import { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../authContext";
import googleLoginUrl from "../utils/googleLoginUrl";
import { Button, Layout } from "antd";
import googleIcon from "../images/google-icon.png";
import CookieConsent from "react-cookie-consent";

const { Content } = Layout;

const Login = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(() => {
    const consent = localStorage.getItem("cookies");
    if (consent === "accepted") {
      return true;
    }
    return false;
  });
  const { isLoggedIn } = useContext(AuthContext);

  const onCookiesAccepted = () => {
    setCookiesAccepted(true);
    localStorage.setItem("cookies", "accepted");
  };

  return (
    <Content className="login-content">
      {!cookiesAccepted && (
        <CookieConsent
          debug={true}
          location="bottom"
          buttonText="Çerezlere İzin Ver"
          cookieName="token"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={60 * 60 * 60 * 24}
          onAccept={onCookiesAccepted}
        >
          Giriş yapabilmek için oturum bilgilerini tutmak amaçlı çerezlere izin
          vermelisiniz.
        </CookieConsent>
      )}
      {!isLoggedIn ? (
        <Button
          type="link"
          href={cookiesAccepted ? googleLoginUrl : ""}
          className="login-button"
        >
          <img src={googleIcon} alt="Google Icon" />
          {cookiesAccepted
            ? "Google ile Giriş Yap"
            : "Giriş yapabilmek için çerezlere izin vermelisiniz."}
        </Button>
      ) : (
        <Redirect to="/" />
      )}
    </Content>
  );
};

export default Login;
