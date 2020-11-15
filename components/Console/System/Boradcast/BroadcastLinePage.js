import React, { useContext, useEffect } from "react";
import Step from "../../../common/Step";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from ".././../../../tools/cookie";
import { CreateLineBroadcastContext } from "../../../../store/CreateLineBroadcastProvider";
import Receiver from "./LineForm/Step1/Step1";
import Message from "./LineForm/Step2/Step2";
import Preview from "./LineForm/Step3/Step3";
import { BroadcastLoading } from "./Skeleton";

export default function BroadcastLinePage() {
  const {
    newstypes,
    targetgroups,
    users,
    selectNewsTypes,
    selectTargetGroups,
    selectUsers,
    setNews,
    step,
  } = useContext(CreateLineBroadcastContext);
  const router = useRouter();
  const { systemid } = router.query;

  useEffect(() => {
    fetchAboutLineBroadcast();
  }, []);

  const setSelected = (data) => {
    let newData = [];
    for (let index = 0; index < data.length; index++) {
      let newdata1 = data[index];
      let newdata2 = {
        ...newdata1,
        selected: false,
      };
      newData.push(newdata2);
    }
    return newData;
  };

  const fetchAboutLineBroadcast = () => {
    axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/broadcast/line/aboutsystem?systemid=${systemid}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        }
      )
      .then((res) => {
        let aboutLineBroadcast = res.data;
        selectNewsTypes(setSelected(aboutLineBroadcast.newstypes));
        selectTargetGroups(setSelected(aboutLineBroadcast.targetgroups));
        console.log(aboutLineBroadcast)
        selectUsers(setSelected(aboutLineBroadcast.members));
        setNews(aboutLineBroadcast.news);
      });
  };

  const StepForm = () => {
    switch (step) {
      case 1:
        return <Receiver />;
      case 2:
        return <Message />;
      default:
        return <Preview />;
    }
  };
  return (
    <div>
      <div className="container py-4">
        <h1>Line Broadcast</h1>
        <div className="pt-4">
          <div id="StepBroadcast" className="col-12 col-sm-8 mx-auto">
            <Step
              StepShow={[
                { title: "Reciver" },
                { title: "Message" },
                { title: "Preview" },
              ]}
              now={step}
              size="small"
            />
          </div>
          {newstypes && targetgroups && users ? (
            <div className="mt-2 mt-sm-4 px-0 px-sm-3">{StepForm()}</div>
          ) : (
            <BroadcastLoading />
          )}
        </div>
      </div>
    </div>
  );
}
