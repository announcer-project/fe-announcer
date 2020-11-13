import React from "react";
import styled from "styled-components";

const WaitingPicture = styled.img`
    width: 50%;
    padding-bottom: 50px;
`;

const Page = styled.div`
    padding-top: 130px;
`;

export default function WaitingPage() {
    return (
        <div className="container pt-5">
            <Page className="text-center">
                <WaitingPicture src="/img/Line/waiting.png" />
                <div>Please wait for approval from the admin.</div>
            </Page>
        </div>
    )
}
