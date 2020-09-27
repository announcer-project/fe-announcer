import {
  Form,
  Input,
  InputPassword,
  useForm,
  ButtonSubmit,
} from "../common/Form";
import { RegisterContext } from "../../store/RegisterProvider";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";

function Step1() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailParam = router.query.email;
  const [form] = useForm();
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

  const sendOTP = async (values) => {
    setCheckEmail(true);
    changeEmail(values.email);
    let OTP = generateOTP();
    setgenOTP(OTP);
    let data = {
      otp: OTP,
      email: values.email,
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

  const checkOTP = (values) => {
    if (!loading) {
      setLoading(true);
      if (values.otp === genOTP) {
        let data = {
          email: email,
        };
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "OTP incorrect",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Form layout="vertical" form={form} name="sendotp" onFinish={sendOTP}>
        <Input
          label="E-mail"
          type="email"
          placeholder="example@example.com"
          name="email"
          rules={[{ required: true, message: "Please input your E-mail!" }]}
        />
        <div className={`${checkEmail ? "d-none" : ""} mt-3 text-center`}>
          <ButtonSubmit>Send OTP</ButtonSubmit>
        </div>
      </Form>
      <Form layout="vertical" name="checkotp" onFinish={checkOTP}>
        <div className={`${checkEmail ? "" : "d-none"}`}>
          <InputPassword
            name="otp"
            label="OTP"
            maxLength="6"
            minLength="6"
            rules={[
              { required: true, message: "Please input your OTP 6 digits!" },
            ]}
          />
          <div className="text-center">
            <ButtonSubmit>
              <LoadingOutlined className={`${loading ? "" : "d-none"}`} />
              Next
            </ButtonSubmit>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Step1;
