import { Form, Input, Button } from "antd";
import { RegisterContext } from "../../store/RegisterProvider";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import RegisterButton from "./RegisterButton";
import { useRouter } from "next/router";

function Step1() {
  const router = useRouter();
  const emailParam = router.query.email;
  const [form] = Form.useForm();
  const [checkEmail, setCheckEmail] = useState(false);
  const [inputotp, setinputotp] = useState("");
  const [genOTP, setgenOTP] = useState("");
  const { email, nextStep, changeEmail, user, setUser } = useContext(
    RegisterContext
  );

  useEffect(() => {
    if (email === "") {
      changeEmail(emailParam);
    } else {
      form.setFieldsValue({
        email: email,
      });
    }
  }, [email]);

  const validOTP = (valueOTP) => {
    if (valueOTP.length < inputotp.length) {
      setinputotp(valueOTP);
    } else {
      if (
        valueOTP.charCodeAt(valueOTP.length - 1) >= 48 &&
        valueOTP.charCodeAt(valueOTP.length - 1) <= 57
      ) {
        setinputotp(valueOTP);
      }
    }
  };

  const generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const sendOTP = async () => {
    setCheckEmail(true);
    let OTP = generateOTP();
    setgenOTP(OTP);
    let data = {
      otp: OTP,
      email: email,
    };
    axios
      .post(`${process.env.REACT_APP_BE_PATH}/register/sendotp`, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkOTP = () => {
    if (inputotp === genOTP) {
      let data = {
        email: email
      }
      axios
        .post(`${process.env.REACT_APP_BE_PATH}/register/checkuser`, data)
        .then((res) => {
          console.log("not have account");
          nextStep(2);
        })
        .catch((err) => {
          console.log("have account");
          console.log(err.response.data);
          setUser(err.response.data);
          nextStep(1.2);
        });
    }
  };

  return (
    <div>
      <Form
        form={form}
        id="RegisterForm"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => sendOTP()}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your E-mail!" }]}
        >
          <div>
            <span>E-mail</span>
            <Input
              type="email"
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
              placeholder="example@example.com"
              style={{ borderRadius: "10px", height: "25px" }}
            />
          </div>
        </Form.Item>
        <div className={`${checkEmail ? "d-none" : ""} col-6 mx-auto mt-3`}>
          <Form.Item>
            <RegisterButton
              className="font-small py-2 px-3 col-12"
              type="submit"
            >
              Send OTP
            </RegisterButton>
          </Form.Item>
        </div>
      </Form>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => checkOTP()}
      >
        <div className={`${checkEmail ? "" : "d-none"}`}>
          <Form.Item
            valuePropName={inputotp}
            name="OTP"
            rules={[
              { required: true, message: "Please input your OTP 6 digits!" },
            ]}
          >
            <div>
              <span>OTP</span>
              <Input.Password
                value={inputotp}
                onChange={(e) => validOTP(e.target.value)}
                maxLength="6"
                minLength="6"
                style={{ borderRadius: "10px", height: "25px" }}
              />
            </div>
          </Form.Item>
          <div className="col-6 mx-auto mt-3">
            <Form.Item>
              <RegisterButton
                className="font-small py-2 px-3 col-12"
                type="submit"
              >
                Next
              </RegisterButton>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Step1;
