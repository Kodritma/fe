import axios from "axios";

async function getAccessTokenFromCode(code: string) {
  const { data } = await axios.get(
    `http://localhost:4000/authenticate?code=${code}`
  );
  return data;
}

export default getAccessTokenFromCode;
