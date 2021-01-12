import axios from "axios";
import { useEffect, useState } from "react";

const useLoginStatus = (access_token: string) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    async function check() {
      try {
        await axios.get("http://localhost:4000/authenticate/check", {
          headers: {
            Authorization: access_token,
          },
        });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    }
    check();
  }, [access_token]);

  return isLoggedIn;
};

export default useLoginStatus;
