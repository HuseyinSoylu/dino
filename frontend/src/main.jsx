import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReadArticle from "./pages/ReadArticle.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WelcomePage from "../src/pages/WelcomePage.jsx";
import WriteArticle from "../src/pages/WriteArticle.jsx";
import Read from "./pages/WriteArticle.jsx";
import NotFound from "./pages/NotFound.jsx";
import Congratulations from "./pages/Congratulations.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },

  {
    path: "write/",
    element: <WriteArticle />,
  },
  {
    path: "read/",
    element: <ReadArticle />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "read2/",
    element: <ReadArticle />,
  },
  {
    path: "cong/",
    element: <Congratulations />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    {/* <App /> */}
  </React.StrictMode>
);
