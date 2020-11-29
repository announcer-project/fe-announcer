import React, { useState, useEffect } from "react";
import withLayout from "../hoc/withLayout";
import withAuth from "../hoc/withAuth";
import cookie from "../tools/cookie";
import jwtDecode from "jwt-decode";

function Profile() {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    try {
      let userData = jwtDecode(cookie.getJWT());
      setUser(userData);
    } catch (error) {}
  }, []);

  return (
    <div className="container">
      <img
        src={`${process.env.REACT_APP_STORAGE}/profile/${user.user_id}.jpg`}
      />
      <div>Profile Page</div>
    </div>
  );
}

Profile.getInnitialProps = async (ctx) => {};

export default withAuth(withLayout(Profile));
