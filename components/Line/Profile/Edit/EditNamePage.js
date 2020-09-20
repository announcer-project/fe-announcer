import React, { useEffect } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";
import liff from "@line/liff";
import Link from "next/link";
import Button from "../../../common/Button"; 

import {
  useForm,
  Form,
  Input,
  ButtonSubmit,
} from "../../../common/Form";

//conmponents
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

export default function LiffInit(props) {
  const liffId = process.env.REACT_APP_LIFF_ID;
  const [form] = useForm();
  const router = useRouter()
  const { systemname, systemid } = router.query

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: "Panupong",
      lastname: "Joknoi",
      // liff.init({ liffId }).then(async () => {
      //   if (liff.isLoggedIn()) {
      //     let profile = await liff.getProfile();
      //     changeLineID(profile.userId);
      //     changeImageUrl(profile.pictureUrl);
      //     changeEmail(liff.getDecodedIDToken().email);
      //   } else {
      //     liff.login({
      //       redirectUri:
      //         "http://localhost:3000/line/announcer/AC-3R6O8UG513/register",
      //     });
      //   }
      // });
    });
  }, []);


  return (
    <div className="container pt-5">
      <div className="text-center">
        <h1 className="pb-5">Edit name</h1>
        <Profilepicture src="/img/user-profile.png"
        // src={profile.pictureUrl} 
        />
        <div className="pt-3 pb-4">User ID: ANNIONW18E80A47I6LXVQ4</div>
      </div>
      <Information>
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          onFinish={onFinish}>
          <Input
            label="Name"
            name="name"
            placeholder="Name"
            rules={[
              { required: true, message: "Please input your name!" },
            ]}
          />
        </Form>
      </Information>
      <Information>
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          onFinish={onFinish}>
          <Input
            label="Lastname"
            name="lastname"
            placeholder="Name"
            rules={[
              { required: true, message: "Please input your lastname!" },
            ]}
          />
        </Form>
      </Information>
      <Information className="d-flex justify-content-between">
        <Link href="/line/systemname/systemid/profile"><Button danger={true}>Back</Button></Link>
        <ButtonSubmit>Confirm</ButtonSubmit>
      </Information>
    </div>
  )
}
