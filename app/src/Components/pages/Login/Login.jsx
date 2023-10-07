import React from "react";
import "./Login.scss";
import Runner from "../../../assets/jogging.png";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page-wrapper">
      <img src={Runner} alt="" />
      <h2>Welcome to MoveMent</h2>

      <div className="login-form-wrapper">
        <form action="" id="login-form">
          <Input placeholder={"Username"} label={"Username"} />
          <Input placeholder={"Password"} label={"Password"} />
          <div className="forgot-password-wrapper">
            <h4>Forgot password?</h4>
          </div>
          <Button>Login</Button>
        </form>

        <div className="no-account-wrapper">
          No account?{" "}
          <span>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
