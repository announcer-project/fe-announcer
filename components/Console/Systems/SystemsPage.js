import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import System from "./SystemBox";
import axios from "axios";
import cookie from "../../../tools/cookie";

const SystemBox = styled.div`
  height: 250px;
  background-color: white;
  cursor: pointer;
  color: black;
  border-radius: 10px;
  padding-top: 80px;
  box-shadow: 10px 10px 32px -8px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 10px 10px 32px -8px rgba(0, 0, 0, 0.8);
  }
`;

const Background = styled.div`
  background-image: url("/img/bg-systems.jpg");
  background-repeat: repeat-x;
  background-size: auto 250px;
  background-position: center top;
  background-color: white;
`;

const ButtonAdd = styled.div`
  font-size: 20px;
`;

function SystemsPage(props) {
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    let header = {
      Authorization: "Bearer " + cookie.getJWT(),
    };
    let admins = [];
    axios
      .get(`${process.env.REACT_APP_BE_PATH}/system/all`, {
        headers: header,
      })
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        console.log("err: ", err.message);
      });
  }, []);

  return (
    <>
      <Background>
        <div className="container">
          <div className="py-3 py-sm-5">
            <div className="font-title" style={{ color: "white" }}>
              <b>All system</b>
            </div>
            <div className="row">
              <div className="col-12 col-sm-4 mt-3">
                <Link href="/console/createsystem">
                  <SystemBox className="text-center">
                    <ButtonAdd>
                      <PlusOutlined className="pb-3" />
                      <br />
                      Add system
                    </ButtonAdd>
                  </SystemBox>
                </Link>
              </div>
              {!admins ? (
                <>loading</>
              ) : (
                <>
                  {admins.map((admin, key) => {
                    let system = admin.system;
                    return (
                      <Link
                        href={`/console/${system.system_name}/${system.ID}/home`}
                      >
                        <div key={key} className="col-12 col-sm-4 mt-3">
                          <System admin={admin} />
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </Background>
    </>
  );
}

export default SystemsPage;
