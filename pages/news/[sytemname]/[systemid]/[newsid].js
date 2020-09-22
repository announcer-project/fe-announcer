import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Modal } from "antd";
import moment from "moment";

const Topic = styled.div`
    font-size: 1.8rem;
`
const Line = styled.hr`
    border: 1px solid #36689A;
    color: #36689A;
`
const BoxNewstype = styled.div`
    border: 1px solid #A6A6A6;
    border-radius: 25px;
    display: inline-block;
    padding: 5px 15px;
    margin-left: 10px; 
`
const Image = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    cursor: pointer;
`


export default function LiffPage(props) {
    let news = props.news
    console.log(news);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const showModal = async (url, imagename) => {
        setPreviewImage(url);
        setPreviewVisible(true);
        setPreviewTitle(imagename);
    };

    const handleCancel = () => {
        setPreviewVisible(false);
    };

    const createMarkup = (body) => {
        return { __html: body };
    };

    return (
        <div className="container">
            <div className="col-lg-8 mx-auto py-5">
                <Topic>
                    {news.title}
                </Topic>
                <Line />
                <div className="d-flex justify-content-between pb-5">
                    <div>
                        Post date :  {moment(news.create_date).format("DD/MM/YYYY")}
                        <br />
                    Expire date : {moment(news.expire_date).format("DD/MM/YYYY")}
                    </div>
                    <div>Written by : Panupong</div>
                </div>
                <div className="pb-5">
                    <div
                        dangerouslySetInnerHTML={createMarkup(news.body)}
                        className="editor"
                    ></div>
                </div>
                <div className="row">
                    {news.Image.map((image, key) => {
                        return (
                            <div className="col-12 col-lg-4">
                                <Image
                                    onClick={() => showModal(`${process.env.REACT_APP_STORAGE}/news/${image.ImageName}`, image.ImageName)}
                                    src={`${process.env.REACT_APP_STORAGE}/news/${image.ImageName}`}
                                />
                                <Modal
                                    title={previewTitle}
                                    visible={previewVisible}
                                    onCancel={() => handleCancel()}
                                    footer={null}
                                >
                                    <Image src={previewImage} />
                                </Modal>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-5">
                    News type :
                {news.type_of_news.map((newstype, key) => {
                    return (
                        <BoxNewstype className="shadow">{newstype.NewsTypeName}</BoxNewstype>
                    )
                })}
                </div>
            </div>
        </div>

    )
}

const fetchNews = async (id) => {
    let news = {}
    await axios.get(`${process.env.REACT_APP_BE_PATH}/news/publish/${id}`).then((res) => {
        news = res.data
    })
    return news
}

export async function getServerSideProps(ctx) {
    let news = await fetchNews(ctx.query.newsid)
    return { props: { news } };
}
