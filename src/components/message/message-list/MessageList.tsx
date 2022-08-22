/* eslint-disable */
import React from "react";
import { getUserId } from "../../../common/Utils";
import { Message } from "../../../models/message/Message";
import { MessageListProps } from "../../../models/message/MessageListProps";

import "./message-list.css";
export default function MessageList(props: MessageListProps) {
  const { messageList, setMessageList } = props;
  const userId: number = getUserId();
  return (
    <div className="message-list-container">
      {React.Children.toArray(
        messageList.map((message: Message) => (
          <div
            className={
              (message.sender_id == userId
                ? "message-sent"
                : "message-received") + " message-row"
            }
          >
            <div className="message-body message-row-item">{message.text}</div>
          </div>
        ))
      )}
    </div>
  );
}
