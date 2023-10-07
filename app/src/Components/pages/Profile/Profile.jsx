import React, { useEffect, useState } from "react";
import { User, Envelope, Star, Check } from "@phosphor-icons/react";
import user from "../../../assets/user.png";
import Input from "../../atoms/Input";
import "./Profile.scss";
import Button from "../../atoms/Button";
import {
  deleteLoggedUser,
  editLoggedUser,
  getLoggedUser,
} from "../../../api/api";
import FileInput from "../../FileInput/FileInput";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    await deleteLoggedUser();
    console.log("delete");
  };
  const handleSaveChanges = async () => {
    setIsEdit(false);

    try {
      // Assuming you have an update function in your API file
      await editLoggedUser({
        id: loggedUser.id, // Assuming your logged user object has an ID property
        firstName: loggedUser.first_name, // Assuming the correct property names
        lastName: loggedUser.last_name, // Assuming the correct property names
        email: loggedUser.email, // Assuming the correct property names
        // Add other properties you want to update
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
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
          <div className="edit-image-container">
            <label htmlFor="file-upload">
              <img src={user} alt="user-image" />
            </label>
          </div>
          <div className="profile-user-data">
            <FileInput onFileChange={handleFileChange} />
            <div className="profile-user-data-row">
              <User size={32} weight="bold" />
              <Input
                defaultValue={loggedUser?.first_name}
                onChange={(e) =>
                  setLoggedUser({ ...loggedUser, first_name: e.target.value })
                }
              />

              <Input
                defaultValue={loggedUser?.last_name}
                onChange={(e) =>
                  setLoggedUser({ ...loggedUser, last_name: e.target.value })
                }
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
      <Button onClick={handleSaveChanges}>Save changes</Button>
      <Button isRed={true} onClick={handleDelete}>
        Delete my account
      </Button>
    </div>
  );
};

export default Profile;
