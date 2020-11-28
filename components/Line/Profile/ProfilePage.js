import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { lineliff as lineliffapi } from "../../../api";
import liff from "@line/liff";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import Layout from "./Profile";
import Loading from "../../common/Loading"

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
  const { systemid } = router.query;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
        const profile = await liff.getProfile();
        setDisplayName(profile.displayName)
        setImageUrl(profile.pictureUrl)
        await fetchMemberDetail(profile.userId);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    LineLiff();
  }, []);

  if(loading) {
    return <Loading/>
  }
  return (
    <Layout memberid={memberID} displayname={displayName} imageUrl={imageUrl}>
      <Information>
        <Link
          href={`/line/[systemid]/profile/edit/name?systemid=${systemid}`}
          as={`/line/${systemid}/profile/edit/name`}
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
          href={`/line/[systemid]/profile/edit/role?systemid=${systemid}`}
          as={`/line/${systemid}/profile/edit/role`}
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
          href={`/line/[systemid]/profile/edit/newstype?systemid=${systemid}`}
          as={`/line/${systemid}/profile/edit/newstype`}
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
