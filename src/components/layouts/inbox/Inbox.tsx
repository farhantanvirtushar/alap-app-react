/* eslint-disable */
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getRequest } from "../../../axios-client/AxiosClient";
import { InboxItem } from "../../../models/message/InboxItem";

import "./inbox.css";
export default function Inbox() {
  const getInboxItemUrl = "/api/message/inbox";
  const [inboxItemList, setinboxItemList] = useState<InboxItem[]>([]);

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    const avaterValue: string = name.split(" ")[0][0] + name.split(" ")[1][0];
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: avaterValue,
    };
  }

  const getInboxItmes = async () => {
    var inboxItems: InboxItem[] = await getRequest<InboxItem[]>(
      getInboxItemUrl
    );
    setinboxItemList(inboxItems);
    console.log(inboxItems);
  };
  const formatTime = (time_string: string): string => {
    const date: Date = new Date(time_string);

    return date.toLocaleString();
  };
  useEffect(() => {
    getInboxItmes();
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
                    <div className="time">
                      {formatTime(inboxItem.last_message_time)}
                    </div>
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
