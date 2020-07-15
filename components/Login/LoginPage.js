import React from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Router from "next/router";

import ButtonLogin from "./LoginButton";

const Background = styled.div`
  height: 100vh;
  position: relative;
  background-image: url("/img/Login/bg-mobile.png");
  background-size: 100% 100%;
`;

const Content = styled.div`
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width 575px) {
    position: fixed;
  }
`;
const ImageContent = styled.img`
  height: 80vh;
  width: auto;
  @media screen and (max-width 1200px) {
    height: auto;
    width: 80%;
  }
`;

function LoginPage() {
  const responseFacebook = (response) => {
    Router.push(`/login?code=${response.userID}&state=facebooklogin`)
  };
  return (
    <>
      <div className="col-12">
        <div className="row m-0">
          <div className="col-8 d-none d-sm-block text-center pt-5">
            <ImageContent src="/img/logo.png" alt="News Management System" />
          </div>
          <Background className="col-12 col-sm-4">
            <Content className="col-10 p-0">
              <div className="col-8 p-0 mx-auto d-sm-none">
                <img src="/img/logo.png" alt="pic news" width="100%" />
              </div>
              <h3 className="text-center">
                <b>SIGN IN</b>
              </h3>
              <div className="col-10 p-0 mx-auto">
                <div className="mb-3">
                  <a
                    href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
                      process.env.REACT_APP_CHANNEL_ID_LOGIN
                    }&redirect_uri=${
                      process.env.REACT_APP_FE_PATH
                    }/login&state=${"linelogin"}&scope=profile%20openid&nonce=09876xyz`}
                  >
                    <ButtonLogin>Line</ButtonLogin>
                  </a>
                </div>
                <div className="mb-3">
                  <FacebookLogin
                    redirectUri={`${process.env.REACT_APP_FE_PATH}/login`}
                    appId="696178021130957"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <ButtonLogin onClick={renderProps.onClick}>
                        Facebook
                      </ButtonLogin>
                    )}
                  />
                </div>
                <div>
                  <ButtonLogin>Google</ButtonLogin>
                </div>
              </div>
            </Content>
          </Background>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
