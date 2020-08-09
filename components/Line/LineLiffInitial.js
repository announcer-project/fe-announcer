import React, { useEffect } from "react";
import liff from "@line/liff";

export default function LiffInit() {
  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
        initializeApp();
    })
  }, []);

  return liff
}
