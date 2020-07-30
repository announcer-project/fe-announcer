import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

import "./CKEditor.module.css";

const CKEditor = dynamic(
  () => import("../../../../News/CreateNews/Form/CKEditor"),
  {
    ssr: false,
  }
);

export default function Text({ boxnumber }) {
  const { messages, changeMessages } = useContext(CreateLineBroadcastContext);
  const message = messages[boxnumber];

  const onChangeText = (data) => {
    let newmessages = messages;
    newmessages[boxnumber].data = data;
    changeMessages(newmessages);
  };

  return (
    <div id="broadcast">
      <CKEditor
        data={message.data}
        placeholder="sadasdas"
        config={{
          placeholder: "Your Message",
          toolbar: [],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChangeText(data);
        }}
      />
    </div>
  );
}
