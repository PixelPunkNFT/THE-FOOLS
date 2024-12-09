import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./styles/reset.css";
import "./styles/theme.css";
import { MANTEINANCE_MODE } from './config';
import MaintenanceMode from './components/MaintenanceMode';
// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";
// import About from "./components/About";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  MANTEINANCE_MODE ? (
    <MaintenanceMode />
  ) : (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ),
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
