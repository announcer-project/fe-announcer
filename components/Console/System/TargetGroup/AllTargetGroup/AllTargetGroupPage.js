import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

import Layout from "../../Layout/Layout";

const BoxCreateTargetGroup = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 60px;
`;

export default function AllTargetGroupPage(props) {
  const path = `/console/${props.query.systemname}/${props.query.systemid}`;
  const targetgroups = props.targetGroups;
  return (
    <Layout {...props}>
      <div className="container pt-4">
        <h1>All target group</h1>
        <div className="col-12">
          <div className="row">
            <div className="col-3 p-2">
              <BoxCreateTargetGroup className="shadow-sm pt-5">
                <Link href={`${path}/targetgroup/createtargetgroup`}>
                  <PlusOutlined />
                </Link>
                <p>Add target group</p>
              </BoxCreateTargetGroup>
            </div>
            {targetgroups.map((targetgroup, key) => {
              return (
                <div key={key} className="col-3 p-2">
                  <BoxCreateTargetGroup className="shadow-sm">
                    {targetgroup.TargetGroupName}
                  </BoxCreateTargetGroup>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
