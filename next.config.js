const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    REACT_APP_CHANNEL_ID_LOGIN: process.env.REACT_APP_CHANNEL_ID_LOGIN,
    REACT_APP_FE_PATH: process.env.REACT_APP_FE_PATH,
    REACT_APP_BE_PATH: process.env.REACT_APP_BE_PATH,
    REACT_APP_STORAGE: process.env.REACT_APP_STORAGE,
    REACT_APP_LIFF_ID: process.env.REACT_APP_LIFF_ID,
    REACT_APP_LIFF_URL: process.env.REACT_APP_LIFF_URL,
  },
});
