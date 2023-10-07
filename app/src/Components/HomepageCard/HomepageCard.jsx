import React from "react";
import "./HomepageCard.scss";
import { Link } from "react-router-dom";

const HomepageCard = ({ icon, text, path }) => {
  return (
    <Link to={path}>
      <div className="homepage-card-wrapper">
        <img src={icon} alt="" />
        <h4>{text}</h4>
      </div>
    </Link>
  );
};

export default HomepageCard;
