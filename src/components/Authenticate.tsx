import * as queryString from "query-string";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { AuthContext } from "../authContext";

function Authenticate() {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const { search } = useLocation();

  const history = useHistory();

  useEffect(() => {
    const { code, error } = queryString.parse(search);

    if (error) {
      setError("Giriş sırasında hata oluştu.");
    } else if (code) {
      login(code as string);
      history.push("/");
    } else {
      // if user manually tries to go to /authenticate route
      history.push("/");
    }
  }, [history, login, search]);

  return (
    <div>
      <p>{error || "Giriş yapılıyor..."}</p>
    </div>
  );
}

export default Authenticate;
