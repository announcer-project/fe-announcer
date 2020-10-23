import { Component } from "react";
import cookie from "../tools/cookie";
import Router from "next/router";

const withAuth = (WrappedComponent) => {
  return class ComponentWithAuth extends Component {
    render() {
      const jwt = cookie.getJWT();
      if (!jwt) {
        Router.push("/login");
        return <></>;
      }
      return <WrappedComponent />;
    }
  };
};

export default withAuth;
