import { useEffect } from "react";
import { useHistory } from "react-router";
import googleLoginUrl from "../googleLogin/googleLoginUrl";
import useLoginStatus from "../utils/useLoginStatus";

const Login = () => {
  // access_token will be received from localStorage and passed here
  const isLoggedIn = useLoginStatus("");

  const history = useHistory();

  useEffect(() => {
    isLoggedIn && history.push("/");
  }, [isLoggedIn, history]);

  console.log({ isLoggedIn });
  return (
    <div>
      <h1>
        {isLoggedIn === undefined ? (
          <>Checking...</>
        ) : isLoggedIn === false ? (
          <a href={googleLoginUrl}>Login</a>
        ) : (
          <></>
        )}
      </h1>
    </div>
  );
};

export default Login;
