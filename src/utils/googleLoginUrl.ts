import * as queryString from "query-string";

const stringifiedParams = queryString.stringify({
  client_id: process.env.REACT_APP_G_CLIENT_ID,
  redirect_uri: "http://localhost:3000/authenticate",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "), // space seperated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

const url = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export default url;
