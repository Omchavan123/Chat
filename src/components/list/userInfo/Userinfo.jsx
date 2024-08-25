import { useState } from "react";
import "./userInfo.css";
import { useUserStore } from "../../../lib/userStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import upload from "../../../lib/upload";

const Userinfo = () => {
  const { currentUser, updateCurrentUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(currentUser.username);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [imgFile, setImgFile] = useState(null);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      let avatarUrl = avatar;

      if (imgFile) {
        avatarUrl = await upload(imgFile);
      }

      const userRef = doc(db, "users", currentUser.id);

      await updateDoc(userRef, {
        username,
        avatar: avatarUrl,
      });

      updateCurrentUser({ ...currentUser, username, avatar: avatarUrl });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={avatar || "./avatar.png"} alt="" />
        {isEditing ? (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          <h2>{currentUser.username}</h2>
        )}
      </div>
      <div className="icons">
        {isEditing ? (
          <>
            <label htmlFor="avatar">
              <img src="./edit.png" alt="Change Avatar" />
            </label>
            <input
              type="file"
              id="avatar"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </>
        ) : (
          <>
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="Edit Profile" onClick={handleEditToggle} />
          </>
        )}
      </div>
    </div>
  );
};

export default Userinfo;
