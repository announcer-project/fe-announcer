import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Layout from "../Layout/Layout";

const BoxNews = styled.div`
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
`;
const BoxNewsType = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 60px;
`;
const BoxCreateTargetGroup = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 60px;
`;

function HomeSystemPage(props) {
  const [news, setNews] = useState([
    {
      title: "ตารางนัดประเมินงานคลีนิก SW Process (5-8 May 2020)",
      body:
        "การนัดคุยครั้งนี้ จะคุยกันโดยใช้ Microsoft team กลุ่ม INT206 ใน Channel ของกลุ่มโปรเจค ให้สมาชิกในทีม join meeting ที่อ.สร้างไว้ใน channel ตามเวลานัด อ.อาจจะเลท 1-25 นาที (จากการคุยกับกลุ่มก่อนหน้า) ...",
      author: "Dr.Olarn",
      postdate: "Post 05/05/2020",
    },
  ]);
  const [newstypes, setNewstypes] = useState([]);
  const [targetgroups, setTargetgroups] = useState([]);
  const systemname = props.query.systemname;

  useEffect(() => {
    setNewstypes(props.aboutSystem.newstypes);
    setTargetgroups(props.aboutSystem.targetgroups)
  }, []);

  return (
    <>
      <Layout {...props}>
        <div className="container pt-2">
          <h1>{systemname}</h1>
          <div>
            <h2>News</h2>
            <div className="col-12">
              <div className="row">
                {news.map((news) => {
                  return (
                    <div className="col-4 p-2">
                      <BoxNews className="shadow-sm pt-3 px-3">
                        <h5>{news.title}</h5>
                        <p>{news.body}</p>
                        <p>{news.author}</p>
                        <p>{news.postdate}</p>
                      </BoxNews>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h2>News type</h2>
            <div className="col-12">
              <div className="row">
                {newstypes.map((newstype) => {
                  return (
                    <div className="col-3 p-2">
                      <BoxNewsType className="shadow-sm">
                        {newstype.NewsTypeName}
                      </BoxNewsType>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h2>Target group</h2>
            <div className="col-12">
              <div className="row">
                {targetgroups.map((targetgroup) => {
                  return (
                    <div className="col-3 p-2">
                      <BoxCreateTargetGroup className="shadow-sm">
                        {targetgroup.TargetGroupName}
                      </BoxCreateTargetGroup>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomeSystemPage;