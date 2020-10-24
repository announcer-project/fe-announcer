import React from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import Button from "../../../common/Button";

const Systempicture = styled.img`
  width: 177px;
  height: 177px;
  object-fit: cover;
  border-radius: 100px;
`;

const Box = styled.div`
  border: 1px solid #c4c4c4;
  padding: 10px 15px 10px 15px;
  margin-bottom: 15px;
`;

const Text = styled.div`
  color: black;
`;

export default function SettingPage({ systemDetail }) {
  const router = useRouter();
  const { systemname, systemid } = router.query;
  const system = systemDetail;
  return (
    <div className="container py-4">
      <h1>Setting</h1>
      <div className="text-center pt-3">
        <Systempicture
          src={`${process.env.REACT_APP_STORAGE}/systems/${system.ID}.png`}
        />
        <div className="pt-5">System name: {system.system_name}</div>
        <div className="pt-3 pb-5">System ID: {system.ID}</div>
      </div>
      <Link
        href={`/console/[systemname]/[systemid]/setting/admin?systemname=${systemname}&systemid=${systemid}`}
        as={`/console/${systemname}/${systemid}/setting/admin`}
      >
        <Box>
          <a>
            <div className="d-flex justify-content-between">
              <Text>Setting admin</Text>
              <Text>
                <RightOutlined />
              </Text>
            </div>
          </a>
        </Box>
      </Link>
      <div className="pt-3">
        <h1 className="pb-2">Delete this system</h1>
        <Button danger={true}>Delete</Button>
      </div>
    </div>
  );
}
