import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import {
  news as newsapi,
  lineliff as lineliffapi,
  member as memberapi,
} from "../../../../api";
import Link from "next/link";
import Button from "../../../common/Button";
import Swal from "sweetalert2";
import liff from "@line/liff";
import Layout from "../Profile";

import { ButtonSubmit } from "../../../common/Form";
//conmponents

const Information = styled.div`
  padding: 10px 15px 10px 15px;
`;

const NewstypeButton = styled.div`
  border-radius: 25px;
  border: ${(props) => (props.checked ? "" : "1px solid #A6A6A6")};
  color: ${(props) => (props.checked ? "white" : "black")};
  background-color: ${(props) => (props.checked ? "#36689A" : "white")};
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 15px;
`;

export default function LiffInit() {
  const [displayName, setDisplayName] = useState("");
  const [memberID, setMemberID] = useState("");
  const [newstypes, setNewstypes] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { systemname, systemid } = router.query;

  const fetchMemberDetail = async (lineid) => {
    await lineliffapi.get(`/member/${lineid}`).then((res) => {
      console.log(res.data);
      setMemberID(res.data.member.ID);
      fetchAllNewstype(res.data.member.ID);
    });
  };

  const fetchAllNewstype = async (memberid) => {
    await newsapi
      .get(`/newstype/member?systemid=${systemid}&memberid=${memberid}`)
      .then((res) => {
        console.log("newstype ", res.data);
        setNewstypes(res.data);
      });
  };

  const LineLiff = async () => {
    await lineliffapi.get(`/liffid?systemid=${systemid}`).then(async (res) => {
      await liff.init({ liffId: res.data }).then(async () => {
        const profile = await liff.getProfile();
        await fetchMemberDetail(profile.userId);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    LineLiff();
  }, []);

  const selectNewsType = async (index) => {
    let newstypes_clone = newstypes;
    let newstype = newstypes_clone[index];
    newstype.Interested = !newstype.Interested;
    newstypes_clone[index] = newstype;
    setNewstypes([...newstypes_clone]);
  };

  const onChangeNewstype = async () => {
    let select = newstypes.filter((newstypes) => newstypes.Interested);
    if (select.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select less than 1",
      });
    } else {
      console.log(newstypes);
      let data = {
        newstypes: newstypes,
      };
      await memberapi.put(`/${memberID}/newstype`, data).then((res) => {
        console.log(res.data);
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
    }
  };

  return (
    <Layout memberid={memberID} displayname={displayName} loading={loading}>
      <Information>
        <p>
          <b>Interested news</b>
        </p>
        <div className="row pb-5">
          {newstypes &&
            newstypes.map((newstype, key) => {
              return (
                <div key={key} className="col-6">
                  <NewstypeButton
                    onClick={() => selectNewsType(key)}
                    checked={newstype.Interested}
                    className={`${newstype.Interested ? "shadow" : ""}`}
                  >
                    {newstype.NewsType.newstype_name}
                  </NewstypeButton>
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
          <ButtonSubmit onClick={onChangeNewstype}>Confirm</ButtonSubmit>
        </div>
      </Information>
    </Layout>
  );
}
