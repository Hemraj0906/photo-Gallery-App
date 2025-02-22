// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )



import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      
      
      <App />
    </BrowserRouter>
    <ToastContainer /> 
  </React.StrictMode>
);
