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
  const [loggedUser, setLoggedUser] = useState(null);
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
    setLoggedUser({
      firstName: loggedUser.first_name,
      lastName: loggedUser.last_name,
      email: loggedUser.email,
      ratingsAverage: loggedUser.ratings_average,
      ratingsQuantity: loggedUser.ratings_quantity,
      //image: defaultUserData.image,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await getLoggedUser();
        setLoggedUser(userProfileData.data.user);
      } catch (error) {
        console.error("Error fetching logged user:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile-wrapper">
      {loggedUser ? (
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
                defaultValue={loggedUser?.first_name}
                isDisabledDefault={!isEdit}
              />
              <Input
                defaultValue={loggedUser?.last_name}
                isDisabledDefault={!isEdit}
                setIsEdit={setIsEdit}
              />
            </div>
            <div className="profile-user-data-row">
              <Envelope size={32} />
              <p>{loggedUser?.email}</p>
            </div>
            <div className="profile-user-data-row">
              <Star size={32} weight="fill" />
              <p>{loggedUser?.ratings_average}/5</p>
            </div>
            <div className="profile-user-data-row">
              <Check size={32} />
              <p>{loggedUser?.ratings_quantity} reviews</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {isEdit && <Button onClick={handleSaveChanges}>Save changes</Button>}
      <Button isRed={true} onClick={handleDelete}>
        Delete my account
      </Button>
    </div>
  );
};

export default Profile;
