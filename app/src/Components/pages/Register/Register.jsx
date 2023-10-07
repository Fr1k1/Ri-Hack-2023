import React from "react";
import "./Register.scss";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const Register = () => {
  return (
    <div className="register-page-wrapper">
      <h2>Register in app</h2>

      <div className="register-form-wrapper">
        <form action="" id="register-form">
          <Input placeholder={"First name"} label={"First name"} />
          <Input placeholder={"Last name"} label={"Last name"} />
          <Input
            placeholder={"Password"}
            label={"Password"}
            type={"password"}
          />
          <Input placeholder={"Email"} label={"Email"} type={"email"} />

          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
