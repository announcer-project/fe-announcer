import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import {
  role as roleapi,
  lineliff as lineliffapi,
  member as memberapi,
} from "../../../../api";
import Link from "next/link";
import Button from "../../../common/Button";
import liff from "@line/liff";
import Layout from "../Profile";
import Swal from "sweetalert2";
import Loading from "../../../common/Loading";

import { ButtonSubmit } from "../../../common/Form";

const Information = styled.div`
  padding: 10px 15px 10px 15px;
`;

const RoleButton = styled.div`
  border-radius: 25px;
  border: ${(props) => (props.checked ? "" : "1px solid #A6A6A6")};
  color: ${(props) => (props.checked ? "white" : "black")};
  background-color: ${(props) => (props.checked ? "#36689A" : "white")};
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export default function LiffInit(props) {
  const router = useRouter();
  const { systemname, systemid } = router.query;
  const [displayName, setDisplayName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [memberID, setMemberID] = useState("");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState(null);

  const fetchMemberDetail = async (lineid) => {
    await lineliffapi.get(`/member/${lineid}`).then((res) => {
      setMemberID(res.data.member.ID);
      setRole(res.data.role.ID);
    });
  };

  const fetchAllrole = async () => {
    await roleapi.get(`/all?systemid=${systemid}`).then((res) => {
      setRoles(res.data);
    });
  };

  const LineLiff = async () => {
    await lineliffapi.get(`/liffid?systemid=${systemid}`).then(async (res) => {
      await liff.init({ liffId: res.data }).then(async () => {
        const profile = await liff.getProfile();
        setDisplayName(profile.displayName);
        setImageUrl(profile.pictureUrl);
        await fetchMemberDetail(profile.userId);
        await fetchAllrole();
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    LineLiff();
  }, []);

  const changeRole = async (roleid) => {
    setRole(roleid);
  };

  const onChangeRole = async () => {
    console.log(role);
    let data = {
      RoleID: role + "",
    };
    await memberapi.put(`/${memberID}/role`, data).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Update success",
      }).then(() => {
        Router.push(
          `/line/[systemname]/[systemid]/profile?systemname=${systemname}&systemid=${systemid}`,
          `/line/${systemname}/${systemid}/profile`
        );
      });
    });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout memberid={memberID} displayname={displayName} imageUrl={imageUrl}>
      <Information>
        <p>
          <b>Role</b>
        </p>
        <div className="row mb-2">
          {roles &&
            roles.map((rolemap, key) => {
              return (
                <div className="col-6 mb-2">
                  <RoleButton
                    checked={rolemap.ID === role}
                    className="shadow"
                    onClick={() => changeRole(rolemap.ID)}
                  >
                    {rolemap.rolename}
                  </RoleButton>
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <Link
            href={`/line/[systemname]/[systemid]/profile?systemname=${systemname}&systemid=${systemid}`}
            as={`/line/${systemname}/${systemid}/profile`}
          >
            <a>
              <Button danger={true}>Back</Button>
            </a>
          </Link>
          <ButtonSubmit onClick={() => onChangeRole()}>Confirm</ButtonSubmit>
        </div>
      </Information>
    </Layout>
  );
}
