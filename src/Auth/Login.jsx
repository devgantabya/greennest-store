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
    <div className="bg-base-200 py-10 md:min-h-screen">
      <title>GreenNest - Login</title>
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back!</h1>
        </div>

        <div className="card bg-base-100 w-full md:w-[320px] shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogIn}>
              <fieldset className="fieldset space-y-3">
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input w-full pr-12"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 text-sm"
                  >
                    {showPassword ? (
                      <span>
                        <FaEyeSlash />
                      </span>
                    ) : (
                      <span>
                        <FaRegEye />
                      </span>
                    )}
                  </button>
                </div>

                <div className="text-right -mt-2">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-green-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button className="btn btn-neutral bg-green-600 hover:bg-green-700 text-lg font-semibold border-0 w-full">
                  Sign In
                </button>
              </fieldset>
            </form>

            {message && (
              <p className="text-center text-sm mt-3 text-green-600">
                {message}
              </p>
            )}

            <div className="text-center mt-3 text-sm">
              <p>
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-green-500 font-medium hover:underline"
                >
                  Sign Up
                </NavLink>
              </p>
            </div>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white text-black border-[#e5e5e5] hover:bg-gray-100 flex items-center justify-center gap-2"
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
