import React, { use } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4">Welcome back!</h1>
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
                />
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />

                <div className="text-right -mt-2">
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-teal-500 hover:underline"
                  >
                    Forgot password?
                  </NavLink>
                </div>

                <button className="btn btn-neutral w-full">Sign In</button>
              </fieldset>
            </form>

            <div className="text-center mt-3 text-sm">
              <p>
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-teal-500 font-medium hover:underline"
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
