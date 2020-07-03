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
