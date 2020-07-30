import React, { useContext, useEffect } from "react";
import Message from "./Message";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";
import Swal from "sweetalert2";
import { ButtonBack, ButtonNext } from "../../Components";

export default function Step2() {
  const { messages, changeMessages, changeStep } = useContext(
    CreateLineBroadcastContext
  );

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

  const onAddMessage = () => {
    if (messages.length !== 5) {
      let message = messages[messages.length - 1];
      console.log(message);
      if (message.data !== "") {
        let newMessages = messages;
        newMessages.push({
          type: "text",
          data: "",
        });
        changeMessages(newMessages);
      } else {
        switch (message.type) {
          case "text":
            Alert("Please enter text message");
            break;
          case "image":
            Alert("Please upload image message");
            break;
          case "news":
            Alert("Please select news message");
            break;
          default:
            break;
        }
      }
    }
  };

  const onNextStep = () => {
    if (messages[messages.length - 1].data === "") {
      switch (messages[messages.length - 1].type) {
        case "text":
          Alert("Please enter text message");
          break;
        case "image":
          Alert("Please upload image message");
          break;
        case "news":
          Alert("Please select news message");
          break;
        default:
          break;
      }
    } else {
      changeStep(3);
    }
  };

  return (
    <div className="pb-5 pt-3">
      <span className="font-large">Message</span>
      <div className="container px-5 pb-5 border-bottom">
        {messages.map((message, key) => {
          return (
            <div key={key} className="mt-3">
              <Message boxnumber={key} message={message} />
            </div>
          );
        })}
        <div className="pt-3">
          <button
            className={`col-12 ${messages.length === 5 ? "d-none" : ""}`}
            onClick={() => onAddMessage()}
          >
            + Add message
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <ButtonBack onClick={() => changeStep(1)}>Back</ButtonBack>
        <ButtonNext onClick={() => onNextStep(3)}>Next</ButtonNext>
      </div>
    </div>
  );
}
