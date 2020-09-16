import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import axios from "axios";

import liff from "@line/liff";

//conmponents

export default function LiffInit(props) {
  const liffId = process.env.REACT_APP_LIFF_ID;

  useEffect(() => {
    // liff.init({ liffId }).then(async () => {
    //   if (liff.isLoggedIn()) {
    //     let profile = await liff.getProfile();
    //     changeLineID(profile.userId);
    //     changeImageUrl(profile.pictureUrl);
    //     changeEmail(liff.getDecodedIDToken().email);
    //   } else {
    //     liff.login({
    //       redirectUri:
    //         "http://localhost:3000/line/announcer/AC-3R6O8UG513/register",
    //     });
    //   }
    // });
  }, []);


    return (
        <div>
            Edit newstype
        </div>
    )
}
