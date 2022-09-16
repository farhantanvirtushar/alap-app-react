/* eslint-disable */
import { Button, CircularProgress, TextField } from "@mui/material";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../axios-client/AxiosClient";
import { AuthReq } from "../../models/auth/AuthReq";
import { AuthRes } from "../../models/auth/AuthRes";
import { ErrorRes } from "../../models/ErrorRes";

import "./login.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthReq>();

  const login_url = "/api/auth/login";

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthReq> = async (data: AuthReq) => {
    try {
      const authRes: AuthRes = await postRequest<AuthRes>(login_url, data);

      localStorage.setItem("token", authRes.token);
      localStorage.setItem("user", JSON.stringify(authRes));
      navigate("/");
    } catch (error: any) {
      const axiosError: AxiosError<ErrorRes> = error;

      const errorRes: ErrorRes = axiosError.response?.data!;

      if (errorRes.field === "email") {
        setError("email", {
          type: "server",
          message: errorRes.error_message,
        });
      }
      if (errorRes.field === "password") {
        setError("password", {
          type: "server",
          message: errorRes.error_message,
        });
      }
    }
  };
  return (
    <div className="body">
      <div className="login-container">
        <div className="title">Login</div>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <TextField
              fullWidth
              label="email"
              variant="outlined"
              {...register("email", { required: "email is required" })}
            />
          </div>

          <div className="error">{errors.email && errors.email.message}</div>

          <div className="form-item">
            <TextField
              fullWidth
              type="password"
              label="password"
              variant="outlined"
              {...register("password", { required: "password is required" })}
            />
          </div>

          <div className="error">
            {errors.password && errors.password.message}
          </div>

          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button fullWidth variant="contained" type="submit">
              Sign In
            </Button>
          )}
          <div className="text-row">Don't Have An Account?</div>
          <Button fullWidth variant="contained" color="error">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
