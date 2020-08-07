import Head from "next/head";
import cookie from "../../tools/cookie";
import axios from "axios";
import { CreatesystemProvider } from '../../store/CreatesystemProvider';

import { withAuth } from "../../tools/withAuth";

import Page from "../../components/Console/Createsystem/CreatesystemPage";

function SystemsPage(props) {
    return (
        <>
            <Head>
                <title>Announcer - Create system</title>
            </Head>
            <CreatesystemProvider>
                <Page {...props} />
            </CreatesystemProvider>
        </>
    );
}

const fetchSystems = async (ctx) => {
    let header = {
        Authorization: "Bearer " + cookie.getJWT(ctx),
    };
    let systems = [];
    await axios
        .get(`${process.env.REACT_APP_BE_PATH}/system/allsystem`, {
            headers: header,
        })
        .then((res) => {
            systems = res.data;
        });
    return systems;
};

export async function getServerSideProps(ctx) {
    //   await withAuth(ctx);
    //   const systems = await fetchSystems(ctx);
    return {
        props: {},
    };
}

export default SystemsPage;
