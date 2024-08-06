import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={AppRouter} />
        <Toaster
          position="top-center"
          containerClassName="text-sm font-primary"
          reverseOrder={false}
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
