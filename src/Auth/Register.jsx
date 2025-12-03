import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password))
      return "Password must have at least 1 uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must have at least 1 lowercase letter";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = inputValue;

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      setLoading(true);
      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      setUser(result.user);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google Sign-in failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors py-10 flex justify-center items-center">
      <title>GreenNest - Register</title>

      <div className="w-full md:w-[360px]">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Please Register!
          </h1>
        </div>

        <div className="card bg-white dark:bg-gray-800 w-full shadow-2xl rounded-lg">
          <div className="card-body">
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                name="name"
                value={inputValue.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <input
                type="email"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <input
                type="text"
                name="photoURL"
                value={inputValue.photoURL}
                onChange={handleChange}
                placeholder="Photo URL"
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputValue.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-3 text-sm text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-green-500 font-medium hover:underline"
              >
                Log In
              </NavLink>
            </div>

            <div className="divider text-gray-400 dark:text-gray-500">OR</div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn w-full bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-2 transition"
            >
              {loading ? "Processing..." : "Sign Up with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
