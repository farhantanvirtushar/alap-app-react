/* eslint-disable */
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import "./message-sender.css";
import { MessageSenderProps } from "../../../models/message/MessageSenderProps";
import { Message } from "../../../models/message/Message";
import { text } from "stream/consumers";

export default function MessageSender(props: MessageSenderProps) {
  const { sendMessage, receiver_id } = props;
  const [messageText, setmessageText] = useState("");

  const sendMessageToServer = () => {
    var newMessage: Message = {
      receiver_id: receiver_id,
      text: messageText,
    };
    sendMessage(newMessage);
  };
  return (
    <div className="bottom-bar">
      <input
        type="text"
        id="message-input"
        placeholder="Aa"
        value={messageText}
        onChange={(event) => {
          setmessageText(event.target.value);
          console.log(event.target.value);
        }}
      />
      <IconButton
        color="primary"
        size="large"
        onClick={() => {
          sendMessageToServer();
        }}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}
