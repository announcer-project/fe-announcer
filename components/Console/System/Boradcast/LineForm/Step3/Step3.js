import React, { useContext, useEffect, useState } from "react";
import MobileScreen from "./MobileScreen";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Swal from "sweetalert2";
import Button from "../../../../../common/Button";
import cookie from "../../../../../../tools/cookie";
import { LoadingOutlined } from "@ant-design/icons";

export default function Step3() {
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
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [loading, setLoading] = useState(false);

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
    if (!loading) {
      setLoading(true);
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
        datamessages.push(typemessage);
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
        .post(`${process.env.REACT_APP_BE_PATH}/broadcast/line`, data, {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "Broadcast success",
            showConfirmButton: true,
            timer: 3000,
          }).then((result) => {
            Router.push(`/console/${systemname}/${systemid}/home`);
          });
        });
    }
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
        <Button danger={true} className="px-5" onClick={() => changeStep(2)}>
          Back
        </Button>
        <Button className="px-5" onClick={() => onBroadcast()}>
          <LoadingOutlined className={`mr-1 ${loading ? "" : "d-none"}`} />
          Confirm
        </Button>
      </div>
    </div>
  );
}
