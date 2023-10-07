import React, { useState } from "react";
import "./Login.scss";
import Runner from "../../../assets/jogging.png";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { Link } from "react-router-dom";
import { loginUser } from "../../../api/api";

const Login = () => {
  const [user, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(value);
  };

  const handleSubmit = async (e) => {
    //console.log("Postavljeni podaci:", staffData);
    e.preventDefault();

    //const isValid = validateForm();

    // if (isValid) {
    try {
      const response = await loginUser(user);
      localStorage.setItem("token", response.token);
      console.log("Uspjesno prijavljen");
      //notifySuccess("Uspješno dodano osoblje");
      //console.log("Tenant submitted successfully");
    } catch (error) {
      //console.log("Error submitting tenant:", error);
      //notifyFailure();
    }
    //}
  };

  const handleUserEmailChange = (e) => {
    handleInputChange("email", e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    handleInputChange("password", e.target.value);
  };
  return (
    <div className="login-page-wrapper">
      <img src={Runner} alt="" />
      <h2>Welcome to MoveMent</h2>

      <div className="login-form-wrapper">
        <form action="" id="login-form" onSubmit={handleSubmit}>
          <Input
            placeholder={"Email"}
            label={"Email"}
            name="email"
            value={user?.email}
            onChange={handleUserEmailChange}
          />
          <Input
            placeholder={"Password"}
            label={"Password"}
            name="password"
            value={user?.password}
            onChange={handleUserPasswordChange}
          />
          <div className="forgot-password-wrapper">
            <h4>Forgot password?</h4>
          </div>
          <Button type="submit">Login</Button>
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
