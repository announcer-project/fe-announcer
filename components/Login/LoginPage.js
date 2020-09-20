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
  const [lineProfile, setLineProfile] = useState({});
  const [lineEmail, setLineEmail] = useState("");
  const router = useRouter();
  let { social } = router.query;
  let liffId = process.env.REACT_APP_LIFF_ID;

  useEffect(() => {
    console.log("login page");
    if (social === undefined) {
      setLoading(false);
    }
    if (social === "line") {
      responseLine();
    }
  }, []);

  const responseFacebook = async (response) => {
    let data = {
      Social: social,
      SocialID: response.userID,
    };
    Login(data, response.email);
  };

  const responseLine = async () => {
    liff.init({ liffId }).then(async () => {
      if (liff.isLoggedIn()) {
        let profile = await liff.getProfile();
        let email = liff.getDecodedIDToken().email;
        let data = {
          Social: social,
          SocialID: profile.userId,
        };
        Login(data, email);
      } else {
        console.log("none");
        setLoading(false);
      }
    });
  };

  const Login = async (data, email) => {
    await axios
      .post(`${process.env.REACT_APP_BE_PATH}/login`, data)
      .then(async (res) => {
        await cookie.setJWT(null, res.data.jwt, 7);
        Router.push(`/console/systems`);
      })
      .catch(async (err) => {
        Router.push(
          `/register?social=${data.Social}&socialid=${data.SocialID}&email=${email}`
        );
      });
  };

  const LineLogin = async () => {
    liff.init({ liffId }).then(async () => {
      liff.login({
        redirectUri: `${process.env.REACT_APP_FE_PATH}/login?social=line`,
      });
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
              <div className="col-8 p-0 mx-auto d-sm-none">
                <img src="/img/logo.png" alt="pic news" width="100%" />
              </div>
              <p className="text-center font-title">
                <b>SIGN IN</b>
              </p>
              <div className="col-10 p-0 mx-auto">
                <div className="mb-3">
                  <ButtonLogin onClick={() => LineLogin()}>Line</ButtonLogin>
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
                        <ButtonLogin onClick={renderProps.onClick}>
                          Facebook
                        </ButtonLogin>
                      )}
                    />
                  ) : (
                    <ButtonLogin>Facebook</ButtonLogin>
                  )}
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
