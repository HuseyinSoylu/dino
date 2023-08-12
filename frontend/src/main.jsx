import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import WelcomePage from "../src/pages/WelcomePage.jsx"
import Write from '../src/pages/Write.jsx'
import Read from './pages/Read.jsx';
import NotFound from "./pages/NotFound.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage/>,
  },

   {
    path: "write/",
    element: <Write />,
  },
  {
    path: "read/",
    element: <Read />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />

    {/* <App /> */}
  </React.StrictMode>,
)
