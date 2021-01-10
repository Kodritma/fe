import { googleLoginUrl } from "../googleLogin/google-oauth-url";

const Login = () => {
  return (
    <div>
      <h1>
        <a href={googleLoginUrl}>Login</a>
      </h1>
    </div>
  );
};

export default Login;
