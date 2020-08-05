import React, { useContext, useState, useEffect } from "react";
import { Input, Checkbox } from "antd";
import { ButtonAddUser, ButtonRemoveUser } from "./Components";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

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
        let name = user.name.toUpperCase();
        return (
          name.search(search.toUpperCase()) > -1 ||
          name.search(search.toUpperCase()) > -1
        );
      });
      setUsersNotSelect(newusers);
    }
  }, [users, usersSelect]);

  const onAddUser = (id) => {
    let user = users.filter((user) => user.userid === id);
    let newusers = users.filter((user) => user.userid !== id);
    let newsusersselect = usersSelect;
    newsusersselect.push(user[0]);
    selectUsers(newusers);
    changeUsersSelect(newsusersselect);
  };

  const onRemoveUser = (id) => {
    let user = usersSelect.filter((user) => user.userid === id);
    let newusersSelect = usersSelect.filter((user) => user.userid !== id);
    let newusers = users;
    newusers.push(user[0]);
    changeUsersSelect(newusersSelect);
    selectUsers(newusers);
  };

  const onSearch = (value) => {
    setSearch(value);
    let newusers = users.filter((user) => {
      let name = user.name.toUpperCase();
      return (
        name.search(value.toUpperCase()) > -1 ||
        name.search(value.toUpperCase()) > -1
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
            <Input
              className="input-text-height"
              placeholder="User name / User ID"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            <div
              className="border"
              style={{ minHeight: "300px", overflow: "auto" }}
            >
              {usersNotSelect.map((user, key) => {
                return (
                  <div className="d-flex justify-content-between px-3 border-bottom py-2">
                    <span className="font-small">
                      {user.name}
                      <br />
                      {user.userid}
                    </span>
                    <ButtonAddUser
                      checked={checkusers}
                      onClick={() => {
                        checkusers ? onAddUser(user.userid) : "";
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col mt-2">
            <div className="border text-center pt-1" style={{ height: "30px" }}>
              <span>Selected</span>
            </div>
            <div className="border" style={{ minHeight: "300px" }}>
              {usersSelect.map((user, key) => {
                return (
                  <div className="d-flex justify-content-between px-3 border-bottom py-2">
                    <span className="font-small">
                      {user.name}
                      <br />
                      {user.userid}
                    </span>
                    <ButtonRemoveUser
                      checked={checkusers}
                      onClick={() => {
                        checkusers ? onRemoveUser(user.userid) : "";
                      }}
                    />
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
