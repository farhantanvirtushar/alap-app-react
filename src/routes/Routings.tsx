/* eslint-disable */
import { Home } from "@mui/icons-material";
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Socket } from "socket.io-client";
import isAuthenticated from "../auth-guard/AuthGuard";
import AppLayout from "../components/layouts/app-layout/AppLayout";
import Login from "../pages/login/Login";
import Messages from "../pages/messages/Messages";
import Register from "../pages/register/Register";

export default function Routings(props: { socket: Socket }) {
  const { socket } = props;
  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated() ? (
        <AppLayout socket={socket} />
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/messages/:id",
          element: <Messages socket={socket} />,
        },
      ],
    },
    {
      path: "/",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    // {
    //   path: "/admin/",
    //   element: isAuthenticated() ? (
    //     <AdminLayout />
    //   ) : (
    //     <Navigate to="/admin/login" />
    //   ),
    //   children: [
    //     {
    //       path: "",
    //       element: <Dashboard />,
    //     },
    //     {
    //       path: "dashboard",
    //       element: <Dashboard />,
    //     }
    //   ],
    // },
    // {
    //   path: "/admin/",
    //   children: [
    //     {
    //       path: "login",
    //       element: <AdminLogin />,
    //     },
    //   ],
    // },
  ]);
  return routes;
}
