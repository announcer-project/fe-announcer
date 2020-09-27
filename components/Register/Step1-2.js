import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { RegisterContext } from "../../store/RegisterProvider";
import RegisterButton from "./RegisterButton";
import cookie from "../../tools/cookie";
import Router, { useRouter } from "next/router";
import Button from "../common/Button";
import { LoadingOutlined } from "@ant-design/icons";

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
  const [loading, setLoading] = useState(false);

  const onConnectSocial = async () => {
    if (!loading) {
      setLoading(true);
      let data = {
        social: social,
        socialid: socialid,
        userid: user.ID,
      };
      await axios
        .post(`${process.env.REACT_APP_BE_PATH}/register/connectsocial`, data)
        .then((res) => {
          cookie.setJWT(null, res.data.jwt, 7);
          Router.push("/console/systems");
        })
        .catch((err) => {
          setLoading(false);
        });
    }
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
        <Button onClick={() => nextStep(1)} danger={true}>
          Change email
        </Button>
        <Button onClick={() => onConnectSocial()}>
          <LoadingOutlined className={`${loading ? "" : "d-none"} mr-1`} />
          Connect account
        </Button>
      </div>
    </div>
  );
}

export default StepConnectSocial;
