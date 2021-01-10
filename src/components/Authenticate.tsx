import * as queryString from "query-string";
import { useEffect } from "react";
import getAccessTokenFromCode from "../googleLogin/google-access-token";

function Authenticate() {
  const urlParams = queryString.parse(window.location.search);

  useEffect(() => {
    if (urlParams.error) {
      // Show authentication error to user
      console.log(`An error occurred: ${urlParams.error}`);
    } else {
      getAccessTokenFromCode(urlParams.code as string)
        .then((response) => {
          console.log({ response });
        })
        .catch((error) => console.log({ error }));
    }
  }, []);

  return <div>Authenticate</div>;
}

export default Authenticate;
