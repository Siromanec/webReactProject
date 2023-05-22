import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ClickCounter from "./javascript/ClickCounter";
import reportWebVitals from "./javascript/reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./javascript/Home";
import Profile from "./javascript/Profile";
import About from "./javascript/About";

import App from "./javascript/App";


import Login from "./javascript/Login";
import Register from "./javascript/Register";

import { AuthProvider, RequireAuth } from "react-auth-kit";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function setSavedUserName(username) {
  sessionStorage.setItem("username", (username));
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        index: true,
        element: <Home />
      },
      {
        path: "/profile",
        index: true,
        element: <Profile />,
      },
      {
        path: "/about",
        index: true,
        element: <About />,
      },
      {
        path: "/login",
        index: true,
        element: <Login setToken={setToken} setSavedUserName={setSavedUserName}/>,
      },
      {
        path: "/signup",
        index: true,
        element: <Register setToken={setToken} setSavedUserName={setSavedUserName}/>,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
