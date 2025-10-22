import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Profile = () => {
  const { user } = use(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  return <div></div>;
};

export default Profile;
