import React, { useEffect, useState } from "react";
import "./ViewActivities.scss";
import { getAllTasks } from "../../../api/api";
import TaskCard from "../../atoms/TaskCard";

const ViewActivities = () => {
  const [activities, setActivities] = useState([]);

  const getData = async () => {
    const allActivities = await getAllTasks();
    const filteredActivities = allActivities.data.tasks.filter(
      (task) => task.is_activity === 1
    );
    setActivities(filteredActivities);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="all-activities-wrapper">
      {activities.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ViewActivities;
