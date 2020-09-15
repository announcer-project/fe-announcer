import React from "react"
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from "next/router"

const Box = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 40px;
`;
const BoxAddRoleUser = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
`;

export default function AllRolePage() {
    let router = useRouter()
    let {systemid, systemname} = router.query
    return (
        <Layout>
            <div className="container pt-4">
                <h1>Role user (Line official account)</h1>
                <div className="col-12">
                    <div className="row">
                        <div className="col-3 p-2">
                                <Link href={`/console/${systemname}/${systemid}/role/createrole`}>
                                    <Box className="text-center">
                                        <span className="font-large">
                                            +<br />
                                            Create role user
                                        </span>
                                    </Box>
                                </Link>
                        </div>
                        {/* {newstypes.map((newstype) => {
                            return ( */}
                                <div className="col-3 p-2">
                                    <Box className="shadow-sm">
                                        test
                                    </Box>
                                </div>
                            {/* );
                        })} */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}