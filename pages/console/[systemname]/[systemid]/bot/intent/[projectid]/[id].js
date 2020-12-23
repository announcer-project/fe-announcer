import Head from "next/head";
import withAuth from "../../../../../../../hoc/withAuth";
import withLayout from "../../../../../../../hoc/withLayoutConsole";
import { useEffect, useState } from "react";
import { intent as intentapi } from "../../../../../../../api";
import Button from "../../../../../../../components/common/Button";
import Swal from "sweetalert2"
import Router from "next/router";
import Link from "next/link"

// import AllIntentsPage from "../../../../../components/Console/System/Bot/AllIntent";

function IntentPage({ systemname, systemid, projectid, intentid }) {
  const [loading, setLoading] = useState(true);
  const [intent, setIntent] = useState(null);

  useEffect(() => {
    fetchIntent();
  }, []);

  const fetchIntent = async () => {
    let intent = await intentapi.get(
      `/intent/${projectid}/${intentid}?systemid=${systemid}`
    );
    setIntent(intent.data);
    console.log("intent", intent);
    setLoading(false);
  };

  const deleteIntent = async () => {
    Swal.fire({
      title: "You want to delete this intent?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.value) {
        let data = {
          IntentName: intent.name,
          DisplayName: intent.display_name
        }
        await intentapi.delete(`/intent/delete?systemid=${systemid}`, { data: data }).then(res => {
          Swal.fire({
            icon: "success",
            title: "Delete success",
            showConfirmButton: true,
            timer: 3000,
          }).then(() => {
            Router.push(`/console/${systemname}/${systemid}/bot`)
          });
        }).catch(err => {
          Swal.fire({
            icon: "error",
            title: "Delete fail",
            text: err.response.data.message,
            showConfirmButton: true,
            timer: 3000,
          })
        })
      }
    });
  }

  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <div className="container pt-4">
        <h1>Intent</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
            <div>
              <div className="p-2 border d-flex justify-content-between">
                <span className="mt-2">{intent.display_name}</span>
                <div>
                  <Button onClick={_ => deleteIntent()} danger={true} className="mr-2">Delete</Button>
                  {/* <Button>Save</Button> */}
                </div>
              </div>
              <div className="p-2 border mt-2">
                <span>Traing Phrase</span>
                {intent.is_fallback ? (
                  <></>
                ) : (
                    <>
                      {intent.training_phrases.map((trining_phrase, key) => {
                        let text = trining_phrase.parts[0].text;
                        return (
                          <div key={key} className="border p-2 mb-1">
                            {text}
                          </div>
                        );
                      })}
                      {/* <div className="text-center">
                        <Button>+</Button>
                      </div> */}
                    </>
                  )}
              </div>
              <div className="p-2 border mt-2">
                <span>Response</span>
                {intent.messages[0].Message.Text.text ? (
                  <>
                    {intent.messages[0].Message.Text.text.map((text, key) => {
                      return (
                        <div key={key} className="border p-2 mb-1">
                          {text}
                        </div>
                      );
                    })}
                  </>
                ) : (
                    <></>
                  )}
                {/* <div className="text-center">
                  <Button>+</Button>
                </div> */}
              </div>
            </div>
          )}
        <div className="d-flex justify-content-left mt-3">
          <Link
            href={`/console/[systemname]/[systemid]/bot?systemname=${systemname}&systemid=${systemid}`}
            as={`/console/${systemname}/${systemid}/bot`}
          >
            <Button danger={true}>Back</Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

IntentPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
    projectid: ctx.query.projectid,
    intentid: ctx.query.id,
  };
};

export default withAuth(withLayout(IntentPage));
