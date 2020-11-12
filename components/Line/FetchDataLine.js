import React, { useState, useEffect, useContext } from "react";
import {useRouter} from "next/router";
import {lineliff as lineliffapi} from "../../api"

import liff from "@line/liff";

export default function LiffInit() {
  const router = useRouter()
  const {systemid} = router.query

  const LineLiff = async () => {
    await lineliffapi.get(`/liffid?systemid=${systemid}`).then((res) => {
      liff.init({ liffId: res.data })
    })
  };

  useEffect(() => {
    LineLiff()
  }, []);

  return (
    <div>
      <div>Loading ...</div>
    </div>
  );
}
