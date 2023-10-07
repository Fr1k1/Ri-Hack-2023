import React from "react";
import "./Input.scss";

const Input = ({ placeholder, label }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="label-main">{label}</label>}
      <input type="text" placeholder={placeholder} className="input-main" />
    </div>
  );
};

export default Input;
