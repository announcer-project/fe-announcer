import { parseCookies, setCookie, destroyCookie } from "nookies";

const COOKIE_JWT = "jwt";

const getJWT = (ctx) => {
  let cookies;
  if (ctx) {
    cookies = parseCookies(ctx);
  } else {
    cookies = parseCookies();
  }
  return cookies.jwt;
};

const setJWT = (ctx, jwt, expires) => {
  if (ctx) {
    setCookie(ctx, COOKIE_JWT, jwt, {
      maxAge: expires * 24 * 60 * 60,
      path: "/",
    });
  } else {
    setCookie(null, COOKIE_JWT, jwt, {
      maxAge: expires * 24 * 60 * 60,
      path: "/",
    });
  }
};

const clearJWT = (ctx) => {
  if (ctx) {
    destroyCookie(ctx, "jwt", { path: "/" });
  } else {
    destroyCookie(null, "jwt", { path: "/" });
  }
};

export default {
  getJWT,
  setJWT,
  clearJWT,
};
