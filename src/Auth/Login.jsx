import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        form.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message);
        setMessage(error.message);
      });
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("⚠️ Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`✅ Password reset link sent to ${email}`);
      window.open("https://mail.google.com", "_blank");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => navigate(location?.state || "/"))
      .catch((error) => setMessage(error.message));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors py-10 flex justify-center items-center">
      <title>GreenNest - Login</title>

      <div className="w-full md:w-[360px]">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back!
          </h1>
        </div>

        <div className="card bg-white dark:bg-gray-800 w-full shadow-2xl rounded-lg">
          <div className="card-body">
            <form onSubmit={handleLogIn} className="space-y-4">
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-12"
                  placeholder="Password"
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

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-green-500 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Sign In
              </button>
            </form>

            {message && (
              <p className="text-center text-sm mt-3 text-green-500">
                {message}
              </p>
            )}

            <div className="text-center mt-3 text-sm text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-green-500 font-medium hover:underline"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="divider text-gray-400 dark:text-gray-500">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-2 transition"
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
