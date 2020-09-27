import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { RegisterContext } from "../../store/RegisterProvider";
import Button from "../common/Button";
import UploadAvatar from "../common/UploadAvatar";
import { Input, ButtonSubmit, Form, useForm } from "../common/Form";
// import { Input, Button, Form, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import RegisterButton from "./RegisterButton";
import { useRouter } from "next/router";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
`;

function Step2() {
  const router = useRouter();
  const { pictureurl } = router.query;
  const [form] = useForm();
  const {
    image,
    firstname,
    lastname,
    step,
    nextStep,
    changeImageUrl,
    changeImage,
    changeFirstname,
    changeLastname,
  } = useContext(RegisterContext);

  useEffect(() => {
    if (image === "") {
      if (pictureurl !== undefined) {
        changeImage(pictureurl);
      } else {
        changeImageUrl(false);
      }
    }
    form.setFieldsValue({
      firstname: firstname,
      lastname: lastname,
    });
  }, []);

  const onFinish = (values) => {
    changeFirstname(values.firstname);
    changeLastname(values.lastname);
    nextStep(3);
  };

  return (
    <div>
      <div className="text-center">
        <UploadAvatar image={image} changeImage={changeImage} />
      </div>
      <Form layout="vertical" form={form} name="register" onFinish={onFinish}>
        <Input
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: "Please input your Firstname" }]}
        />
        <Input
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: "Please input your Lastname" }]}
        />
        <div className="col-6 mx-auto mt-3">
          <div className="text-center">
            <ButtonSubmit>Next</ButtonSubmit>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Step2;
