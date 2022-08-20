/* eslint-disable */
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getRequest } from "../../../axios-client/AxiosClient";
import { formatTime, stringAvatar } from "../../../common/Utils";
import { InboxItem } from "../../../models/message/InboxItem";

import "./inbox.css";

const getInboxItemUrl = "/api/message/inbox";

const getInboxItmes = async (setinboxItemList: Function) => {
  var inboxItems: InboxItem[] = await getRequest<InboxItem[]>(getInboxItemUrl);
  setinboxItemList(inboxItems);
  console.log(inboxItems);
};

export default function Inbox() {
  const [inboxItemList, setinboxItemList] = useState<InboxItem[]>([]);

  useEffect(() => {
    getInboxItmes(setinboxItemList);
  }, []);
  return (
    <div>
      <div className="title">Inbox</div>
      <List className="side-bar">
        {inboxItemList.map((inboxItem: InboxItem, index) => (
          <ListItem
            key={inboxItem.contact_id}
            disablePadding
            className="inbox-item"
          >
            <NavLink
              to={"/messages/" + inboxItem.contact_id.toString()}
              className="inbox-link"
            >
              <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    className="avatar"
                    {...stringAvatar(
                      inboxItem.first_name + " " + inboxItem.last_name
                    )}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={inboxItem.first_name + " " + inboxItem.last_name}
                  secondary={
                    <span className="time">
                      {formatTime(inboxItem.last_message_time)}
                    </span>
                  }
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
