import React, { useState } from "react";
import "./Register.scss";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { addNewUser } from "../../../api/api";

const Register = () => {
  const [newUser, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (name, value) => {
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("Pokusavam dodati");
    //console.log("Postavljeni podaci:", staffData);
    e.preventDefault();

    //const isValid = validateForm();

    // if (isValid) {
    try {
      await addNewUser(newUser);
      console.log("Uspjesno dodan novi user");
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

  const handleUserFirstnameChange = (e) => {
    handleInputChange("firstName", e.target.value);
  };

  const handleUserLastnameChange = (e) => {
    handleInputChange("lastName", e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    handleInputChange("password", e.target.value);
  };

  const handleUserPasswordRepeatChange = (e) => {
    handleInputChange("passwordConfirm", e.target.value);
  };
  return (
    <div className="register-page-wrapper">
      <h2>Register in app</h2>

      <div className="register-form-wrapper">
        <form action="" id="register-form" onSubmit={handleSubmit}>
          <Input
            placeholder={"First name"}
            label={"First name"}
            name="firstName"
            value={newUser?.firstName}
            onChange={handleUserFirstnameChange}
          />
          <Input
            placeholder={"Last name"}
            label={"Last name"}
            name="lastName"
            value={newUser?.lastName}
            onChange={handleUserLastnameChange}
          />
          <Input
            placeholder={"Password"}
            label={"Password"}
            type={"password"}
            name="password"
            value={newUser?.password}
            onChange={handleUserPasswordChange}
          />

          <Input
            placeholder={"Password confirm"}
            label={"Confirm password"}
            type={"password"}
            name="password-repeat"
            value={newUser?.passwordConfirm}
            onChange={handleUserPasswordRepeatChange}
          />
          <Input
            placeholder={"Email"}
            label={"Email"}
            type={"email"}
            name="email"
            value={newUser?.email}
            onChange={handleUserEmailChange}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
