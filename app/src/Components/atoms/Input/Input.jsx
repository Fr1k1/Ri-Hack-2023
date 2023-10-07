import React, { useEffect, useState } from "react";
import "./Input.scss";

const Input = ({
  placeholder,
  label,
  type = "text",
  onChange,
  isDisabledDefault,
  defaultValue,
}) => {
  const [isDisabled, setIsDisabled] = useState(isDisabledDefault);
  useEffect(() => {
    console.log(isDisabledDefault + " isDisabledDefault");
    setIsDisabled(isDisabledDefault);
  }, [isDisabledDefault]);
  return (
    <div className="input-wrapper">
      {label && <label className="label-main">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`input-main ${isDisabled ? "disabled" : ""}`}
        onChange={onChange}
        disabled={isDisabled}
        value={defaultValue}
      />
    </div>
  );
};

export default Input;
