import React from "react";
import styled from "styled-components";

const Profilepicture = styled.img`
  width: 177px;
  height: 177px;
  object-fit: cover;
  border-radius: 100px;
  cursor: pointer;
`;

export default function LiffInit({
  children,
  memberid,
  displayname,
  imageUrl,
}) {
  return (
    <div className="container pt-5">
      <div className="text-center">
        <h1 className="pb-4">Profile</h1>
        <Profilepicture src={imageUrl} />
        <div className="pt-4">Display name: {displayname}</div>
        <div className="pt-3 pb-4">Member ID: {memberid}</div>
      </div>
      {children}
    </div>
  );
}
