import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { Checkbox } from "antd";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";
import NewsTypeSelector from "./Reciever/ReceiverNewstype";
import TargetGroupSelector from "./Reciever/ReceiverTargetGroup";
import UserSelector from "./Reciever/ReceiverUser";
import Swal from "sweetalert2";
import { ButtonBack, ButtonNext } from "../../Components";

import "./Checkbox.module.css"

export default function Step1({ systemname, systemid }) {
  const {
    selectEveryone,
    everyone,
    checknewstypes,
    newstypes,
    checktargetgroups,
    targetgroups,
    checkusers,
    usersSelect,
    changeStep,
  } = useContext(CreateLineBroadcastContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const Alert = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };
  const onNextStep = () => {
    if (everyone || checknewstypes || checktargetgroups || checkusers) {
      let newstypesSelect = newstypes.filter((newstype) => newstype.selected);
      let targetgroupsSelect = targetgroups.filter(
        (targetgroup) => targetgroup.selected
      );
      if (checknewstypes && newstypesSelect.length === 0) {
        Alert("Please select news type");
      } else if (checktargetgroups && targetgroupsSelect.length === 0) {
        Alert("Please select target group");
      } else if (checkusers && usersSelect.length === 0) {
        Alert("Please select user");
      } else {
        changeStep(2);
      }
    } else {
      Alert("Please select receiver");
    }
  };

  return (
    <div>
      <div className="px-3">
        <div className="pb-5 border-bottom">
          <span className="font-large">Receiver</span>
          <div className="container px-5 pt-3">
            <div id="CheckboxBroadcast">
              <div className="pb-3">
                <Checkbox
                  checked={everyone}
                  onChange={() => selectEveryone(everyone)}
                >
                  Everyone
                </Checkbox>
              </div>
              <div className="pb-3">
                <NewsTypeSelector />
              </div>
              <div className="pb-3">
                <TargetGroupSelector />
              </div>
              <div>
                <UserSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <Link href={`/console/${systemname}/${systemid}/broadcast`}>
          <ButtonBack />
        </Link>
        <ButtonNext onClick={() => onNextStep()}>Next</ButtonNext>
      </div>
    </div>
  );
}
