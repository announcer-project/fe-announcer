import axios from "axios";
import cookie from "./tools/cookie"

const intent = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/dialogflow`,
  headers: {
    Authorization: "Bearer " + cookie.getJWT(),
  },
});

const lineliff = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/line`,
});

const member = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/member`,
});

const role = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/role`,
});

const news = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/news`,
});

export { intent, lineliff, member, role, news };
