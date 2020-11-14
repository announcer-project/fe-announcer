import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";
import { lineliff as lineliffapi } from "../../../api";

import liff from "@line/liff";

//conmponents
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function LiffInit() {
  const { step, changeNewstypes, changeRoles, changeLineID } = useContext(
    LineRegisterContext
  );
  const [loading, setLoading] = useState(true);
  // const [lineid, setLineid] = useState("not");
  // const [os, setOS] = useState("");
  // const [langusge, setLangusge] = useState("");
  // const [version, setVersion] = useState("");
  // const [accessToken, setAccessToken] = useState("");

  // const [image, setImage] = useState("");
  // const [displayName, setDisplayname] = useState("");
  // const [statusMessage, setStatusMessage] = useState("");
  // const [email, setEmail] = useState("");

  const router = useRouter();
  const { systemid } = router.query;

  const LineLiff = async () => {
    await lineliffapi
      .get(`/register/aboutsystem?systemid=${systemid}`)
      .then(async (res) => {
        changeNewstypes(await setData(res.data.newstypes));
        changeRoles(await setData(res.data.roles));
        console.log("system ", res.data);
      });
    await lineliffapi.get(`/liffid?systemid=${systemid}`).then(async (res) => {
      console.log(res.data);
      await liff.init({ liffId: res.data }).then(() => {
        // getEnvironment();
        getUserProfile();
        setLoading(false);
      });
    });
  };

  const setData = async (data) => {
    let newData = [];
    data.forEach((d) => {
      newData.push({
        ...d,
        selected: false,
      });
    });
    return newData;
  };

  // const getEnvironment = () => {
  //   setOS(liff.getOS());
  //   setLangusge(liff.getLanguage());
  //   setVersion(liff.getVersion());
  //   setAccessToken(liff.getAccessToken());
  // };

  const getUserProfile = async () => {
    const profile = await liff.getProfile();
    // setDisplayname(profile.displayName);
    // setImage(profile.pictureUrl);
    // setLineid(profile.userId);
    changeLineID(profile.userId);
    // setStatusMessage(profile.statusMessage);
    // setEmail(liff.getDecodedIDToken().email);
  };

  useEffect(() => {
    setLoading(true);
    LineLiff();
  }, []);

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

  if (loading) {
    return <div>Loading ...register</div>;
  } else {
    return <div>{Steps()}</div>;
  }
}
