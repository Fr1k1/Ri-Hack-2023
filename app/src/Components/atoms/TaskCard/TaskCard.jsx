import React from "react";
import "./TaskCard.scss";
import money from "../../../assets/money.png";
import noImage from "../../../assets/user.png";
import { Steps } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  return (
    <Link to={`/tasks/${task.id}`}>
      <div className="task-card-wrapper">
        <div className="task-card-header">
          <h4>{task.name}</h4>
          <div className="task-card-header-reward">
            <img src={money} alt="money-icon" />
            <p>50 €</p>
          </div>
        </div>
        <div className="task-card-content">
          <p>Start date: tuesday</p>
          <div className="task-card-content-footer">
            <div className="task-card-content-item">
              <img src={noImage} alt="user-image" />
              <p>Mirko Mirkic</p>
            </div>
            <div className="task-card-content-item">
              <Steps size={32} />
              <p>hard</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
