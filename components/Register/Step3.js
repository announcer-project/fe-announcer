import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { RegisterContext } from "../../store/RegisterProvider";
import cookie from "../../tools/cookie";
import Router from "next/router";
import { useRouter } from "next/router";
import Button from "../common/Button";
import { LoadingOutlined } from "@ant-design/icons";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
`;

function Step3() {
  const router = useRouter();
  const { pictureurl, social, socialid } = router.query;
  const { email, imageUrl, image, firstname, lastname, nextStep } = useContext(
    RegisterContext
  );
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!loading) {
      setLoading(true);
      let data = {
        email: email,
        fname: firstname,
        lname: lastname,
        imagesocial: imageUrl,
        imageUrl: pictureurl,
        imageprofile: image,
        [social]: socialid,
      };
      await axios
        .post(`${process.env.REACT_APP_BE_PATH}/register`, data)
        .then((res) => {
          cookie.setJWT(null, res.data.jwt, 7);
          Router.push("/console/systems");
        })
        .catch((err) => {
          console.log("error ", err.response);
          setLoading(false);
        });
    }
  };

  return (
    <div className="text-center">
      <Profile src={image} />
      <div className="pt-3">
        <p>
          <b>Name:</b> {firstname} {lastname}
        </p>
        <p>
          <b>E-mail:</b> {email}
        </p>
      </div>
      <div className="pt-3 d-flex justify-content-between">
        <Button onClick={() => nextStep(2)} danger={true}>
          Back
        </Button>
        <Button onClick={() => onRegister()}>
          <LoadingOutlined className={`${loading ? "" : "d-none"} mr-1`} />
          Register
        </Button>
      </div>
    </div>
  );
}

export default Step3;
