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
  console.log(messageList);
};

export default function Messages() {
  const { id } = useParams();

  const [contact, setcontact] = useState<User>();
  const [messageList, setmessageList] = useState<Message[]>([]);

  const sendMessage = async (message: Message) => {
    var messageList: Message[] = await postRequest<Message[]>(
      sendMessageUrl,
      message
    );
    setmessageList(messageList);
    console.log(messageList);
  };

  useEffect(() => {
    getContactInfo(id!, setcontact);
    getMessageList(id!, setmessageList);
  }, [id]);
  return (
    <div>
      <MessageHeader contact={contact} />
      <MessageList messageList={messageList} setMessageList={setmessageList} />
      <MessageSender sendMessage={sendMessage} receiver_id={parseInt(id!)} />
    </div>
  );
}
