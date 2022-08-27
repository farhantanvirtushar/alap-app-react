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
import { useDispatch, useStore } from "react-redux";
import { StoreModel } from "../../models/redux/StoreModel";
import { AnyAction } from "@reduxjs/toolkit";
import { setInbox } from "../../redux/Reducer";
import { InboxItem } from "../../models/message/InboxItem";

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

const getSenderInfo = async (id: string) => {
  const user: User = await getRequest<User>(
    getContactInfoUrl.replace("{id}", id)
  );
  return user;
};

const compare = (a: InboxItem, b: InboxItem) => {
  if (a.last_message_time > b.last_message_time) {
    return -1;
  }
  if (a.last_message_time < b.last_message_time) {
    return 1;
  }
  return 0;
};
export default function Messages(props: { socket: Socket }) {
  const { id } = useParams();
  const { socket } = props;
  const [contact, setcontact] = useState<User>();
  const [messageList, setmessageList] = useState<Message[]>([]);
  const store = useStore<StoreModel, AnyAction>();
  const dispatch = useDispatch();

  const sendMessage = async (message: Message) => {
    var updatedMessageList: Message[] = messageList.map((message) => message);
    updatedMessageList.unshift(message);
    setmessageList(updatedMessageList);

    postRequest<Message[]>(sendMessageUrl, message);
  };

  const updateInbox = async (newMessage: Message) => {
    let oldInboxItems: InboxItem[] = store
      .getState()
      .inboxItems.map((inboxItem) => {
        return { ...inboxItem };
      });
    var inboxUpdated = false;
    var newInboxItems = oldInboxItems.map((inboxItem) => {
      if (newMessage.sender_id == inboxItem.contact_id) {
        inboxItem.last_message_time = newMessage.created_at!;
        inboxUpdated = true;
      }

      return inboxItem;
    });
    if (!inboxUpdated) {
      const sender = await getSenderInfo(newMessage.sender_id!.toString());
      var newInboxItem: InboxItem = {
        last_message_time: newMessage.created_at!,
        contact_id: newMessage.sender_id!,
        first_name: sender.first_name,
        last_name: sender.last_name,
        profile_photo: sender.profile_photo!,
      };
      newInboxItems.push(newInboxItem);
    }

    newInboxItems.sort(compare);
    dispatch(setInbox(newInboxItems));
  };

  useEffect(() => {
    getContactInfo(id!, setcontact);
    getMessageList(id!, setmessageList);
  }, [id]);

  useEffect(() => {
    socket.on("new-message", (newMessage: Message) => {
      // console.log("sender id = " + newMessage.sender_id);
      // console.log("contact id = " + id);
      if (newMessage.sender_id == id) {
        var updatedMessageList: Message[] = messageList.map(
          (message) => message
        );
        updatedMessageList.unshift(newMessage);
        setmessageList(updatedMessageList);
      }
      updateInbox(newMessage);
      // console.log(newMessage);
    });
    return () => {
      socket.off("new-message");
    };
  }, [messageList, id]);
  return (
    <div>
      <MessageHeader contact={contact} />
      <MessageList messageList={messageList} setMessageList={setmessageList} />
      <MessageSender sendMessage={sendMessage} receiver_id={parseInt(id!)} />
    </div>
  );
}
