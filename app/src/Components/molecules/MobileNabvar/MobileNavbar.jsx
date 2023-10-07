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

  const isAddJobPage = location.pathname === "/add-job";

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
          <h2>{isAddJobPage ? "Dodaj posao" : "Nest drugo"}</h2>
        </div>
      </div>

      <nav className={openNav ? "nav-bar" : "hidden"} onClick={closeNav}>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
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
