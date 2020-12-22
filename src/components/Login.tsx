import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const clientId =
  "704735418180-b15063pfuh0taei1agnpj4s49rm035br.apps.googleusercontent.com";

const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  console.log("[Login Success] res", res);
};
const onFailure = (res: any) => {
  console.log("[Login Failed] res", res);
};

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
