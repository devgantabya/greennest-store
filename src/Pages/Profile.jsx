import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = use(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      setMessage("Profile updated successfully!");
      user.displayName = name;
      user.photoURL = photo;
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={photo || "https://via.placeholder.com/100"}
          alt="User"
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
        />

        <p className="text-lg font-semibold">
          {user?.displayName || "No name set"}
        </p>
        <p className="text-gray-600 mb-4">{user?.email}</p>

        <div className="w-full space-y-3">
          <input
            type="text"
            placeholder="Update Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Update Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <button
            onClick={handleUpdateProfile}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </div>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
