import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";
import liff from "@line/liff";
import Link from "next/link";
import {
  RightOutlined
} from "@ant-design/icons";

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
const Coretext = styled.div`
  color: black;
`
const Subtext = styled.div`
  color:#A6A6A6;
`


//conmponents

export default function LiffInit(props) {
  const liffId = process.env.REACT_APP_LIFF_ID;
  const router = useRouter()
  const { systemname, systemid } = router.query
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   liff.init({ liffId }).then(async () => {
  //     if (liff.isLoggedIn()) {
  //       let profile = await liff.getProfile();
  //       setProfile(profile);
  //       setEmail(liff.getDecodedIDToken().email);
  //     } else {
  //       liff.login({
  //         redirectUri:
  //           "http://localhost:3000/line/SIT/AC-SO0VW5SGH7/profile",
  //       });
  //     }
  //   });
  // }, []);

  console.log(profile)
  console.log(email)

  return (
    <div className="container pt-5">
      <div className="text-center">
        <h1 className="pb-5">Profile</h1>
        <Profilepicture src="/img/user-profile.png"
        // src={profile.pictureUrl} 
        />
        <div className="pt-3 pb-4">User ID: ANNIONW18E80A47I6LXVQ4</div>
      </div>
      <Information>
        <Link href="/line/systemname/systemid/profile/edit/name">
          <a>
            <div className="d-flex justify-content-between">
              <Coretext>Name</Coretext>
              <Subtext>
                Panupong Joknoi <RightOutlined />
              </Subtext>
            </div>
          </a>
        </Link>
      </Information>
      <Information>
        <Link href="/line/systemname/systemid/profile/edit/role">
          <a>
            <div className="d-flex justify-content-between">
              <Coretext>Role</Coretext>
              <Subtext>
                Student <RightOutlined />
              </Subtext>
            </div>
          </a>
        </Link>
      </Information>
      <Information>
        <Link href="/line/systemname/systemid/profile/edit/newstype">
          <a>
            <div className="d-flex justify-content-between">
              <Coretext>Interested news</Coretext>
              <Subtext>
                Scholarship <RightOutlined />
              </Subtext>
            </div>
          </a>
        </Link>
      </Information>
    </div>
  )
}
