import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { RegisterContext } from "../../store/RegisterProvider";
import RegisterButton from "./RegisterButton";
import cookie from "../../tools/cookie";
import Router from "next/router";
import { useRouter } from "next/router";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
`;

function Step3() {
  const router = useRouter();
  const { pictureurl, social, socialid } = router.query;
  const {
    email,
    imageUrl,
    image,
    firstname,
    lastname,
    nextStep,
  } = useContext(RegisterContext);

  const onRegister = async () => {
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
      });
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
        <RegisterButton
          onClick={() => nextStep(2)}
          back={true}
          className="px-4 py-2"
          type="submit"
        >
          Back
        </RegisterButton>
        <RegisterButton
          onClick={() => onRegister()}
          className="px-4 py-2"
          type="submit"
        >
          Register
        </RegisterButton>
      </div>
    </div>
  );
}

export default Step3;
