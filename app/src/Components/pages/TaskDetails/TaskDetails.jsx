import React from "react";
import "./TaskDetails.scss";
import {
  MapPin,
  Money,
  Info,
  Calendar,
  CalendarX,
  UsersThree,
  Steps,
} from "@phosphor-icons/react";
import Button from "../../atoms/Button";
import TaskOfferUserCard from "../../atoms/TaskOfferUserCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../../../api/api";

const TaskDetails = () => {
  let { id } = useParams();
  const [task, setTask] = useState({});
  const [taskCreator, setTaskCreator] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const acceptJob = () => {
    console.log("accept job");
  };

  const getTaskData = async (id) => {
    console.log(id);
    const currentTask = await getTaskById(id);
    console.log(currentTask.data.task[0]);
    setTask(currentTask.data.task[0]);
    console.log(task);
  };

  useEffect(() => {
    console.log(id);
    getTaskData(id);

    setTaskCreator({
      firstName: "Ime",
      lastName: "Prezime",
      email: "proba@gmail.com",
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div className="task-details-wrapper">
      <h3>
        {task.name} {id}
      </h3>
      {Object.keys(task).length > 0 ? (
        <div className="task-details-info">
          <div className="task-details-info-item">
            <Money size={24} className="icon" />
            <p>Reward: {task.reward} €</p>
          </div>
          <div className="task-details-info-item">
            <Info size={24} className="icon" />
            <p>Description: {task.description}</p>
          </div>
          <div className="task-details-info-item">
            <Calendar size={24} className="icon" />
            <p>Start date: {formatDate(task.start_date)}</p>
          </div>
          <div className="task-details-info-item">
            <CalendarX size={24} className="icon" />
            <p>End date: {formatDate(task.end_date)}</p>
          </div>
          <div className="task-details-info-item">
            <UsersThree size={24} className="icon" />
            <p>Group size: 8 people</p>
          </div>
          <div className="task-details-info-item">
            <Steps size={24} className="icon" />
            <p>Difficulty: {task.difficulty_id}</p>
          </div>
          <Button onClick={acceptJob}>Accept job</Button>
          <TaskOfferUserCard user={taskCreator} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskDetails;
