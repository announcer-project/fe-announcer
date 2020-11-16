import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { lineliff as lineliffapi } from "../../../api";
import liff from "@line/liff";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import Layout from "./Profile";
import Swal from "sweetalert2"

const Information = styled.div`
  padding: 10px 15px 10px 15px;
`;
const Coretext = styled.div`
  color: black;
`;
const Subtext = styled.div`
  color: #a6a6a6;
`;

//conmponents

export default function LiffInit(props) {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [memberID, setMemberID] = useState("");

  const fetchMemberDetail = async (lineid) => {
    await lineliffapi.get(`/member/${lineid}`).then((res) => {
      setName(res.data.member.f_name + " " + res.data.member.l_name);
      setRole(res.data.role.rolename);
      setMemberID(res.data.member.ID);
    });
  };

  const LineLiff = async () => {
    await lineliffapi.get(`/liffid?systemid=${systemid}`).then(async (res) => {
      console.log(res.data);
      await liff.init({ liffId: res.data }).then(async () => {
        getEnvironment();
        getUserProfile();
        const profile = await liff.getProfile();
        setUserID(profile.userId)
        // await fetchMemberDetail(profile.userId);
        // setLoading(false);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    LineLiff();
  }, []);

  return (
    <Layout memberid={memberID} displayname={displayName} loading={loading}>
      <p>Line: {userID}</p>
      <Information>
        <Link
          href={`/line/[systemname]/[systemid]/profile/edit/name?systemname=${systemname}&systemid=${systemid}`}
          as={`/line/${systemname}/${systemid}/profile/edit/name`}
        >
          <a>
            <div className="d-flex justify-content-between">
              <Coretext>Name</Coretext>
              <Subtext>
                {name} <RightOutlined />
              </Subtext>
            </div>
          </a>
        </Link>
      </Information>
      <Information>
        <Link
          href={`/line/[systemname]/[systemid]/profile/edit/role?systemname=${systemname}&systemid=${systemid}`}
          as={`/line/${systemname}/${systemid}/profile/edit/role`}
        >
          <a>
            <div className="d-flex justify-content-between">
              <Coretext>Role</Coretext>
              <Subtext>
                {role} <RightOutlined />
              </Subtext>
            </div>
          </a>
        </Link>
      </Information>
      <Information>
        <Link
          href={`/line/[systemname]/[systemid]/profile/edit/newstype?systemname=${systemname}&systemid=${systemid}`}
          as={`/line/${systemname}/${systemid}/profile/edit/newstype`}
        >
          <a>
            <div className="d-flex justify-content-between">
              <Coretext>Interested news</Coretext>
              <Subtext>
                <RightOutlined />
              </Subtext>
            </div>
          </a>
        </Link>
      </Information>
    </Layout>
  );
}
