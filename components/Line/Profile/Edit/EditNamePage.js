import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { lineliff as lineliffapi, member as memberapi } from "../../../../api";
import liff from "@line/liff";
import Link from "next/link";
import Button from "../../../common/Button";
import Layout from "../Profile";
import Swal from "sweetalert2";
import Loading from "../../../common/Loading"

import { useForm, Form, Input, ButtonSubmit } from "../../../common/Form";

const Information = styled.div`
  padding: 10px 15px 10px 15px;
`;

export default function LiffInit(props) {
  const [form] = useForm();
  const router = useRouter();
  const { systemid } = router.query;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [memberID, setMemberID] = useState("");

  const fetchMemberDetail = async (lineid) => {
    await lineliffapi.get(`/member/${lineid}`).then((res) => {
      form.setFieldsValue({
        fname: res.data.member.f_name,
        lname: res.data.member.l_name,
      });
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

  const onChangeName = async (values) => {
    console.log("Fname: ", values.fname);
    console.log("Lname: ", values.lname);
    let data = {
      fname: values.fname,
      lname: values.lname,
    };
    await memberapi.put(`/${memberID}/name`, data).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Update success",
      }).then(() => {
        Router.push(
          `/line/[systemid]/profile?systemid=${systemid}`,
          `/line/${systemid}/profile`
        );
      });
    });
  };

  if(loading) {
    return <Loading/>
  }
  return (
    <Layout memberid={memberID} displayname={displayName} imageUrl={imageUrl}>
      <Information>
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          onFinish={onChangeName}
        >
          <Input
            label="Firstname"
            name="fname"
            placeholder="Firstname"
            rules={[{ required: true, message: "Please input your name!" }]}
          />
          <Input
            label="Lastname"
            name="lname"
            placeholder="Lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          />
          <div className="d-flex justify-content-between">
            <Link
              href={`/line/[systemid]/profile?systemid=${systemid}`}
              as={`/line/${systemid}/profile`}
            >
              <a>
                <Button danger={true}>Back</Button>
              </a>
            </Link>
            <ButtonSubmit>Confirm</ButtonSubmit>
          </div>
        </Form>
      </Information>
    </Layout>
  );
}
