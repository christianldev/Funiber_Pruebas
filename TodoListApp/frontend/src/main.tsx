import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import { filterReducer } from "./store/filters/reducers.ts";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
