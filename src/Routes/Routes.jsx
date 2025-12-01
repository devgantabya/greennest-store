import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Plants from "../Pages/Plants";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PlantDetails from "../Pages/PlantDetails.jsx";
import Profile from "../Pages/Profile.jsx";
import NotFoundPage from "../Pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "plants",
        Component: Plants,
      },
      {
        path: "plants/:id",
        Component: PlantDetails,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
