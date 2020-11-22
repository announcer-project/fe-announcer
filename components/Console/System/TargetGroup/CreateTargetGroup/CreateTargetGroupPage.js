import React, { useState, useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Swal from "sweetalert2";
import cookie from "../../../../../tools/cookie";
import Button from "../../../../common/Button";
import { useForm, Form, Input, ButtonSubmit } from "../../../../common/Form";
import { LoadingOutlined } from "@ant-design/icons";
import Skeleton from "react-loading-skeleton";

export default function CreateTargetGroupPage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [members, setMembers] = useState(null);
  const [membersSelect, setMembersSelect] = useState([]);
  const [membersNotSelect, setMembersNotSelect] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const path = `/console/${systemname}/${systemid}`;
  let [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      targetgroup: "",
    });
    if (members) {
      setMembersNotSelect(members);
    } else {
      fetchMembers();
    }
  }, []);

  const fetchMembers = async () => {
    await axios
      .get(`${process.env.REACT_APP_BE_PATH}/member/all?systemid=${systemid}`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        console.log("members", res.data);
        setMembers(res.data);
        setMembersNotSelect(res.data);
      });
  };

  const onAddUser = (id) => {
    let notselect = membersNotSelect.filter(
      (member) => member.ID !== id
    );
    let member = membersNotSelect.filter((member) => member.ID === id);
    let select = membersSelect;
    select.push(member[0]);
    setMembersNotSelect(notselect);
    setMembersSelect(select);
    setMembers(notselect);
  };

  const onRemoveUser = (id) => {
    let select = membersSelect.filter((member) => member.member.ID !== id);
    let member = membersSelect.filter((member) => member.member.ID === id);
    let notselect = membersNotSelect;
    notselect.push(member[0]);
    setMembersNotSelect(notselect);
    setMembersSelect(select);
    setMembers(notselect);
  };

  const onSearch = (value) => {
    setSearch(value);
    let newusers = members.filter((member) => {
      let name =
        member.f_name.toUpperCase() + " " + member.l_name.toUpperCase();
      return (
        name.search(value.toUpperCase()) > -1 ||
        member.ID.search(value.toUpperCase()) > -1
      );
    });
    setMembersNotSelect(newusers);
  };

  const SetMembersReq = async () => {
    let membersReq = [];
    await membersSelect.forEach((m) => {
      let data = {
        memberid: m.ID,
      };
      membersReq.push(data);
    });
    return membersReq;
  };

  const AddTargetGroup = async (values) => {
    if (membersSelect.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add member",
      });
    } else {
      setLoading(true);
      let membersReq = await SetMembersReq();
      let data = {
        groupname: values.targetgroup,
        systemid: systemid,
        members: membersReq,
      };
      axios
        .post(`${process.env.REACT_APP_BE_PATH}/targetgroup/create`, data, {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Create target group success",
            timer: 3000,
          }).then((result) => {
            Router.push(`${path}/targetgroup/alltargetgroup`);
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error",
          });
          setLoading(false);
        });
    }
  };

  return (
    <div className="container pt-4">
      <h1>Create target group</h1>
      {members ? (
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          onFinish={AddTargetGroup}
        >
          <Input
            label="Target group name"
            name="targetgroup"
            rules={[
              { required: true, message: "Please input target group name !" },
            ]}
          />
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
                {membersNotSelect.map((member, key) => {
                  return (
                    <div className="d-flex justify-content-between px-3 border-bottom py-2">
                      <h6 className="m-0 d-inline-block">
                        <h6>
                          {member.f_name} {member.l_name}
                        </h6>
                        <span className="mt-2">{member.ID}</span>
                      </h6>
                      <div>
                        <Button onClick={() => onAddUser(member.ID)}>
                          <span style={{ fontSize: "12px" }}>Add</span>
                        </Button>
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
                {membersSelect.map((member, key) => {
                  return (
                    <div className="d-flex justify-content-between px-3 border-bottom py-2">
                      <h6 className="m-0 d-inline-block">
                        <h6>
                          {member.f_name} {member.l_name}
                        </h6>
                        <span className="mt-2">{member.ID}</span>
                      </h6>
                      <div>
                        <Button
                          danger={true}
                          onClick={() => onRemoveUser(member.ID)}
                        >
                          <span style={{ fontSize: "12px" }}>Remove</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-between">
            <Button className="d-inline-block" danger={true}>
              Back
            </Button>
            <ButtonSubmit className="d-inline-block">
              <LoadingOutlined className={`${loading ? "" : "d-none"} mr-2`} />
              Create
            </ButtonSubmit>
          </div>
        </Form>
      ) : (
        <div>
          <Skeleton height={30} />
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-lg-6">
                <Skeleton height={250} />
              </div>
              <div className="col-12 col-lg-6">
                <Skeleton height={250} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
