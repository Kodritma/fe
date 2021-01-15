import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../authContext";

function Logout() {
  const { logout, isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    logout();
    !isLoggedIn && history.push("/");
  }, [history, logout, isLoggedIn]);

  return <div>Logging out...</div>;
}

export default Logout;
