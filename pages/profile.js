import React, { useState, useEffect } from "react";
import styled from "styled-components";
import withLayout from "../hoc/withLayout";
import withAuth from "../hoc/withAuth";
import cookie from "../tools/cookie";
import jwtDecode from "jwt-decode";

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100%;
`
const ProfileBox = styled.div`
  border: 1px solid #000000;
  border-radius: 10px;
  margin: auto;
  padding: 50px 80px 50px 80px;
`
const ProfileAdmin = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
`
const ProfileText = styled.div`
    margin: auto;
`

function Profile() {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    try {
      let userData = jwtDecode(cookie.getJWT());
      setUser(userData);
    } catch (error) { }
  }, []);

  return (
    <div className="container">
      <ProfileAdmin>Profile admin</ProfileAdmin>
      <ProfileBox className="col-8">
        <div className="row">
          <div className="col-3">
            <ProfileImage src={`${process.env.REACT_APP_STORAGE}/profile/${user.user_id}.jpg`} />
          </div>
          <ProfileText className="col-5">
            Name: {user.fname} {user.lname} <br />
            User ID: {user.user_id}
        </ProfileText>
        </div>

      </ProfileBox>
    </div>
  );
}

Profile.getInnitialProps = async (ctx) => { };

export default withAuth(withLayout(Profile));
