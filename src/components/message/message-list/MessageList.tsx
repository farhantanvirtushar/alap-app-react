/* eslint-disable */
import React from "react";
import { Message } from "../../../models/message/Message";
import { MessageListProps } from "../../../models/message/MessageListProps";

import "./message-list.css";
export default function MessageList(props: MessageListProps) {
  const { messageList, setMessageList } = props;
  return (
    <div className="message-list-container">
      {messageList.map((message: Message) => (
        <div className="message-row" key={message.message_id}>
          <div className="message-body message-row-item">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
