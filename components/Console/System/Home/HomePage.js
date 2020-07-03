import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Layout from "../Layout/Layout";
import LoadingPage from "../../../Loading";

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
  //   const [loading, setLoading] = useState(true);
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
    // setLoading(false);
  }, []);

  return (
    <>
      <Layout {...props}>
        {/* <LoadingPage display={loading} /> */}
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

// import React from "react";
// import Layout from "../Components/Layout";

// class HomeSystemPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: {
//         system: "",
//         systemid: 0,
//         pageType: "",
//         page: "home",
//       },
//       news: [
//         {
//           title: "ตารางนัดประเมินงานคลีนิก SW Process (5-8 May 2020)",
//           body:
//             "การนัดคุยครั้งนี้ จะคุยกันโดยใช้ Microsoft team กลุ่ม INT206 ใน Channel ของกลุ่มโปรเจค ให้สมาชิกในทีม join meeting ที่อ.สร้างไว้ใน channel ตามเวลานัด อ.อาจจะเลท 1-25 นาที (จากการคุยกับกลุ่มก่อนหน้า) ...",
//           author: "Dr.Olarn",
//           postdate: "Post 05/05/2020",
//         },
//       ],
//       targetgroups: [],
//       newstype: [],
//     };
//   }
//   async componentWillMount() {
//     const { system, systemid } = this.props.match.params;
//     console.log(system);
//     await this.setState((prevState) => ({
//       data: {
//         ...prevState.data,
//         system: system,
//         systemid: systemid,
//       },
//     }));
//   }
//   async componentDidMount() {
//     this.props.onLoading(true);
//     await this.GetTargetGroups();
//     await this.GetNewsTypes();
//     this.props.onLoading(false);
//   }
//   GetNewsTypes = async () => {
//     const { system, systemid } = this.props.match.params;
//     await axios
//       .get(
//         `${process.env.REACT_APP_BE_PATH}/news/newstype/allnewstype?systemid=${systemid}&systemname=${system}`,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("JWT"),
//           },
//         }
//       )
//       .then(async (res) => {
//         console.log("newstypes", res.data);
//         await this.setState({ newstype: res.data });
//       });
//   };
//   GetTargetGroups = async () => {
//     const { system, systemid } = this.props.match.params;
//     await axios
//       .get(
//         `${process.env.REACT_APP_BE_PATH}/targetgroup/all?systemid=${systemid}&systemname=${system}`,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("JWT"),
//           },
//         }
//       )
//       .then(async (res) => {
//         console.log("targetgroup" + res.data);
//         await this.setState({ targetgroups: res.data });
//       });
//   };

//   render() {
//     return <Layout {...this.props} data={this.state.data}></Layout>;
//   }
// }

// export default HomeSystemPage;
