/* eslint-disable */
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmailIcon from "@mui/icons-material/Email";
import {
  Autocomplete,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { NavItem } from "../../../models/NavItem";

import "./app-layout.css";
import Inbox from "../inbox/Inbox";
import { Socket } from "socket.io-client";
import { User } from "../../../models/User";
import SearchUser from "./search-usaer/SearchUser";
export default function AppLayout(props: { socket: Socket }) {
  const { socket } = props;
  const [open, setopen] = useState(window.innerWidth > 600);
  const [mobileScreen, setmobileScreen] = useState(window.innerWidth < 600);
  const [matchedUsers, setmatchedUsers] = useState<User[]>();

  const sideNavItems: NavItem[] = [
    {
      name: "Home",
      url: "home",
      icon: <HomeIcon />,
    },
    {
      name: "Meeting",
      url: "meeting",
      icon: <VideocamIcon />,
    },
  ];

  const toggleDrawer = () => {
    setopen(!open);
  };
  const closeDrawer = () => {
    if (mobileScreen) {
      setopen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setmobileScreen(true);
    } else {
      setmobileScreen(false);
    }
  };

  window.addEventListener("resize", handleResize);

  return (
    <div>
      <Drawer
        variant={window.innerWidth > 600 ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClick={closeDrawer}
        className="app-drawer"
      >
        <div className="title">Alap</div>
        <SearchUser />
        <List className="side-bar">
          {sideNavItems.map((navItem: NavItem, index) => (
            <ListItem key={navItem.name} disablePadding className="nav-item">
              <NavLink to={navItem.url} className="nav-link">
                <ListItemButton>
                  <ListItemIcon className="nav-icon">
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={navItem.name} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Inbox socket={socket} />
      </Drawer>
      <div className={!mobileScreen ? "main-content-shrink" : "main-content"}>
        <Outlet />
      </div>
    </div>
  );
}
