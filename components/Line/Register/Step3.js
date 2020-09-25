import React, { useContext } from "react";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "../../common/Button"

const NewstypeBox = styled.div`
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? props.theme.color.base : "white")};
  color: ${(props) => (props.selected ? "white" : "rgb(0,0,0,0.65)")};
`;

export default function Step3(props) {
  const {
    haveuser,
    newstypes,
    changeNewstypes,
    nextStep,
    lineid,
    imageUrl,
    firstname,
    lastname,
    email,
    roleSelected,
  } = useContext(LineRegisterContext);

  const onSelectNewstype = async (key) => {
    let newNewstypes = newstypes;
    newNewstypes[key].selected = !newNewstypes[key].selected;
    changeNewstypes(newNewstypes);
  };

  const onNextStep = async () => {
    let newstypesSelected = newstypes.filter((newstype) => newstype.selected);
    if (newstypesSelected.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select news type at least 1",
      });
    } else {
      let data = {
        isuser: haveuser,
        fname: firstname,
        lname: lastname,
        email: email,
        imageUrl: imageUrl,
        roleid: roleSelected,
        newsinterested: newstypesSelected,
        systemid: props.query.systemid,
        line: lineid,
      };
      console.log(data)
      axios
        .post(`${process.env.REACT_APP_BE_PATH}/line/register`, data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Register success",
            text: "You can edit profile in profile menu",
          });
        });
    }
  };

  return (
    <div className="container pt-5">
      <div className="text-center">
        <span className="font-title">
          <b>Choose your role</b>
        </span>
      </div>
      <div className="row mt-4">
        {newstypes.map((newstype, key) => {
          return (
            <div className="col-6 px-2">
              <NewstypeBox
                key={key}
                onClick={() => onSelectNewstype(key)}
                selected={newstype.selected}
                className="col-12 border shadow-sm d-inline-block py-2 px-4 text-center"
              >
                {newstype.newstype_name}
              </NewstypeBox>
            </div>
          );
        })}
      </div>
      <div className="mt-5 d-flex justify-content-between">
        <Button danger={true} onClick={() => nextStep(2)}>
          Back
        </Button>
        <Button onClick={() => onNextStep()}>
          Next
        </Button>
      </div>
    </div>
  );
}
