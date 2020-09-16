import React, { useState } from "react"
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router"

const Box = styled.div`
    height: 145px;
    border: 1px solid #a6a6a6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding-top: 10px;
`;

const BoxApprove = styled.div`
    color: white;
    background-color: ${props => props.theme.color.background} ;
    border-radius: 50px;
    text-align: center;
    padding: 3px 10px 3px 10px;
    margin-right: 10px;
    float:right;
`;

export default function AllRolePage(props) {
    const [rolenames] = useState(props.role);
    let router = useRouter()
    let { systemid, systemname } = router.query

    return (
        <Layout>
            <div className="container pt-4">
                <h1>Role user (Line official account)</h1>
                <div className="col-12">
                    <div className="row">
                        <div className="col-3 p-2">
                            <Link href={`/console/${systemname}/${systemid}/role/createrole`}>
                                <Box className="text-center">
                                    <div className="font-large mt-4">
                                        +<br />
                                            Create role user
                                    </div>
                                </Box>
                            </Link>
                        </div>
                        {rolenames.map((role) => {
                            return (
                                <div className="col-3 p-2">
                                    <Box className="shadow-sm">
                                        <div>
                                            <BoxApprove className={`${role.require? "" : "d-none"}`}>Must approve</BoxApprove>
                                        </div>
                                        <div className="mt-5">
                                            {role.rolename}
                                        </div>
                                    </Box>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}