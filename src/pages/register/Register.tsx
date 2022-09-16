/* eslint-disable */
import { Button, CircularProgress, TextField } from "@mui/material";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../../axios-client/AxiosClient";
import { NewUserReq } from "../../models/auth/NewUserReq";
import { AuthRes } from "../../models/auth/AuthRes";
import { ErrorRes } from "../../models/ErrorRes";

import "./register.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewUserReq>();

  const register_url = "/api/auth/register";

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<NewUserReq> = async (data: NewUserReq) => {
    try {
      const authRes: AuthRes = await postRequest<AuthRes>(register_url, data);

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
    <div>
      <div className="body">
        <div className="register-container">
          <div className="title">Sign Up</div>
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="register-form-item">
                <TextField
                  fullWidth
                  label="first name"
                  variant="outlined"
                  {...register("first_name", {
                    required: "first name is required",
                  })}
                />
              </div>

              <div className="register-form-item">
                <TextField
                  fullWidth
                  label="last name"
                  variant="outlined"
                  {...register("last_name", {
                    required: "first name is required",
                  })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="register-form-item">
                <TextField
                  fullWidth
                  label="email"
                  variant="outlined"
                  {...register("email", { required: "email is required" })}
                />
              </div>
            </div>

            <div className="error">{errors.email && errors.email.message}</div>

            <div className="form-row">
              <div className="register-form-item">
                <TextField
                  fullWidth
                  type="password"
                  label="password"
                  variant="outlined"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </div>
            </div>

            <div className="error">
              {errors.password && errors.password.message}
            </div>

            <div className="form-row">
              <div className="register-form-item">
                <TextField
                  fullWidth
                  type="password"
                  label="retype password"
                  variant="outlined"
                  {...register("rePassword", {
                    required: "must be same as password",
                  })}
                />
              </div>
            </div>
            <div className="error">
              {errors.password && errors.password.message}
            </div>

            {isSubmitting ? (
              <CircularProgress />
            ) : (
              <Button fullWidth variant="contained" color="error" type="submit">
                Sign Up
              </Button>
            )}
            <div className="text-row">Already Have An Account?</div>
            <Button fullWidth variant="contained" component={Link} to="/login">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
