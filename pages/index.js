import Head from "next/head";
import withLayout from "../hoc/withLayout";
import Page from "../components/Home/HomePage";
import styled from "styled-components";
import Button from "../components/common/Button"

const Background = styled.div`
  position: absolute;
`
const TextNews = styled.div`
    font-size: 50px;
    color: #426796;

`
const AllText = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  margin-top: 100px;
  margin-right: 150px;
`
const Detail = styled.div`
    color: #426796;
    margin-bottom: 20px;
`
const BigText = styled.div`
  margin-top: -20px;
`
const Box = styled.div`
  border: 1px solid #426796;
  border-radius: 30px;
  padding: 20px;
`

function Home() {
  return (
    <>
      <Head>
        <title>Announcer</title>
      </Head>
      <div style={{ position: "relative", height: "66vh" }}>
        <Background>
          <img className="w-100" src="/img/bg-home.png" />
        </Background>
        <AllText>
          <TextNews className="font-weight-bold">
            <div>
              NEWS
              </div>
            <BigText>
              MANAGEMENT
              </BigText>
          </TextNews>
          <Detail>
            Announcer is system that can help the<br />
              organization to announce the news to people<br />
              according to the type of news that users are interested.
            </Detail>
          <Button className="px-5">Start</Button>
        </AllText>
      </div>
      <div className="container text-center mt-5">
        <div className="col-12">
          <div className="row">
            <div className="col px-5">
              <Box>
                <div className="font-weight-bold pb-2">
                  Connect Line OA
                </div>
                <div>
                  jfdjfldjfljfljflfldj
                </div>
              </Box>
            </div>
            <div className="col px-5">
              <Box>
                <div className="font-weight-bold pb-2">
                  Manage news
            </div>
                <div>
                  dkfkldnfklnkndk
                </div>
              </Box>
            </div>
            <div className="col px-5">
              <Box>
                <div className="font-weight-bold pb-2">
                  Anounce news
                </div>
                <div>
                  according to the type of news that users are interested.
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <Page />
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  return { page: "home" };
};

export default withLayout(Home);
