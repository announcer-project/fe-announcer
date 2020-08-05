import React, { useState, useContext, useEffect } from "react";
import { Form, Input } from "antd";
import styled from "styled-components";
import Swal from "sweetalert2";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import { NewsTypeBox, Cancel, NextButton } from "./Components";

const ButtonAddNewsType = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 50px;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: 17px;
  height: 25px;
`;

function Step1() {
  const [form] = Form.useForm();
  const [newstypeInput, setNewstypeInput] = useState("");
  const {
    systemname,
    changeSystemname,
    newstype,
    changeNewstype,
    nextStep,
  } = useContext(CreatesystemContext);
  const [formLayout] = useState("vertical");

  useEffect(() => {
    form.setFieldsValue({
      systemname: systemname,
    });
  }, []);

  const addNewstype = () => {
    let newnewstype = newstype;
    newnewstype.push(newstypeInput);
    changeNewstype(newnewstype);
    setNewstypeInput("");
  };

  const deleteNewstype = (newstypename) => {
    let newnewstype = newstype;
    newnewstype = newnewstype.filter((newstype) => {
      return newstype !== newstypename;
    });
    changeNewstype(newnewstype);
  };

  const Alert = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const onNextStep = () => {
    if (systemname !== "" && newstype.length !== 0) {
      nextStep(2);
    } else {
      if (systemname === "") {
        Alert("Please enter system name");
      } else {
        Alert("Please enter news type at least 1");
      }
    }
  };

  const formItemLayout = null;
  const buttonItemLayout = null;
  return (
    <div id="FormCreateSystem">
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
      >
        <Form.Item name="systemname" label="System name">
          <Input
            value={systemname}
            onChange={(e) => changeSystemname(e.target.value)}
            style={{ borderRadius: "10px", height: "25px" }}
          />
        </Form.Item>
        <div className="row mt-3">
          <div className="col-8 col-sm-10 pr-0">
            <Form.Item label="News type">
              <Input
                value={newstypeInput}
                onChange={(e) => setNewstypeInput(e.target.value)}
                style={{ borderRadius: "10px", height: "25px" }}
              />
            </Form.Item>
          </div>
          <div className="col-4 col-sm-2 pt-3">
            <ButtonAddNewsType
              className="px-4 pt-1 font-small"
              onClick={() => addNewstype()}
            >
              Add
            </ButtonAddNewsType>
          </div>
        </div>
        <div>
          {newstype.map((newstype) => {
            return (
              <div className="d-inline-block mt-2 mr-2 font-small">
                <NewsTypeBox>
                  {newstype}{" "}
                  <Cancel
                    className="pr-0"
                    onClick={() => deleteNewstype(newstype)}
                  >
                    x
                  </Cancel>
                </NewsTypeBox>
              </div>
            );
          })}
        </div>
        <NextButton
          onClick={() => onNextStep()}
          className="col-12 py-2 mt-5 mt-sm-5 font-small"
        >
          Next
        </NextButton>
      </Form>
    </div>
  );
}

export default Step1;
