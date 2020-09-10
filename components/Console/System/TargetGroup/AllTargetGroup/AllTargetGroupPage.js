import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;
  const targetgroups = props.targetGroups;
  return (
    <Layout>
      <div className="container pt-4">
        <h1>All target group</h1>
        <div className="col-12">
          <div className="row">
            <div className="col-3 p-2">
              <Link href={`${path}/targetgroup/createtargetgroup`}>
                <BoxCreateTargetGroup className="shadow-sm pt-5">
                  <PlusOutlined />
                  <p>Add target group</p>
                </BoxCreateTargetGroup>
              </Link>
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
