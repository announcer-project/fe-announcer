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

const rolewithjwt = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/role`,
  headers: {
    Authorization: "Bearer " + cookie.getJWT(),
  },
});

const news = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/news`,
  headers: {
    Authorization: "Bearer " + cookie.getJWT(),
  },
});

const system = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/system`,
  headers: {
    Authorization: "Bearer " + cookie.getJWT(),
  },
});

const admin = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/admin`,
  headers: {
    Authorization: "Bearer " + cookie.getJWT(),
  },
});

export { intent, lineliff, member, role, news, system, admin, rolewithjwt };
