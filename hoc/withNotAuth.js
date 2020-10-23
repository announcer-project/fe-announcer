import { Component } from "react";
import cookie from "../tools/cookie";
import Router from "next/router";

const withNotAuth = (WrappedComponent) => {
  return class ComponentWithAuth extends Component {
    render() {
      const jwt = cookie.getJWT();
      if (jwt) {
        Router.push("/console/systems");
        return <></>;
      }
      return <WrappedComponent />;
    }
  };
};

export default withNotAuth;
