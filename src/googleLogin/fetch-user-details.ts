import axios from "axios";

async function fetchUserDetails(code: string) {
  const { data: userDetails } = await axios.get(
    `http://localhost:4000/authenticate?code=${code}`
  );
  return userDetails;
}

export default fetchUserDetails;
