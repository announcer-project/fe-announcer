import React, { useContext, useEffect } from "react";
import MobileScreen from "./MobileScreen";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";
import { ButtonBack, ButtonNext } from "../../Components";
import axios from "axios";
import { useRouter } from "next/router";

export default function Step3({ systemname }) {
  const {
    messages,
    changeStep,
    everyone,
    checknewstypes,
    newstypes,
    checktargetgroups,
    targetgroups,
    checkusers,
    usersSelect,
  } = useContext(CreateLineBroadcastContext);
  const router = useRouter()
  const systemid = router.query.systemid

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);
  
  const onBroadcast = () => {
    let datamessages = [];
    messages.forEach((msg) => {
      let typemessage = {
        type: "",
        data: "",
        news: {},
      };
      switch (msg.type) {
        case "news":
          typemessage.type = msg.type;
          typemessage.news = msg.data;
          break;
        default:
          typemessage.type = msg.type;
          typemessage.data = msg.data;
          break;
      }
      datamessages.push(typemessage)
    });

    let data = {
      systemid: systemid,
      everyone: everyone,
      checknewstypes: checknewstypes,
      newstypes: newstypes.filter((newstype) => newstype.selected),
      checktargetgroups: checktargetgroups,
      targetgroups: targetgroups.filter((newstype) => newstype.selected),
      checkusers: checkusers,
      users: usersSelect,
      messages: datamessages,
    };
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_BE_PATH}/broadcast/line`, data)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <span className="font-large">Preview</span>
      <div className=" border-bottom d-flex justify-content-center">
        <div className="pb-5 pt-3 col-12 col-lg-4">
          <MobileScreen systemname={systemname} messages={messages} />
        </div>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <ButtonBack onClick={() => changeStep(2)}>Back</ButtonBack>
        <ButtonNext onClick={() => onBroadcast()}>Next</ButtonNext>
      </div>
    </div>
  );
}
