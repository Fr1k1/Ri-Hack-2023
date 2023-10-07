import React, { useState } from "react";
import "./AddNewTask.scss";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { addTask } from "../../../api/api";

const AddNewTask = () => {
  const [task, setTaskData] = useState({
    name: "",
    reward: "",
    statusId: 1,
    groupSize: "",
    description: "",
    startDate: "",
    endDate: "",
    difficultyId: "",
    isActivity: 0,
    lat: 20,
    lng: 50,
  });
  const addNewTask = async () => {
    console.log(task);
    const res = await addTask(task);
    console.log(res);
  };
  const handleInputChange = (name, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(value);
  };
  const handleNameChange = (e) => {
    handleInputChange("name", e.target.value);
  };
  const handleRewardChange = (e) => {
    handleInputChange("reward", e.target.value);
  };
  const handleGroupSizeChange = (e) => {
    handleInputChange("groupSize", e.target.value);
  };
  const handleDescriptionChange = (e) => {
    handleInputChange("description", e.target.value);
  };
  const handleStartDateChange = (e) => {
    handleInputChange("startDate", e.target.value);
  };
  const handleEndDateChange = (e) => {
    handleInputChange("endDate", e.target.value);
  };
  const handleIsActivityChange = (e) => {
    if (e.target.value == "Activity") {
      handleInputChange("isActivity", 1);
    } else {
      handleInputChange("isActivity", 0);
    }
  };
  const handleDifficultyChange = (e) => {
    if (e.target.value == "Easy") {
      handleInputChange("difficultyId", 1);
    } else if (e.target.value == "Medium") {
      handleInputChange("difficultyId", 2);
    } else {
      handleInputChange("difficultyId", 3);
    }
  };
  return (
    <div className="add-task-wrapper">
      <Input
        placeholder={"Wood chopping"}
        label={"Name:"}
        name="name"
        value={task?.name}
        onChange={handleNameChange}
      />
      <div className="input-wrapper">
        <label className="label-main" name="difficultyId">
          Task type:
        </label>
      </div>
      <div className="activity-type-container">
        <div className="activity-type-item">
          <input
            type="radio"
            id="chore"
            name="activity_type"
            value="Chore"
            onChange={handleIsActivityChange}
          />
          <label htmlFor="chore">Chore</label>
        </div>
        <div className="activity-type-item">
          <input
            type="radio"
            id="activity"
            name="activity_type"
            value="Activity"
            onChange={handleIsActivityChange}
          />
          <label htmlFor="activity">Activity</label>
        </div>
      </div>
      {!task.isActivity && (
        <Input
          placeholder={"100"}
          label={"Reward (€):"}
          name="name"
          value={task?.reward}
          onChange={handleRewardChange}
        />
      )}
      <p>Mapa di izabereš točku</p>
      <Input
        placeholder={"Describe your task"}
        label={"Description:"}
        name="description"
        type="textarea"
        value={task?.description}
        onChange={handleDescriptionChange}
      />
      <Input
        placeholder={"5"}
        label={"Number of people needed:"}
        name="groupSize"
        value={task?.groupSize}
        onChange={handleGroupSizeChange}
      />
      <Input
        label={"Start date:"}
        name="startDate"
        value={task?.startDate}
        onChange={handleStartDateChange}
        type="date"
      />
      <Input
        label={"End date:"}
        name="endDate"
        value={task?.endDate}
        onChange={handleEndDateChange}
        type="date"
      />
      <div className="input-wrapper">
        <label className="label-main" name="difficultyId">
          Difficulty:
        </label>
        <select
          name="difficultyId"
          id="difficultyId"
          className="input-main"
          onClick={handleDifficultyChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="button-container">
        <Button type="submit" onClick={addNewTask}>
          Add new task
        </Button>
      </div>
    </div>
  );
};

export default AddNewTask;
