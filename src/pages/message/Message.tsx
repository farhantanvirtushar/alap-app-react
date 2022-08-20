/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import "./message.css";
import { stringAvatar } from "../../common/Utils";
import { useParams } from "react-router-dom";
import { User } from "../../models/User";
import { getRequest } from "../../axios-client/AxiosClient";
import MessageHeader from "../../components/message/message-header/MessageHeader";

const getContactInfoUrl = "/api/message/user/{id}";

const getContactInfo = async (id: string, setcontact: Function) => {
  var contact: User = await getRequest<User>(
    getContactInfoUrl.replace("{id}", id)
  );
  setcontact(contact);
  console.log(contact);
};

export default function Message() {
  const { id } = useParams();
  console.log("user id : " + id);
  const [contact, setcontact] = useState<User>();
  useEffect(() => {
    getContactInfo(id!, setcontact);
  }, [id]);
  return (
    <div>
      <MessageHeader contact={contact} />
      <div>Message</div>
    </div>
  );
}
