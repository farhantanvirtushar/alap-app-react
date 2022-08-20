import { Avatar } from "@mui/material";
import React from "react";
import { MessageHeaderProps } from "../../../models/message/MessageHeaderProps";

import { stringAvatar } from "../../../common/Utils";

import "./message-header.css";
export default function MessageHeader(props: MessageHeaderProps) {
  const contact = props.contact;
  return (
    <div className="topbar">
      {contact ? (
        <div className="contact-info">
          <Avatar
            className="avatar"
            {...stringAvatar(contact.first_name + " " + contact.last_name)}
          />
          <div className="contact-name">
            {contact.first_name + " " + contact.last_name}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="topbar-group"></div>
    </div>
  );
}
