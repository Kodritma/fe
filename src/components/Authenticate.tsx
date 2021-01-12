import * as queryString from "query-string";
import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import fetchUserData from "../googleLogin/fetchUserData";

interface UserData {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

function Authenticate() {
  const { search } = useLocation<{ search: string }>();
  const history = useHistory();

  const { code, error } = useMemo(() => queryString.parse(search), [search]);

  useEffect(() => {
    async function getUserData() {
      try {
        const userData: UserData = await fetchUserData(code as string);
        console.log({ userData });
        history.push("/");
      } catch (error) {
        console.log({ error });
      }
    }

    if (error) {
      console.log(`An error occurred: ${error}`);
    } else if (code) {
      getUserData();
    } else {
      // if user manually tries to go to /authenticate route
      history.push("/login");
    }
  }, [code, error, history]);

  return <div>Authenticating...</div>;
}

export default Authenticate;
