import React, { useContext } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components"
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

const CKEditorDynamic = dynamic(
  () => import("../../../../../../common/CKEditor"),
  {
    ssr: false,
  }
);

const StyleCKEditor = styled.div`
  .ck-editor__editable {
    height: ${(props) => props.height};
  }
  .ck.ck-list__item .ck-button.ck-on,
  .ck.ck-list__item .ck-button.ck-on:hover:not(.ck-disabled) {
    background-color: ${(props) => props.theme.color.base};
  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    outline: none;
    border: 1px solid ${(props) => props.theme.color.base};
  }
  .ck.ck-button.ck-on,
  a.ck.ck-button.ck-on,
  .ck.ck-button:not(.ck-disabled):active,
  a.ck.ck-button:not(.ck-disabled):active,
  .ck.ck-button:not(.ck-disabled):hover,
  a.ck.ck-button:not(.ck-disabled):hover,
  .ck.ck-button.ck-on:not(.ck-disabled):active,
  a.ck.ck-button.ck-on:not(.ck-disabled):active,
  .ck.ck-button.ck-on:not(.ck-disabled):hover,
  a.ck.ck-button.ck-on:not(.ck-disabled):hover {
    background: none;
  }
  .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    border-radius: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
  .ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
    border-radius: 20px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

export default function Text({ boxnumber }) {
  const { messages, changeMessages } = useContext(CreateLineBroadcastContext);
  const message = messages[boxnumber];

  const onChangeText = (data) => {
    let newmessages = messages;
    newmessages[boxnumber].data = data;
    changeMessages(newmessages);
  };

  return (
    <div>
      <StyleCKEditor height={"200px"}>
        <CKEditorDynamic
          data={message.data}
          config={{
            placeholder: "Your Message",
            toolbar: [],
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChangeText(data);
          }}
        />
      </StyleCKEditor>
    </div>
  );
}
