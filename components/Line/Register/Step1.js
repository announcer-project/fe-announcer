import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Form, Input } from "antd";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";

const Bg = styled.div`
  min-height: 100vh;
  background-image: url("/img/Line/bg-register.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

const FormItem = styled(Form.Item)`
  .ant-input {
    height: 40px;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    padding-left: 20px;
  }
`;

const SubmitButton = styled.button`
  background-color: #050042;
  color: white;
  border-radius: 20px;
  border: none;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function Step1(props) {
  const [form] = Form.useForm();
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
  return (
    <Bg>
      <div className="text-center pt-5">
        <img
          className="col-8 mt-4"
          src={`${process.env.REACT_APP_STORAGE}/systems/${props.query.systemid}.png`}
        />
      </div>
      <div className="container mt-5">
        <div className="text-center">
          <span className="font-title">
            <b>Register</b>
          </span>
        </div>
        <div className="mt-4">
          <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={() => nextStep(2)}
          >
            <FormItem
              name="firstname"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input
                value={firstname}
                onChange={(e) => changeFirstname(e.target.value)}
                placeholder="Firstname"
              />
            </FormItem>
            <FormItem
              className="mt-2"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input
                value={lastname}
                onChange={(e) => changeLastname(e.target.value)}
                placeholder="Lastname"
              />
            </FormItem>

            <Form.Item className="text-center mt-2">
              <SubmitButton className="px-5 py-2" type="submit">
                Next
              </SubmitButton>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Bg>
  );
}
