import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Plants from "../Pages/Plants";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PlantDetails from "../Pages/PlantDetails.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
        element: (
          <PrivateRoute>
            <PlantDetails></PlantDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
