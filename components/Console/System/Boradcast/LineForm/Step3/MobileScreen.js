import React from "react";
import styled from "styled-components";
import { TextMessage, ImageMessage, NewsMessage } from "./Message";

const Screen = styled.div`
  width: 375px;
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
const Profile = styled.div`
  height: 40px;
  width: 40px;
  background-color: black;
`;
export default React.memo(function MobileScreen({ messages, systemname }) {
  return (
    <div>
      <Screen>
        <Bar className="text-center pt-3">{systemname}</Bar>
        <ChatRoom className="pl-2 pt-2">
          <Profile className="rounded-circle d-inline-block align-top" />
          <div className="d-inline-block pl-2">
            <span>{systemname}</span>
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
                      <NewsMessage news={message.data} />
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
