/* eslint-disable */
import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./search-user.css";
import { User } from "../../../../models/User";
import { getRequest } from "../../../../axios-client/AxiosClient";
import { stringAvatar } from "../../../../common/Utils";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

const searchUserByNameUrl = "/api/user/search?name={query}";
export default function SearchUser() {
  const [searchedUser, setsearchedUser] = useState("");
  const [userList, setuserList] = useState<User[]>([]);
  const currentText = useRef("");

  const getUserList = async (searchText: string) => {
    currentText.current = searchText;
    if (searchText != "") {
      var users: User[] = await getRequest<User[]>(
        searchUserByNameUrl.replace("{query}", searchText)
      );
      if (currentText.current == searchText) {
        setuserList(users);
      }
    } else {
      setsearchedUser("");
      setuserList([]);
    }
  };

  const handleSlect = () => {
    setsearchedUser("");
    setuserList([]);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        id="search-input"
        placeholder="Search People"
        value={searchedUser}
        onChange={(event) => {
          setsearchedUser(event.target.value);
          getUserList(event.target.value);
        }}
      />
      <SearchIcon className="search-icon" />
      {userList.length > 0 ? (
        <div className="search-result">
          {userList.map((user) => (
            <NavLink
              to={"/messages/" + user.user_id}
              className="search-result-link"
              key={user.user_id}
              onClick={() => {
                handleSlect();
              }}
            >
              <div className="user-info">
                <Avatar
                  className="avatar"
                  {...stringAvatar(user.first_name + " " + user.last_name)}
                />
                <div className="user-name">
                  {user.first_name + " " + user.last_name}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
