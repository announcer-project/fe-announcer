import React, { useEffect, useState } from "react";
import { Input, Form } from "antd";
import styled from "styled-components";
import Navbar from "../../../../components/News/Navbar";
import NewsCard from "../../../../components/Console/System/NewsPublishCard";
import Button from "../../../../components/common/Button";
import { news as newsapi } from "../../../../api";
import Link from "next/link";

const { Search } = Input;

const SearchBox = styled.div`
  margin-top: 20px;
`;

const NewstypeBox = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 8px 15px;
  border: 1px solid #a6a6a6;
  border-radius: 25px;
  background-color: ${(props) =>
    props.selected ? props.theme.color.base : "white"};
  color: ${(props) => (!props.selected ? props.theme.color.base : "white")};
`;

export default function Allnews({ systemname, systemid }) {
  const [news, setNews] = useState([]);
  const [newstype, setNewstype] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewstype, setShowNewstype] = useState(false);
  const [newstypeSelected, setNewstypeSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    fetchNewsType();
    console.log(1);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let searchQuery = urlParams.get("search");
    let newstypeidQuery = urlParams.get("newstypeid");
    if (searchQuery === null || newstypeidQuery === null) {
      window.history.pushState(null, "", "?search=&newstypeid=0");
      setFilter(!filter);
    } else {
      fetchNews(searchQuery, newstypeidQuery);
    }
  }, [filter]);

  const fetchNewsType = async () => {
    await newsapi.get(`/newstype/all?systemid=${systemid}`).then((res) => {
      setNewstype(res.data.map((nt) => ({ ...nt, selected: false })));
    });
  };

  const fetchNews = async (search, newstypeid) => {
    await newsapi
      .get(`/${systemid}/search?search=${search}&newstypeid=${newstypeid}`)
      .then((res) => {
        setNews(res.data);
        console.log(res.data);
      });
  };

  const onSelectNewstype = async (id) => {
    window.history.pushState(null, "", `?search=${search}&newstypeid=${id}`);
    setNewstypeSelected(id);
    setFilter(!filter);
  };

  const onSearch = (value) => {
    window.history.pushState(
      null,
      "",
      `?search=${value}&newstypeid=${newstypeSelected}`
    );
    setSearch(value);
    setFilter(!filter);
  };
  return (
    <div>
      <Navbar systemname={systemname} systemid={systemid} />
      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <div className="pr-2 w-100">
            <SearchBox className="mt-0">
              <Search placeholder="Search" onSearch={onSearch} enterButton />
            </SearchBox>
          </div>
          <div>
            <Button onClick={(_) => setShowNewstype(!showNewstype)}>
              Filter
            </Button>
          </div>
        </div>
        <div className={`p-3 pt-0 shadow-sm ${showNewstype ? "" : "d-none"}`}>
          <NewstypeBox
            selected={newstypeSelected === 0}
            onClick={(_) => onSelectNewstype(0)}
          >
            ทั้งหมด
          </NewstypeBox>
          {newstype.map((nt, key) => {
            return (
              <NewstypeBox
                selected={newstypeSelected === nt.ID}
                onClick={(_) => onSelectNewstype(nt.ID)}
              >
                {nt.newstype_name}
              </NewstypeBox>
            );
          })}
        </div>
        <div className="col-12">
          <div className="row pt-3">
            {news.map((n, key) => {
              return (
                <div className="col-12 col-md-4 px-2 mt-2">
                  <Link
                    href={`/news/${systemname}/${systemid}/${n.ID}`}
                    prefetch={false}
                  >
                    <a target="_blank" style={{ color: "black" }}>
                      <NewsCard news={n}></NewsCard>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Allnews.getInitialProps = async (ctx) => {
  return { systemname: ctx.query.systemname, systemid: ctx.query.systemid };
};
