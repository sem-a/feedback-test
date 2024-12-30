import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: (
      <div>fsd</div>
    ),
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
