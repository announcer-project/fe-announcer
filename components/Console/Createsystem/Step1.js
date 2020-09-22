import React, { useState, useContext, useEffect } from "react";
import Button from "../../common/Button";
import { Form, Input } from "../../common/Form";
import Swal from "sweetalert2";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import { NewsTypeBox, Cancel } from "./Components";
import Link from "next/link";

import UploadProfile from "../../common/UploadAvatar";

function Step1() {
  const [newstypeInput, setNewstypeInput] = useState("");
  const {
    image,
    changeImage,
    systemname,
    changeSystemname,
    newstype,
    changeNewstype,
    changeRoleUser,
    nextStep,
  } = useContext(CreatesystemContext);

  useEffect(() => {
    if (systemname === "") {
      changeNewstype([]);
      changeRoleUser([]);
    }
  }, []);

  const addNewstype = () => {
    if (
      newstypeInput !== "" &&
      newstypeInput !== " " &&
      newstypeInput.substring(0, 1) !== " "
    ) {
      let newnewstype = newstype;
      newnewstype.push(newstypeInput);
      changeNewstype(newnewstype);
      setNewstypeInput("");
    }
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

  return (
    <div id="FormCreateSystem">
      <div className="text-center">
        <UploadProfile image={image} changeImage={changeImage} />
      </div>
      <Form>
        <p>System name</p>
        <Input
          value={systemname}
          onChange={(e) => changeSystemname(e.target.value)}
        />
        <div className="row pt-2">
          <p>Add news type</p>
          <div className="col-8 col-xs-9 col-lg-10 pr-0">
            <Input
              value={newstypeInput}
              onChange={(e) => setNewstypeInput(e.target.value)}
            />
          </div>
          <div className="col-4 col-xs-3 col-lg-2">
            <Button
              style={{ width: "100%" }}
              className="py-1"
              onClick={() => addNewstype()}
            >
              Add
            </Button>
          </div>
          <div>
            {newstype.map((newstype) => {
              return (
                <div className="d-inline-block mt-2 mr-2 font-small">
                  <NewsTypeBox>
                    {newstype}
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
        </div>
      </Form>
      <div className="d-flex justify-content-between mt-5">
        <Link href="/console/systems">
          <Button danger={true}>Back</Button>
        </Link>
        <Button onClick={onNextStep}>Next</Button>
      </div>
    </div>
  );
}

export default Step1;
