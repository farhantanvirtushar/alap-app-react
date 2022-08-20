/* eslint-disable */
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmailIcon from "@mui/icons-material/Email";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { NavItem } from "../../../models/NavItem";

import "./app-layout.css";
import Inbox from "../inbox/Inbox";
export default function AppLayout() {
  const [open, setopen] = useState(window.innerWidth > 600);
  const [mobileScreen, setmobileScreen] = useState(window.innerWidth < 600);

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
      >
        <div className="title">Alap</div>
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
        <Inbox />
      </Drawer>
      <div
        className={
          open && !mobileScreen ? "main-content-shrink" : "main-content"
        }
      >
        <IconButton
          aria-label="menu"
          className="menu-button"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Outlet />
      </div>
    </div>
  );
}
