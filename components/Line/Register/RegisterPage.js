import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import axios from "axios";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";

import liff from "@line/liff";

//conmponents
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function LiffInit() {
  const {
    step,
    changeNewstypes,
    changeRoles,
    changeLineID,
    changeEmail,
    changeImageUrl,
    nextStep,
    changeHaveUser,
  } = useContext(LineRegisterContext);
  const [loading, setLoading] = useState(true);
  const [lineid, setLineid] = useState("not");
  const [os, setOS] = useState("");
  const [langusge, setLangusge] = useState("");
  const [version, setVersion] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [image, setImage] = useState("");
  const [displayName, setDisplayname] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");

  const LineLiff = async () => {
    await liff.init({ liffId: "1655233004-BL5EvPqn" }).then(() => {
      getEnvironment();
      getUserProfile();
    });
  };

  const getEnvironment = () => {
    setOS(liff.getOS());
    setLangusge(liff.getLanguage());
    setVersion(liff.getVersion());
    setAccessToken(liff.getAccessToken());
  };

  const getUserProfile = async () => {
    const profile = await liff.getProfile()
    setDisplayname(profile.displayName)
    setImage(profile.pictureUrl)
    setLineid(profile.userId)
    setStatusMessage(profile.statusMessage)
    setEmail(liff.getDecodedIDToken().email)
  };

  useEffect(() => {
    LineLiff();
    // const liffId = process.env.REACT_APP_LIFF_ID;
    // liff.init({ liffId }).then(async () => {
    //   if (liff.isLoggedIn()) {
    //     let profile = await liff.getProfile();
    //     // changeLineID(profile.userId);
    //     setLineid(profile.userId)
    //     // changeImageUrl(profile.pictureUrl);
    //     // changeEmail(liff.getDecodedIDToken().email);
    //     // let haveuser = await CheckUser(profile.userId);
    //     // if (haveuser) {
    //     //   changeHaveUser(true);
    //     //   nextStep(2);
    //     // }
    //     setLoading(false);
    //   } else {
    //     setLineid("not login")
    //     setLoading(false);
    //   }
    // });
  }, []);

  // const CheckUser = async (lineid) => {
  //   let data = {
  //     lineid: lineid,
  //   };
  //   let haveuser = false;
  //   await axios
  //     .post(`${process.env.REACT_APP_BE_PATH}/register/checkuserbylineid`, data)
  //     .then((res) => {
  //       if (res.data.message === "have account.") {
  //         haveuser = true;
  //       } else {
  //         haveuser = false;
  //       }
  //     });
  //   return haveuser;
  // };

  const Steps = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        break;
    }
  };

  // if (loading) {
  //   return <div>Loading ...</div>;
  // } else {
  return (
    <div>
      <div className="border-bottom">OS: {os}</div>
      <div className="border-bottom">Version: {version}</div>
      <div className="border-bottom">AccessToken: {accessToken}</div>
      <div className="border-bottom">Language: {langusge}</div>

      <div><img src={image} /></div>
      <div className="border-bottom">User ID: {lineid}</div>
      <div className="border-bottom">Displayname: {displayName}</div>
      <div className="border-bottom">statusMessage: {statusMessage}</div>
      <div className="border-bottom">Email: {email}</div>
    </div>
  );
  // }
}
