/* eslint-disable */
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "../../../models/NavItem";

import "./inbox.css";
export default function Inbox() {
  useEffect(() => {
    // Update the document title using the browser API
  }, []);
  return (
    <div>
      <div className="title">Inbox</div>
      <List className="side-bar">
        {/* {sideNavItems.map((navItem: NavItem, index) => (
          <ListItem key={navItem.name} disablePadding className="nav-item">
            <NavLink to={navItem.url} className="nav-link">
              <ListItemButton>
                <ListItemIcon className="nav-icon">{navItem.icon}</ListItemIcon>
                <ListItemText primary={navItem.name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))} */}
      </List>
    </div>
  );
}
