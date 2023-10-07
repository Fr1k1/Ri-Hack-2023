import React from "react";
import "./Button.scss";
import { SignOut } from "@phosphor-icons/react";

const Button = ({ onClick, children, type = "button", icon }) => {
  return (
    <React.Fragment>
      {icon ? (
        <div className="button-with-icon-wrapper">
          <button onClick={onClick} type={type} className="button-with-icon">
            <SignOut size={32} /> {children}
          </button>
        </div>
      ) : (
        <button onClick={onClick} type={type} className="button-without-icon">
          {children}
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;
