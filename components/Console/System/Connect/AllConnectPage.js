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

export default function AllConnectPage() {
    return (
        <Layout>
            <div className="container pt-4">
                <h1>Connect social api</h1>
                <Box>
                    <div className="d-flex justify-content-between">
                        <span className="mt-2">Line Official Account</span>
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
                        <span className="mt-2">Facebook Page</span>
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