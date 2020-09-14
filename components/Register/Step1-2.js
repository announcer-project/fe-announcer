import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { RegisterContext } from "../../store/RegisterProvider";
import RegisterButton from "./RegisterButton";
import cookie from "../../tools/cookie";
import Router, { useRouter } from "next/router";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
`;

function StepConnectSocial() {
  const router = useRouter();
  const { social, socialid } = router.query;
  const { user, nextStep } = useContext(RegisterContext);

  const onConnectSocial = async () => {
    let data = {
      social: social,
      socialid: socialid,
      userid: user.ID
    }
    await axios
      .post(`${process.env.REACT_APP_BE_PATH}/register/connectsocial`, data)
      .then((res) => {
        cookie.setJWT(null, res.data, 7);
        Router.push("/console/systems");
      })
      .catch((err) => {
        console.log("error ", err.response);
      });
  };

  return (
    <div className="text-center">
      <Profile
        src={`${process.env.REACT_APP_STORAGE}/profile/${user.ID}.jpg`}
      />
      <div className="pt-3">
        <p>
          <b>Name:</b> {user.fname} {user.lname}
        </p>
        <p>
          <b>E-mail:</b> {user.email}
        </p>
      </div>
      <div className="pt-3 d-flex justify-content-between">
        <RegisterButton
          onClick={() => nextStep(1)}
          back={true}
          className="px-4 py-2"
          type="submit"
        >
          Change email
        </RegisterButton>
        <RegisterButton
          onClick={() => onConnectSocial()}
          className="px-3 px-lg-4 py-2"
          type="submit"
        >
          Connect account
        </RegisterButton>
      </div>
    </div>
  );
}

export default StepConnectSocial;
