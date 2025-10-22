import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "./../contexts/AuthContext/AuthContext";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password } = inputValue;

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate("/"); // redirect after signup
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((user) => navigate("/")) // redirect after signup/login
      .catch((err) => console.error(err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Please Register!</h1>
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
                  type="password"
                  name="password"
                  value={inputValue.password}
                  onChange={handleChange}
                  className="input"
                  placeholder="Password"
                  required
                />
                <button className="btn btn-neutral w-full mt-4">Sign Up</button>
              </fieldset>
            </form>

            <div className="text-center mt-3 text-sm">
              <p>
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-teal-500 font-medium hover:underline"
                >
                  Log In
                </NavLink>
              </p>
            </div>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white text-black border-[#e5e5e5] hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              {/* Google Icon */}
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
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
