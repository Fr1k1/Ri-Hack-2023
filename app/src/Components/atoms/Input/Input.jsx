import React from "react";
import "./Input.scss";

const Input = ({ placeholder, label, type = "text", onChange }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="label-main">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="input-main"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
