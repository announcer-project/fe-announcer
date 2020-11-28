import Head from "next/head";
import withLayout from "../hoc/withLayout";
import Page from "../components/Home/HomePage";
import styled from "styled-components";
import Button from "../components/common/Button";
import Link from "next/link";

const Background = styled.div`
  /* position: absolute; */
`;
const TextNews = styled.div`
  font-size: 50px;
  color: #426796;
`;
const AllText = styled.div`
  position: absolute;
  z-index: 1;
  right: 150px;
  top: 100px;
`;
const Detail = styled.div`
  color: #426796;
  margin-bottom: 20px;
`;
const BigText = styled.div`
  margin-top: -20px;
`;
const Box = styled.div`
  border: 1px solid #426796;
  border-radius: 30px;
  padding: 20px;
`;

function Home() {
  const services = [
    {
      name: "News management",
      description: "Admin can create, update and delete news and newstype",
    },
    {
      name: "Target group management",
      description:
        "Admin can create target group for announce news to target group",
    },
    {
      name: "Connect Line Official Account",
      description:
        "Admin can connect Line OA with system for announce news via Line",
    },
  ];
  return (
    <>
      <Head>
        <title>Announcer</title>
      </Head>
      <div style={{ position: "relative" }}>
        <Background>
          <img className="w-100" src="/img/bg-home.png" />
        </Background>
        <AllText>
          <TextNews className="font-weight-bold">
            <div>NEWS</div>
            <BigText>MANAGEMENT</BigText>
          </TextNews>
          <Detail>
            Announcer is system that can help the
            <br />
            organization to announce the news to people
            <br />
            according to the type of news that users are interested.
          </Detail>
          <Link href="/console/systems">
            <Button className="px-5">Start</Button>
          </Link>
        </AllText>
      </div>
      <div className="container text-center py-5">
        <div className="col-12">
          <div className="row">
            {services.map((service, key) => {
              return (
                <div className="col px-5">
                  <Box>
                    <div className="font-weight-bold pb-2">{service.name}</div>
                    <div>{service.description}</div>
                  </Box>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-top py-3">
        <div className="container color-drop" style={{fontSize:"12px"}}>@ Announcer</div>
      </div>
      <Page />
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  return { page: "home" };
};

export default withLayout(Home);
