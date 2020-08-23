import React from "react";
import styled from "styled-components";

const Box = styled.div`
  min-height: 250px;
  background-color: white;
  cursor: pointer;
  color: black;
  border-radius: 10px;
  box-shadow: 10px 10px 32px -8px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 10px 10px 32px -8px rgba(0, 0, 0, 0.8);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Admin = styled.div`
  background-color: #050042;
  color: white;
  display: inline-block;
  border-radius: 20px;
`;

export default function SystemBox({ admin }) {
  let system = admin.system;
  return (
    <Box className="text-center p-3">
      <div className="text-right">
        <Admin className="font-small px-3 py-1">{admin.position}</Admin>
      </div>
      <div className="mt-2">
        <ProfileImage
          src={`${process.env.REACT_APP_STORAGE}/systems/${system.ID}.png`}
        />
        <div className="mt-2">
          <span className="font-large">{system.system_name}</span>
          <br />
          <span className="font-small color-drop">{system.ID}</span>
        </div>
      </div>
    </Box>
  );
}
