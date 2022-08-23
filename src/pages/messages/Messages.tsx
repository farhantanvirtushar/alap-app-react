/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import "./messages.css";
import { stringAvatar } from "../../common/Utils";
import { useParams } from "react-router-dom";
import { User } from "../../models/User";
import { getRequest, postRequest } from "../../axios-client/AxiosClient";
import MessageHeader from "../../components/message/message-header/MessageHeader";
import MessageSender from "../../components/message/message-sender/MessageSender";
import MessageList from "../../components/message/message-list/MessageList";
import { Message } from "../../models/message/Message";
import { Socket } from "socket.io-client";

const getContactInfoUrl = "/api/message/user/{id}";
const getMessageListUrl = "/api/message/message-list/{id}";
const sendMessageUrl = "/api/message/send";

const getContactInfo = async (id: string, setcontact: Function) => {
  var contact: User = await getRequest<User>(
    getContactInfoUrl.replace("{id}", id)
  );
  setcontact(contact);
  // console.log(contact);
};
const getMessageList = async (id: string, setmessageList: Function) => {
  var messageList: Message[] = await getRequest<Message[]>(
    getMessageListUrl.replace("{id}", id)
  );
  setmessageList(messageList);
  // console.log(messageList);
};

export default function Messages(props: { socket: Socket }) {
  const { id } = useParams();
  const { socket } = props;
  const [contact, setcontact] = useState<User>();
  const [messageList, setmessageList] = useState<Message[]>([]);

  const sendMessage = async (message: Message) => {
    var updatedMessageList: Message[] = messageList.map((message) => message);
    updatedMessageList.unshift(message);
    setmessageList(updatedMessageList);

    postRequest<Message[]>(sendMessageUrl, message);
  };

  useEffect(() => {
    getContactInfo(id!, setcontact);
    getMessageList(id!, setmessageList);
  }, [id]);

  useEffect(() => {
    socket.on("new-message", (newMessage: Message) => {
      console.log("sender id = " + newMessage.sender_id);
      console.log("contact id = " + id);
      if (newMessage.sender_id == id) {
        var updatedMessageList: Message[] = messageList.map(
          (message) => message
        );
        updatedMessageList.unshift(newMessage);
        setmessageList(updatedMessageList);
      }
      // console.log(newMessage);
    });
  }, [messageList, id]);
  return (
    <div>
      <MessageHeader contact={contact} />
      <MessageList messageList={messageList} setMessageList={setmessageList} />
      <MessageSender sendMessage={sendMessage} receiver_id={parseInt(id!)} />
    </div>
  );
}
