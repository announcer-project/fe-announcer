import cookie from "./cookie";

export const withNotAuth = (ctx) => {
  const jwt = cookie.getJWT(ctx);
  if (ctx.req && !jwt) {
    return;
  } else {
    const { res } = ctx;
    res.setHeader("location", "/console/systems");
    res.statusCode = 302;
    res.end();
  }
};

export const withNotAuthRegister = (ctx) => {
  const jwt = cookie.getJWT(ctx);
  const { state, code } = ctx.query;
  if (ctx.req && !jwt) {
    if (state && code) {
      return;
    } else {
      const { res } = ctx;
      res.setHeader("location", "/console/systems");
      res.statusCode = 302;
      res.end();
    }
  } else {
    const { res } = ctx;
    res.setHeader("location", "/console/systems");
    res.statusCode = 302;
    res.end();
  }
};
