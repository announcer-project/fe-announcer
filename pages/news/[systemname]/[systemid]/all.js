import React from "react";
import { Input } from 'antd';
import styled from "styled-components";
import Navbar from "../../../../components/News/Navbar";
import NewsCard from "../../../../components/Console/System/NewsPublishCard";

const { Search } = Input;

const Page = styled.div`
    margin-right: 20px;
    margin-left: 20px;
`
const SearchBox = styled.div`
    margin-top: 20px;
`

export default function Allnews({ systemname, systemid }) {
    const onSearch = value => console.log(value);
    return (
        <div>
            <Navbar systemname={systemname} systemid={systemid} />
            <Page>
                <SearchBox>
                    <Search placeholder="Search" onSearch={onSearch} enterButton />
                </SearchBox>
                {/* <NewsCard></NewsCard> */}
            </Page>
        </div>
    )
}

Allnews.getInitialProps = async (ctx) => {
    return { systemname: ctx.query.systemname, systemid: ctx.query.systemid };
};
