import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import Button from "../../../common/Button"; 
import liff from "@line/liff";

import {
  ButtonSubmit,
} from "../../../common/Form";
//conmponents

const Profilepicture = styled.img`
  width: 177px;
  height: 177px;
  object-fit: cover;
  border-radius: 100px;
  cursor: pointer;
`;

const Information = styled.div`
  padding: 10px 15px 10px 15px;
`

const NewstypeButton = styled.div`
  border-radius: 25px;
  border: ${props => props.checked ? "" : "1px solid #A6A6A6"};
  color: ${props => props.checked ? "white" : "black"};
  background-color: ${props => props.checked ? "#36689A" : "white"};
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 15px;
`

export default function LiffInit(props) {
  const liffId = process.env.REACT_APP_LIFF_ID;

  useEffect(() => {
    // liff.init({ liffId }).then(async () => {
    //   if (liff.isLoggedIn()) {
    //     let profile = await liff.getProfile();
    //     changeLineID(profile.userId);
    //     changeImageUrl(profile.pictureUrl);
    //     changeEmail(liff.getDecodedIDToken().email);
    //   } else {
    //     liff.login({
    //       redirectUri:
    //         "http://localhost:3000/line/announcer/AC-3R6O8UG513/register",
    //     });
    //   }
    // });
  }, []);


    return (
      <div className="container pt-5">
      <div className="text-center">
        <h1 className="pb-5">Edit Interested news</h1>
        <Profilepicture src="/img/user-profile.png"
        // src={profile.pictureUrl} 
        />
        <div className="pt-3 pb-4">User ID: ANNIONW18E80A47I6LXVQ4</div>
      </div>
      <Information>
        <p><b>Interested news</b></p>
        <div className="row pb-5">
          <div className="col-6">
            <NewstypeButton checked={true}
              className="shadow"
            >
              Scholarship
            </NewstypeButton>
          </div>
          <div className="col-6">
            <NewstypeButton className="shadow">Activity</NewstypeButton>
          </div>
          <div className="col-6">
            <NewstypeButton className="shadow">Sport</NewstypeButton>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Link href="/line/systemname/systemid/profile"><Button danger={true}>Back</Button></Link>
          <ButtonSubmit>Confirm</ButtonSubmit>
        </div>
      </Information>
    </div>
    )
}
