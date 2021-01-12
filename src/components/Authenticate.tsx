import * as queryString from "query-string";
import { Suspense, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import fetchUserDetails from "../googleLogin/fetch-user-details";

interface UserDetails {
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
    async function getUserDetails() {
      try {
        const userDetails: UserDetails = await fetchUserDetails(code as string);
        console.log({ userDetails });
        history.push("/");
      } catch (error) {
        console.log({ error });
      }
    }

    if (error) {
      console.log(`An error occurred: ${error}`);
    } else {
      getUserDetails();
    }
  }, [code, error, history]);

  return (
    <Suspense fallback={<p>Authenticating...</p>}>
      <div>Authenticate</div>
    </Suspense>
  );
}

export default Authenticate;
