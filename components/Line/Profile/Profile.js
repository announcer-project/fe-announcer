import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { lineliff, lineliff as lineliffapi } from "../../../api";
import liff from "@line/liff";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

const Profilepicture = styled.img`
  width: 177px;
  height: 177px;
  object-fit: cover;
  border-radius: 100px;
  cursor: pointer;
`;

const Information = styled.div`
  padding: 10px 15px 10px 15px;
`;
const Coretext = styled.div`
  color: black;
`;
const Subtext = styled.div`
  color: #a6a6a6;
`;

//conmponents

export default function LiffInit({ children, loading, memberid, displayname, imageurl }) {
  const router = useRouter();
  const { systemid } = router.query;

  return (
    <div className="container pt-5">
      <div className="text-center">
        <h1 className="pb-4">Profile</h1>
        <Profilepicture
          src="/img/user-profile.png"
          // src={profile.pictureUrl}
        />
        <div className="pt-4">Display name: {displayname}</div>
        <div className="pt-3 pb-4">Member ID: {memberid}</div>
      </div>
      {children}
    </div>
  );
}
