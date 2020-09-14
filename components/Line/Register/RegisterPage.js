import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import axios from "axios";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";

import liff from "@line/liff";

//conmponents
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function LiffInit(props) {
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
  const liffId = process.env.REACT_APP_LIFF_ID;

  useEffect(() => {
    changeNewstypes(props.aboutsystem.newstypes);
    changeRoles(props.aboutsystem.roles);
    liff.init({ liffId }).then(async () => {
      if (liff.isLoggedIn()) {
        let profile = await liff.getProfile();
        changeLineID(profile.userId);
        changeImageUrl(profile.pictureUrl);
        changeEmail(liff.getDecodedIDToken().email);
        let haveuser = await CheckUser(profile.userId);
        if (haveuser) {
          changeHaveUser(true);
          nextStep(2);
        }
        setLoading(false);
      } else {
        liff.login({
          redirectUri:
            "http://localhost:3000/line/announcer/AC-3R6O8UG513/register",
        });
      }
    });
  }, []);

  const CheckUser = async (lineid) => {
    let data = {
      lineid: lineid
    }
    let haveuser = false;
    await axios
      .post(`${process.env.REACT_APP_BE_PATH}/register/checkuserbylineid`, data)
      .then((res) => {
        if (res.data.message === "have account.") {
          haveuser = true;
        } else {
          haveuser = false;
        }
      });
    return haveuser;
  };

  const Steps = () => {
    switch (step) {
      case 1:
        return <Step1 {...props} />;
      case 2:
        return <Step2 {...props} />;
      case 3:
        return <Step3 {...props} />;
      default:
        break;
    }
  };

  if (loading) {
    return <div>Loading ...</div>;
  } else {
    return <div>{Steps()}</div>;
  }
}
