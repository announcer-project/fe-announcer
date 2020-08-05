import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { RegisterContext } from "../../store/RegisterProvider";
import RegisterButton from "./RegisterButton";
import cookie from "../../tools/cookie";
import Router from "next/router";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
`;

function StepConnectSocial(props) {
  const { user, nextStep } = useContext(RegisterContext);

  const onConnectSocial = async () => {
    let data = new FormData();
    data.append("social", props.query.state);
    data.append("socialid", props.query.code);
    data.append("userid", user.ID);
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
console.log("storage", `${process.env.REACT_APP_STORAGE}/profile/${user.ID}.jpg`)

  return (
    <div className="text-center">
      <Profile src={`${process.env.REACT_APP_STORAGE}/profile/${user.ID}.jpg`} />
      <div className="pt-3">
        <p>
          <b>Name:</b> {user.FName} {user.LName}
        </p>
        <p>
          <b>E-mail:</b> {user.Email}
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
          className="px-4 py-2"
          type="submit"
        >
          Connect account
        </RegisterButton>
      </div>
    </div>
  );
}

export default StepConnectSocial;