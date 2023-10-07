import React, { useEffect, useState } from "react";
import {
  User,
  Envelope,
  Star,
  Check,
  PencilSimple,
  X,
} from "@phosphor-icons/react";
import user from "../../../assets/user.png";
import Input from "../../atoms/Input";
import "./Profile.scss";
import Button from "../../atoms/Button";
import { getLoggedUser } from "../../../api/api";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ratingsAverage: "",
    ratingsQuantity: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await getLoggedUser();
        setLoggedUser(userProfileData);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    console.log("edit");
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    console.log("delete");
  };
  const handleSaveChanges = () => {
    setIsEdit(false);
    console.log("save");
  };
  const cancelChanges = () => {
    // TODO return data to default
    setLoggedUser({
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      email: loggedUser.email,
      ratingsAverage: loggedUser.ratingsAverage,
      ratingsQuantity: loggedUser.ratingsQuantity,
      //image: defaultUserData.image,
    });
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="edit-container" onClick={handleEdit}>
          {isEdit ? (
            <X size={48} onClick={cancelChanges} />
          ) : (
            <PencilSimple size={48} />
          )}
        </div>
        <div className="edit-image-container">
          <img src={user} alt="user-image" />{" "}
          {isEdit && <PencilSimple size={32} />}
        </div>
        <div className="profile-user-data">
          <div className="profile-user-data-row">
            <User size={32} weight="bold" />
            <Input
              defaultValue={loggedUser.firstName}
              isDisabledDefault={!isEdit}
            />
            <Input
              defaultValue={loggedUser.lastName}
              isDisabledDefault={!isEdit}
              setIsEdit={setIsEdit}
            />
          </div>
          <div className="profile-user-data-row">
            <Envelope size={32} />
            <p>{loggedUser.email}</p>
          </div>
          <div className="profile-user-data-row">
            <Star size={32} weight="fill" />
            <p>{loggedUser.ratingsAverage}/5</p>
          </div>
          <div className="profile-user-data-row">
            <Check size={32} />
            <p>{loggedUser.ratingsQuantity} reviews</p>
          </div>
        </div>
      </div>
      {isEdit && <Button onClick={handleSaveChanges}>Save changes</Button>}
      <Button isRed={true} onClick={handleDelete}>
        Delete my account
      </Button>
    </div>
  );
};

export default Profile;
