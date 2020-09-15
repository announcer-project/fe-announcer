import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Checkbox } from "../../../../../../common/Form";
import { ButtonAddUser, ButtonRemoveUser } from "./Components";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

const ButtonStyle = styled.button`
  cursor: ${(props) => (props.checked ? "pointer" : "not-allowed")};
  .anticon {
    vertical-align: 0em;
  }
  border: 1px solid
    ${(props) =>
      props.danger ? props.theme.color.danger : props.theme.color.base};
  border-radius: 50px;
  padding: 6px 22px 6px 22px;
  background-color: ${(props) =>
    props.danger ? props.theme.color.danger : props.theme.color.base};
  color: white;
  transition: 0.5s;
  &:hover {
    color: ${(props) =>
      props.danger ? props.theme.color.danger : props.theme.color.base};
    background-color: white;
  }
`;

export default function UserSelector() {
  const {
    users,
    selectUsers,
    usersSelect,
    changeUsersSelect,
    checkusers,
    checkUsers,
  } = useContext(CreateLineBroadcastContext);

  const [usersNotSelect, setUsersNotSelect] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUsersNotSelect(users);
    if (search !== "") {
      let newusers = users.filter((user) => {
        let name = user.fname.toUpperCase() + " " + user.lname.toUpperCase();
        return (
          name.search(search.toUpperCase()) > -1 ||
          user.ID.search(search.toUpperCase()) > -1
        );
      });
      setUsersNotSelect(newusers);
    }
  }, [users, usersSelect]);

  const onAddUser = (id) => {
    let user = users.filter((user) => user.ID === id);
    let newusers = users.filter((user) => user.ID !== id);
    let newsusersselect = usersSelect;
    newsusersselect.push(user[0]);
    selectUsers(newusers);
    changeUsersSelect(newsusersselect);
  };

  const onRemoveUser = (id) => {
    let user = usersSelect.filter((user) => user.ID === id);
    let newusersSelect = usersSelect.filter((user) => user.ID !== id);
    let newusers = users;
    newusers.push(user[0]);
    changeUsersSelect(newusersSelect);
    selectUsers(newusers);
  };

  const onSearch = (value) => {
    setSearch(value);
    let newusers = users.filter((user) => {
      let name = user.fname.toUpperCase() + " " + user.lname.toUpperCase();
      return (
        name.search(value.toUpperCase()) > -1 ||
        user.ID.search(value.toUpperCase()) > -1
      );
    });
    setUsersNotSelect(newusers);
  };

  return (
    <div>
      <Checkbox checked={checkusers} onChange={() => checkUsers(checkusers)}>
        User name / User ID
      </Checkbox>
      <div className="px-4">
        <div className="row">
          <div className="col mt-2">
            <div
              className="border"
              style={{ minHeight: "330px", overflow: "auto" }}
            >
              <Input
                style={{ borderRadius: "0px", margin: 0 }}
                placeholder="User name / User ID"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
              />
              {usersNotSelect.map((user, key) => {
                return (
                  <div className="d-flex justify-content-between px-3 border-bottom py-2">
                    <h6 className="m-0 d-inline-block">
                      <h6>
                        {user.fname} {user.lname}
                      </h6>
                      <span className="mt-2">{user.ID}</span>
                    </h6>
                    <div>
                      <ButtonStyle
                        checked={checkusers}
                        onClick={() => {
                          checkusers ? onAddUser(user.ID) : "";
                        }}
                      >
                        <span style={{ fontSize: "12px" }}>Add</span>
                      </ButtonStyle>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col mt-2">
            <div className="border" style={{ minHeight: "330px" }}>
              <div
                className="border text-center pt-1"
                style={{ height: "33px" }}
              >
                <span>Selected</span>
              </div>
              {usersSelect.map((user, key) => {
                return (
                  <div className="d-flex justify-content-between px-3 border-bottom py-2">
                    <h6 className="m-0 d-inline-block">
                      <h6>
                        {user.fname} {user.lname}
                      </h6>
                      <span className="mt-2">{user.ID}</span>
                    </h6>
                    <div>
                      <ButtonStyle
                        danger={true}
                        checked={checkusers}
                        onClick={() => {
                          checkusers ? onRemoveUser(user.ID) : "";
                        }}
                      >
                        <span style={{ fontSize: "12px" }}>Remove</span>
                      </ButtonStyle>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
