import React, { useEffect, useState } from "react";
import liff from "@line/liff";

export default function LiffInit() {
  const liffId = process.env.REACT_APP_LIFF_ID;
  const [os, setOS] = useState("");
  const [language, setLanguage] = useState("");
  const [version, setVersion] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [client, setClient] = useState("");
  useEffect(() => {
    liff.init({ liffId }).then(() => {
      setOS(liff.getOS());
      setLanguage(liff.getLanguage());
      setVersion(liff.getVersion());
      setAccessToken(liff.getAccessToken());
      setClient(liff.isInClient());
    });
  }, []);
  return (
    <div>
      <p>os: {os}</p>
      <p>language: {language}</p>
      <p>version: {version}</p>
      <p>accessToken: {accessToken}</p>
      <p>isClient: {client}</p>
    </div>
  );
}
