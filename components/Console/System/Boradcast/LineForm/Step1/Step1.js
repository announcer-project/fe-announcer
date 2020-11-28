import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Checkbox } from "../../../../../common/Form";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";
import NewsTypeSelector from "./Reciever/ReceiverNewstype";
import TargetGroupSelector from "./Reciever/ReceiverTargetGroup";
import UserSelector from "./Reciever/ReceiverUser";
import Swal from "sweetalert2";
import Button from "../../../../../common/Button"

export default function Step1() {
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

  const router = useRouter();
  const { systemname, systemid } = router.query;

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
      <div className="pb-5 border-bottom">
        <h2>Select reciever</h2>
        <div className="px-0 px-sm-3 pt-2">
          <Form>
            <Checkbox
              checked={everyone}
              onChange={() => selectEveryone(everyone)}
            >
              Everyone
            </Checkbox>
          <div className="pb-3">
            <NewsTypeSelector />
          </div>
          <div className="pb-3">
            <TargetGroupSelector />
          </div>
          <div>
            <UserSelector />
          </div>
          </Form>
        </div>
      </div>
      <div className="text-right pt-3">
        {/* <Link href={`/console/${systemname}/${systemid}/broadcast`}>
          <Button className="px-5"  danger={true} >Back</Button>
        </Link> */}
        <Button className="px-5" onClick={() => onNextStep()}>Next</Button>
      </div>
    </div>
  );
}
