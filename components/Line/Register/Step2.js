import React, { useContext } from "react";
import { LineRegisterContext } from "../../../store/LineRegisterProvider";
import styled from "styled-components";
import Swal from "sweetalert2";

const RoleBox = styled.div`
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#050042" : "white")};
  color: ${(props) => (props.selected ? "white" : "rgb(0,0,0,0.65)")};
`;

const Button = styled.button`
  background-color: ${(props) => (props.back ? "#CE0000" : "#050042")};
  color: white;
  border-radius: 20px;
  border: none;
`;

export default function Step2(props) {
  const { haveuser, roles, roleSelected, selectRole, nextStep } = useContext(
    LineRegisterContext
  );

  const onSelectRole = async (key) => {
    selectRole(key);
  };

  const onNextStep = () => {
    if (roleSelected === -1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select your role",
      });
    } else {
      nextStep(3);
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
        {roles.map((role, key) => {
          return (
            <div className="col-6 px-2">
              <RoleBox
                key={key}
                onClick={() => onSelectRole(role.ID)}
                selected={role.ID === roleSelected}
                className="col-12 border shadow-sm d-inline-block py-2 px-4 text-center"
              >
                {role.rolename}
              </RoleBox>
            </div>
          );
        })}
      </div>
      <div className="mt-5 d-flex justify-content-between">
        {haveuser ? (
          <div />
        ) : (
          <Button back={true} className="px-5 py-2" onClick={() => nextStep(1)}>
            Back
          </Button>
        )}
        <Button className="px-5 py-2" onClick={() => onNextStep()}>
          Next
        </Button>
      </div>
    </div>
  );
}
