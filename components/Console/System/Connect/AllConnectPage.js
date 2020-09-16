import React from "react";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import Button from "../../../../components/common/Button";

const Box = styled.div`
    border: 1px solid #a6a6a6;
    cursor: pointer;
    padding: 22px;
    margin-bottom: 10px;
`;

const BoxSocial = styled.div`
    display: inline-block;
    padding: 6px;
    margin-right: 5px;
    background: ${props => props.line ? "#00B900" : "#3B5998"};
    border-radius: 8px;
`;

export default function AllConnectPage() {
    return (
        <Layout>
            <div className="container pt-4">
                <h1>Connect social api</h1>
                <Box>
                    <div className="d-flex justify-content-between">
                        <div>
                            <BoxSocial line={true}>
                                <img width="24px" src="/img/Login/Line.png" />
                            </BoxSocial>
                            <span className="mt-2">Line Official Account</span>
                        </div>
                        <div>
                            <Button
                                danger={false}
                            >
                                Connect API
                            </Button>
                            <Button
                                danger={true}
                            >
                                Disconnect
                            </Button>
                        </div>
                    </div>

                </Box>
                <Box>
                    <div className="d-flex justify-content-between">
                        <div>
                            <BoxSocial line={false}>
                                <img width="24px" src="/img/Login/Facebook.png" />
                            </BoxSocial>
                            <span className="mt-2">Facebook Page</span>
                        </div>                        
                        <div>
                            <Button
                                danger={false}
                            >
                                Connect API
                            </Button>
                            <Button
                                danger={true}
                            >
                                Disconnect
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        </Layout>

    )
}