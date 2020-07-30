import React, { useContext, useEffect } from "react";
import MobileScreen from "./MobileScreen";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";
import { ButtonBack, ButtonNext } from "../../Components";

export default function Step3({ systemname }) {
  const { messages, changeStep } = useContext(CreateLineBroadcastContext);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="pb-5 pt-3">
      <span className="font-large">Preview</span>
      <div className="d-flex justify-content-center pt-3 pb-5 border-bottom">
        <MobileScreen systemname={systemname} messages={messages} />
      </div>
      <div className="d-flex justify-content-between pt-3">
        <ButtonBack onClick={() => changeStep(2)}>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </div>
    </div>
  );
}
