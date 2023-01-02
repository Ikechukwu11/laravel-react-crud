import React from "react";
import ReactDOM from "react-dom/client";
import {ContextProvider} from "./components/contexts/ContextProvider.jsx"
//import App from "./App";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ContextProvider>  
    <RouterProvider router={router} />
  </ContextProvider>
  </React.StrictMode>
)