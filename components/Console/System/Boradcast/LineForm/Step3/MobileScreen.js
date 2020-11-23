import React from "react";
import styled from "styled-components";
import { TextMessage, ImageMessage, NewsMessage } from "./Message";

const Screen = styled.div`
  height: 667px;
`;
const Bar = styled.div`
  height: 50px;
  background-color: #353a40;
  color: white;
`;
const ChatRoom = styled.div`
  height: 617px;
  background-color: #666f86;
  color: white;
  overflow: auto;
`;
const Profile = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
`;
export default React.memo(function MobileScreen({
  messages,
  systemname,
  systemid,
}) {
  return (
    <div>
      <Screen>
        <Bar className="text-center pt-3">{systemname}</Bar>
        <ChatRoom className="pl-2 py-2">
          <Profile
            className="rounded-circle d-inline-block align-top"
            src={`${process.env.REACT_APP_STORAGE}/systems/${systemid}.png`}
          />
          <span className="pl-2 d-sm-none">{systemname}</span>
          <div className="d-inline-block pl-5 pl-sm-2">
            <span className="d-none d-sm-block">{systemname}</span>
            {messages.map((message, key) => {
              switch (message.type) {
                case "text":
                  return (
                    <div className="pt-2">
                      <TextMessage text={message.data} />
                    </div>
                  );
                case "image":
                  return (
                    <div className="pt-2">
                      <ImageMessage image={message.data} />
                    </div>
                  );
                case "news":
                  return (
                    <div className="pt-2">
                      <NewsMessage systemid={systemid} news={message.data} />
                    </div>
                  );
                default:
                  break;
              }
            })}
          </div>
        </ChatRoom>
      </Screen>
    </div>
  );
});
