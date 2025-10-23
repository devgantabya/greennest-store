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
    <div className="bg-base-200 py-10 md:min-h-screen">
      <title>GreenNest - Register</title>
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Please Register!
          </h1>
        </div>

        <div className="card bg-base-100 w-full md:w-[300px] shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset space-y-3">
                <input
                  type="text"
                  name="name"
                  value={inputValue.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={inputValue.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  name="photoURL"
                  value={inputValue.photoURL}
                  onChange={handleChange}
                  className="input"
                  placeholder="Photo URL"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputValue.password}
                    onChange={handleChange}
                    className="input w-full pr-12"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 text-sm"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <button
                  className="btn btn-neutral bg-green-600 hover:bg-green-700 text-lg font-semibold border-0 w-full"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </button>
              </fieldset>
            </form>

            <div className="text-center mt-3 text-sm">
              <p>
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-green-500 font-medium hover:underline"
                >
                  Log In
                </NavLink>
              </p>
            </div>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
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
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              {loading ? "Processing..." : "Sign Up with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
