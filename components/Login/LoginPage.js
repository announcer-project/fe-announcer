import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Router, { useRouter } from "next/router";
import liff from "@line/liff";
import axios from "axios";
import cookie from "../../tools/cookie";
import Loading from "../common/Loading";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let { social, code } = router.query;
  let pathLoginLine = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_CHANNEL_ID_LOGIN}&redirect_uri=${process.env.REACT_APP_FE_PATH}/login?social=line&state=12345abcde&scope=profile%20openid%20email`;

  useEffect(() => {
    if (social === undefined) {
      setLoading(false);
    }
    if (social === "line") {
      responseLine();
    }
  }, []);

  const responseFacebook = async (response) => {
    let data = {
      Social: "facebook",
      SocialID: response.userID,
    };
    await axios
      .post(`${process.env.REACT_APP_BE_PATH}/login`, data)
      .then(async (res) => {
        await cookie.setJWT(null, res.data.jwt, 7);
        Router.push(`/console/systems`);
      })
      .catch(async (err) => {
        Router.push(
          `/register?social=facebook&socialid=${data.SocialID}&email=${response.email}&pictureurl=${response.picture.data.url}`
        );
      });
  };

  const responseLine = async () => {
    let data = {
      Code: code,
    };
    await axios
      .post(`${process.env.REACT_APP_BE_PATH}/login/line`, data)
      .then(async (res) => {
        console.log(res.data)
        if (res.data.jwt === undefined) {
          Router.push(`/register?social=line&socialid=${res.data.UserId}&email=${res.data.Email}&pictureurl=${res.data.PictureUrl}`);
        } else {
          await cookie.setJWT(null, res.data.jwt, 7);
          Router.push(`/console/systems`);
        }
      });
  };

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div className="col-12">
        <div className="row m-0">
          <div className="col-8 d-none d-sm-block text-center pt-5">
            <ImageContent src="/img/logo.png" alt="News Management System" />
          </div>
          <Background className="col-12 col-sm-4">
            <Content className="col-10 p-0">
              <div className="col-8 p-0 mx-auto">
                <img src="/img/announcer-logo.png" alt="pic news" width="100%" />
              </div>
              <p className="text-center font-title">
                <b>SIGN IN</b>
              </p>
              <div className="col-10 p-0 mx-auto">
                <div className="mb-3">
                  <a href={pathLoginLine}>
                    <ButtonLogin className="col-12">Line</ButtonLogin>
                  </a>
                </div>
                <div className="mb-3">
                  {social !== "line" ? (
                    <FacebookLogin
                      redirectUri={`${process.env.REACT_APP_FE_PATH}/login?social=facebook`}
                      appId="345537553165129"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <ButtonLogin className="col-12" onClick={renderProps.onClick}>
                          Facebook
                        </ButtonLogin>
                      )}
                    />
                  ) : (
                    <ButtonLogin className="col-12">Facebook</ButtonLogin>
                  )}
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
