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
import { AnyAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import { Socket } from "socket.io-client";
import { getRequest } from "../../../axios-client/AxiosClient";
import { formatTime, stringAvatar } from "../../../common/Utils";
import { InboxItem } from "../../../models/message/InboxItem";
import { StoreModel } from "../../../models/redux/StoreModel";
import { setInbox } from "../../../redux/Reducer";

import "./inbox.css";

const getInboxItemUrl = "/api/message/inbox";

export default function Inbox(props: { socket: Socket }) {
  const { socket } = props;
  const [inboxItemList, setinboxItemList] = useState<InboxItem[]>([]);
  const store = useStore<StoreModel, AnyAction>();
  const dispatch = useDispatch();

  const getInboxItmes = async (setinboxItemList: Function) => {
    var inboxItems: InboxItem[] = await getRequest<InboxItem[]>(
      getInboxItemUrl
    );
    // setinboxItemList(inboxItems);
    dispatch(setInbox(inboxItems));
    console.log(inboxItems);
  };

  useEffect(() => {
    getInboxItmes(setinboxItemList);
    store.subscribe(() => {
      console.log(" inbox changed : ", store.getState().inboxItems);
      setinboxItemList(store.getState().inboxItems);
    });
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
