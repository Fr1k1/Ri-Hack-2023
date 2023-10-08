import React from "react";
import "./Homepage.scss";
import HomepageCard from "../../atoms/HomepageCard";
import AddJobImage from "../../../assets/add_task.png";
import ChoresImage from "../../../assets/deforestation.png";
import ActivitiesImage from "../../../assets/hiking.png";

const Homepage = () => {
  return (
    <div className="homepage-wrapper">
      <HomepageCard
        icon={AddJobImage}
        text={"Add new task"}
        path={"/add-task"}
      />
      <HomepageCard icon={ChoresImage} text={"Chores"} path={"/chores"} />
      <HomepageCard
        icon={ActivitiesImage}
        text={"Activities"}
        path={"/activities"}
      />
    </div>
  );
};

export default Homepage;
