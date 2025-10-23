import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { storage } from "../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [preview, setPreview] = useState(user?.photoURL || null);
  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File too large. Please upload an image under 5MB.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      toast.info("Image selected. Don’t forget to click Update Profile!");
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setUpdating(true);

    try {
      let finalPhotoURL = user.photoURL;

      if (file) {
        const storageRef = ref(
          storage,
          `profilePhotos/${user.uid}/profile.jpg`
        );
        await uploadBytes(storageRef, file);
        finalPhotoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL: finalPhotoURL,
      });

      toast.success("✅ Profile updated successfully!");
    } catch (error) {
      toast.error("❌ Error updating profile: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white md:shadow-md rounded-md pt-8 mb-8 md:mt-10 text-center">
      <title>GreenNest - Profile</title>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="relative inline-block mb-3">
        <img
          src={preview || "https://i.ibb.co.com/fGMNLM9Z/Sample-User-Icon.png"}
          alt="Profile"
          className="w-40 h-40 object-cover rounded-lg mx-auto border"
        />

        <label className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600">
          <FaUpload />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="mb-4 text-left">
        <label className="block font-semibold mb-1">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-6 text-left">
        <label className="block font-semibold mb-1">Email:</label>
        <p className="w-full border p-2 rounded bg-gray-100 text-gray-700 text-sm">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleUpdate}
        disabled={updating}
        className={`bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition ${
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
