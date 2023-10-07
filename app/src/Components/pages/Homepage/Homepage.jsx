import React from "react";
import "./Homepage.scss";
import HomepageCard from "../../HomepageCard/HomepageCard";
import AddJobImage from "../../../assets/add_task.png";
import ChoresImage from "../../../assets/deforestation.png";
import ActivitiesImage from "../../../assets/hiking.png";

const Homepage = () => {
  return (
    <div className="homepage-wrapper">
      <HomepageCard icon={AddJobImage} text={"Add new job"} path={"/add-job"} />
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
