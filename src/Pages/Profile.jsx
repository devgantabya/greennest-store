import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  const handleUpdate = async () => {
    if (!user) return;
    setUpdating(true);

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      try {
        await refreshUser();
      } catch (err) {
        console.warn("Warning: refreshUser failed", err);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 md:shadow-md rounded-md pt-8 md:mb-8 md:mt-10 text-center transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Profile
      </h1>

      <div className="mb-6">
        <img
          src={photoURL || "https://via.placeholder.com/150?text=No+Image"}
          alt="Profile Preview"
          className="w-32 h-32 object-cover rounded-full mx-auto border border-gray-300 dark:border-gray-600"
        />
      </div>

      <div className="mb-4 text-left">
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
        />
      </div>

      <div className="mb-4 text-left">
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Photo URL:
        </label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Enter image URL"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
        />
      </div>

      <div className="mb-6 text-left">
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Email:
        </label>
        <p className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleUpdate}
        disabled={updating}
        className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition ${
          updating ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Profile;
