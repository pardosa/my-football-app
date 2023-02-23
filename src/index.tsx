import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// apex-chart
import "./assets/third-party/apex-chart.css";
import { store } from "./store";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ReduxProvider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
