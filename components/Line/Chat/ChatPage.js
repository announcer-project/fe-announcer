import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import axios from "axios";
import styled from "styled-components";
import { Input, Form } from "../../common/Form";
import Button from "../../common/Button";
import liff from "@line/liff";

const Profilepicture = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 20px;
  margin-right: 15px;  
`;

//conmponents
const Navbar = styled.div`
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 50px;
  padding-top: 5px;
  padding-left: 20px;
`
const Conversation = styled.div`
  padding-top: 25px;
  padding-right: 20px;
  padding-left: 20px;
`
const BoxConversation = styled.div`
  background-color: ${props => props.checked ? "#90B5DA" : "white"};
  border: ${props => props.checked ? "" : "1px solid #90B5DA"};
  border-radius: 20px;
  padding: 10px 20px 10px 20px; 
  text-align: center;
  display: inline-block;
`
const SendingBox = styled.div`
  background-color: white;
  padding: 5px 20px 5px 20px;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
`
const StyleButton = styled(Button)`
  height: 32px;
  font-size: 12px;
`
const StyleInput = styled(Input)`
  border: "1px solid #E5E5E5";
`

export default function LiffInit(props) {
  const liffId = process.env.REACT_APP_LIFF_ID;
  const [message, setMessage] = useState("");

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
    <div>
      <Navbar>
        <Profilepicture src="/img/user-profile.png"></Profilepicture>
              Announcer
            </Navbar>
      <Conversation>
        <div className={`text-${true ? "right" : "left"} mb-1`}>
          <BoxConversation checked={true}>
            สวัสดีครับ
          </BoxConversation>
        </div>
        <div className={`text-${true ? "right" : "left"} mb-1`}>
          <BoxConversation checked={true}>
            สวัสดีครับ
          </BoxConversation>
        </div>
        <div className={`text-${false ? "right" : "left"} mb-1`} >
          <BoxConversation>
            สวัสดีค่ะ
          </BoxConversation>
        </div>
      </Conversation>
      <SendingBox>
        <div className="row">
          <div className="col-9">
            <Form>
              <StyleInput value={message} onChange={(e) => setMessage(e.target.value)}></StyleInput>
            </Form>
          </div>
          <div className="col-3">
            <StyleButton>Send</StyleButton>
          </div>
        </div>
      </SendingBox>
    </div>
  )
}
