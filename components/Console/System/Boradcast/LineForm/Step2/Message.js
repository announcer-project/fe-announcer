import React, { useState, useContext } from "react";
import { Menu } from "antd";
import { CreateLineBroadcastContext } from "../../../../../../store/CreateLineBroadcastProvider";

import "./Menu.module.css";

import Text from "./Message/Text";
import Image from "./Message/Image";
import News from "./Message/News";

const SocialBar = (props) => {
  return (
    <div id="Message">
      <Menu
        onClick={props.handleClick}
        selectedKeys={[props.type]}
        mode="horizontal"
      >
        <Menu.Item
          style={{ width: "33.33%" }}
          className="text-center"
          key="text"
        >
          <span className="font-small">Text</span>
        </Menu.Item>
        <Menu.Item
          style={{ width: "33.33%" }}
          className="text-center"
          key="image"
        >
          <span className="font-small">Image</span>
        </Menu.Item>
        <Menu.Item
          style={{ width: "33.34%" }}
          className="text-center"
          key="news"
        >
          <span className="font-small">News</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default function Message({ boxnumber }) {
  const { messages, changeMessages } = useContext(CreateLineBroadcastContext);
  const message = messages[boxnumber];

  const handleClick = (e) => {
    let newmessages = messages;
    newmessages[boxnumber].type = e.key;
    newmessages[boxnumber].data = "";
    changeMessages(newmessages);
  };

  const handleForm = () => {
    switch (message.type) {
      case "text":
        return <Text boxnumber={boxnumber} />;
      case "image":
        return <Image boxnumber={boxnumber} />;
      case "news":
        return <News boxnumber={boxnumber} />;
    }
  };

  return (
    <div className="border">
      <SocialBar handleClick={handleClick} type={message.type} />
      <div>{handleForm()}</div>
    </div>
  );
}
