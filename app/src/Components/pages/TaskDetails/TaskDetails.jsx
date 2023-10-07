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

const TaskDetails = () => {
  let { id } = useParams();
  const [task, setTask] = useState({
    id: id,
    name: "",
    location: "",
    description: "",
    reward: "",
    difficultyId: 0,
    creatorId: 0,
    groupSize: "",
    startDate: "",
    endDate: "",
  });
  const [taskCreator, setTaskCreator] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const acceptJob = () => {
    console.log("accept job");
  };

  useEffect(() => {
    console.log(id);
    // TODO fetch task data by id
    setTask({
      id: id,
      name: "Test name",
      location: "Test location",
      description: "Test description",
      reward: "20",
      difficultyId: 5,
      creatorId: 1,
      groupSize: 8,
      startDate: "Tuesday",
      endDate: "Tuesday",
    });
    // TODO fetch creator data from task.creatorId
    setTaskCreator({
      firstName: "Ime",
      lastName: "Prezime",
      email: "proba@gmail.com",
    });
  }, []);

  return (
    <div className="task-details-wrapper">
      <h3>Wood chopping</h3>
      <div className="task-details-info">
        <div className="task-details-info-item">
          <MapPin size={24} className="icon" />
          <p>Location: Mirka Marka St 50, Zagreb</p>
        </div>
        <div className="task-details-info-item">
          <Money size={24} className="icon" />
          <p>Reward: 50 €</p>
        </div>
        <div className="task-details-info-item">
          <Info size={24} className="icon" />
          <p>
            Description: berba grožđa, kreće se u 5 ujutro i traje dok ne
            završimo
          </p>
        </div>
        <div className="task-details-info-item">
          <Calendar size={24} className="icon" />
          <p>Start date: tuesday</p>
        </div>
        <div className="task-details-info-item">
          <CalendarX size={24} className="icon" />
          <p>End date: tuesday</p>
        </div>
        <div className="task-details-info-item">
          <UsersThree size={24} className="icon" />
          <p>Group size: 8 people</p>
        </div>
        <div className="task-details-info-item">
          <Steps size={24} className="icon" />
          <p>Difficulty: hard</p>
        </div>
        <Button onClick={acceptJob}>Accept job</Button>
        <TaskOfferUserCard user={taskCreator} />
      </div>
    </div>
  );
};

export default TaskDetails;
