import React, { useState, useEffect, useContext } from "react";
// import Router from "next/router";
// import axios from "axios";
// import { LineRegisterContext } from "../../../store/LineRegisterProvider";

import liff from "@line/liff";

//conmponents
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";

export default function LiffInit() {
//   const {
//     step,
//     changeNewstypes,
//     changeRoles,
//     changeLineID,
//     changeEmail,
//     changeImageUrl,
//     nextStep,
//     changeHaveUser,
//   } = useContext(LineRegisterContext);
//   const [loading, setLoading] = useState(true);
//   const [lineid, setLineid] = useState("not");
//   const [os, setOS] = useState("");
//   const [langusge, setLangusge] = useState("");
//   const [version, setVersion] = useState("");
//   const [accessToken, setAccessToken] = useState("");

//   const [image, setImage] = useState("");
//   const [displayName, setDisplayname] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [email, setEmail] = useState("");

  const LineLiff = async () => {
    await liff.init({ liffId: "1655233004-BL5EvPqn" })
    // .then(() => {
    //   getEnvironment();
    //   getUserProfile();
    // });
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
  }, []);

  return (
    <div>
      <div>Loading ...</div>
    </div>
  );
  // }
}
