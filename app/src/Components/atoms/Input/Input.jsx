import React, { useEffect, useState } from "react";
import "./Input.scss";

const Input = ({
  placeholder,
  label,
  type = "text",
  defaultValue,
  isDisabledDefault,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDisabled, setIsDisabled] = useState(isDisabledDefault);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

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
        value={value}
        disabled={isDisabled}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
