import axios from "axios";
import cookie from "./tools/cookie"

const intent = axios.create({
  baseURL: `${process.env.REACT_APP_BE_PATH}/dialogflow`,
  headers: {
    Authorization: "Bearer " + cookie.getJWT(),
  },
});

export { intent };