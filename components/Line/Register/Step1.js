import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";
import { Form, Input, ButtonSubmit, useForm } from "../../common/Form";
import {useRouter} from "next/router"

const Bg = styled.div`
  min-height: 100vh;
  background-image: url("/img/Line/bg-register.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

export default function Step1(props) {
  const router = useRouter()
  const {systemid} = router.query
  const [form] = useForm();
  const {
    nextStep,
    firstname,
    lastname,
    changeFirstname,
    changeLastname,
  } = useContext(LineRegisterContext);

  useEffect(() => {
    form.setFieldsValue({
      firstname: firstname,
      lastname: lastname,
    });
  }, []);

  const onFinish = (values) => {
    changeFirstname(values.firstname)
    changeLastname(values.lastname)
    nextStep(2)
  }
  return (
    <Bg>
      <div className="text-center pt-5">
        <img
          className="col-8"
          src={`${process.env.REACT_APP_STORAGE}/systems/${systemid}.png`}
        />
      </div>
      <div className="container mt-4">
        <div className="text-center">
          <span className="font-title">
            <b>Register</b>
          </span>
        </div>
        <div className="mt-4">
          <Form form={form} layout={"vertical"} onFinish={onFinish}>
            <Input
              placeholder="Firstname"
              name="firstname"
              rules={[{ required: true, message: "Please enter firstname" }]}
            />
            <Input
              className="mt-2"
              placeholder="Lastname"
              name="lastname"
              rules={[{ required: true, message: "Please enter lastname" }]}
            />
            <div className="text-right pt-2">
              <ButtonSubmit>Next</ButtonSubmit>
            </div>
          </Form>
        </div>
      </div>
    </Bg>
  );
}
