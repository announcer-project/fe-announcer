import cookie from "./cookie";

export const withAuth = async (ctx) => {
  const jwt = cookie.getJWT(ctx)
  if (ctx.req && !jwt) {
    const { res } = ctx;
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return;
  }
  return;
};
