import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Input } from "antd";
import Swal from "sweetalert2";
import cookie from "../../../../../tools/cookie";
import Layout from "../../Layout/Layout";
import Button from "../../../../common/Button";

const Box = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 40px;
`;
const BoxAddNewsType = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
`;
const ButtonAddNewsType = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  width: 77px;
  margin-top: 10px;
`;

export default function CreateNewsTypePage(props) {
  const [newstype, setNewstype] = useState("");
  const [newstypes, setNewstypes] = useState(props.newsTypes);

  const GetNewsTypes = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/news/newstype/allnewstype?systemid=${props.query.systemid}&systemname=${props.query.systemname}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        }
      )
      .then((res) => {
        setNewstypes(res.data);
      });
  };

  const addNewsType = async () => {
    if (newstype !== "") {
      if (newstype.charAt(0) !== " ") {
        let data = new FormData();
        data.append("systemid", props.query.systemid);
        data.append("newstypename", newstype);
        await axios
          .post(`${process.env.REACT_APP_BE_PATH}/news/newstype/create`, data, {
            headers: {
              Authorization: "Bearer " + cookie.getJWT(),
            },
          })
          .then((res) => {
            GetNewsTypes();
            setNewstype("");
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please delete space from first text",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter news type name",
      });
    }
  };
  return (
    <Layout {...props}>
      <div className="container pt-4">
        <h3>Create news type</h3>
        <div className="col-12">
          <div className="row">
            <div className="col-3 p-2">
              <BoxAddNewsType className="shadow-sm pt-3 px-3">
                <p>Add news type</p>
                <Input
                  onChange={(e) => setNewstype(e.target.value)}
                  value={newstype}
                  placeholder="Enter type name"
                />
                <br />
                <ButtonAddNewsType onClick={addNewsType} type="button">
                  Add
                </ButtonAddNewsType>
              </BoxAddNewsType>
            </div>
            {newstypes.map((newstype) => {
              console.log(newstype)
              return (
                <div className="col-3 p-2">
                  <Box className="shadow-sm">{newstype.newstype_name}
                    <br />
                    <Button className="mt-3" danger={true} onClick={() => console.log(newstype.newstype_name)}>Delete</Button>
                  </Box>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
