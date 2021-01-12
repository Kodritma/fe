import axios from "axios";

async function fetchUserData(code: string) {
  const { data: userData } = await axios.get(
    `http://localhost:4000/authenticate?code=${code}`
  );
  return userData;
}

export default fetchUserData;
