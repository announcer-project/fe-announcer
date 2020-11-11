import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

import { LineRegisterProvider } from "../../../../store/LineRegisterProvider";

const LineRegister = dynamic(
  () => {
    return import("../../../../components/Line/Register/RegisterPage");
  },
  { ssr: false }
);

export default function LineLiffRegister(props) {
  const query = props.query;
  return (
    <>
      <Head>
        <title>Announcer - {query.systemname} register</title>
      </Head>
      <LineRegisterProvider>
        <h1>Register Page</h1>
        {/* <LineRegister {...props} /> */}
      </LineRegisterProvider>
    </>
  );
}

// const setData = async (data) => {
//   let newData = [];
//   data.forEach((d) => {
//     newData.push({
//       ...d,
//       selected: false,
//     });
//   });
//   return newData;
// };

// const getAboutLineRegister = async (query) => {
//   let newstypes = [];
//   let rolesuser = [];
//   await axios
//     .get(
//       `${process.env.REACT_APP_BE_PATH}/line/register/aboutsystem?systemid=${query.systemid}`
//     )
//     .then(async (res) => {
//       newstypes = await setData(res.data.newstypes)
//       rolesuser = await setData(res.data.roles)
//     })
//     .catch((err) => {
//       console.log(err.message.data);
//     });
//   let data = {
//     newstypes: newstypes,
//     roles: rolesuser,
//   };
//   return data;
// };

// export async function getServerSideProps(ctx) {
//   const aboutsystem = await getAboutLineRegister(ctx.query);
//   return {
//     props: {
//       query: ctx.query,
//       aboutsystem,
//     },
//   };
// }
