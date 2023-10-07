import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { X } from "@phosphor-icons/react/dist/ssr";
import "./MobileNavbar.scss";
import Button from "../../atoms/Button";

const NavbarMobile = () => {
  const [openNav, setOpenNav] = useState(false);
  const navHandler = () => {
    console.log("close");
    setOpenNav(!openNav);
  };
  const closeNav = () => {
    console.log("close");

    setOpenNav(false);
  };

  const location = useLocation();

  const isAddJobPage = location.pathname === "/add-task";

  const isHomepage =
    location.pathname === "/homepage" || location.pathname === "/";

  const isProfilePage = location.pathname === "/my-profile";

  const isChoresPage = location.pathname === "/chores";

  const isActivitiesPage = location.pathname === "/activities";

  const isHistoryPage = location.pathname === "/history";

  return (
    <div>
      <div className="icons">
        <List
          onClick={navHandler}
          className={openNav ? "hidden" : "iconBar"}
          size={32}
          color="white"
        />
        <X
          onClick={navHandler}
          className={openNav ? "iconBar " : "hidden"}
          size={32}
          color="white"
        ></X>

        <div className="dynamic-header-text-wrapper">
          <h2>
            {isAddJobPage
              ? "Add new task"
              : isHomepage
              ? "Homepage"
              : isProfilePage
              ? "About me"
              : isChoresPage
              ? "Chores"
              : isActivitiesPage
              ? "Activities"
              : isHistoryPage
              ? "History"
              : "Nest drugo"}
          </h2>
        </div>
      </div>

      <nav className={openNav ? "nav-bar" : "hidden"} onClick={closeNav}>
        <ul>
          <li>
            <Link to="/homepage">Homepage</Link>
          </li>

          <li>
            <Link to="/history">History</Link>
          </li>

          <li>
            {" "}
            <Link to="/my-profile">My profile</Link>
          </li>
        </ul>

        <Button icon={"Hrc"}>Odjavi se</Button>
      </nav>
    </div>
  );
};

export default NavbarMobile;
