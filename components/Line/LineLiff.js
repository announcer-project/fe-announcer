import React, { useEffect, useState } from "react";
import liff from "@line/liff";

export default function LiffInit() {
  const liffId = process.env.REACT_APP_LIFF_ID;
  const [os, setOS] = useState("");
  const [language, setLanguage] = useState("");
  const [version, setVersion] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [client, setClient] = useState("");
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    if (liff.isLoggedIn()) {
      console.log("login")
      setProfile(await liff.getProfile());
      console.log((await liff.getProfile()).displayName)
    } else {
      liff.login({ redirectUri: "http://localhost:3000/line" });
    }
  };

  useEffect(() => {
    liff.init({ liffId }).then(() => {
      setOS(liff.getOS());
      setLanguage(liff.getLanguage());
      setVersion(liff.getVersion());
      setAccessToken(liff.getAccessToken());
      setClient(liff.isInClient());
      getProfile();
    });
  }, []);
  return (
    <div>
      <p>os: {os}</p>
      <p>language: {language}</p>
      <p>version: {version}</p>
      <p>accessToken: {accessToken}</p>
      <br />
      <img src={profile.pictureUrl} />
      <p>user id: {profile.userId}</p>
      <p>user status: {profile.statusMessage}</p>
      <p>user name: {profile.displayName}</p>
      {/* <p>isClient: {client}</p> */}
    </div>
  );
}
