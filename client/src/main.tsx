import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import "./index.scss";
import { router } from "./pages/router.tsx";
import ContextProvider from "./provider/provider.tsx";
import { store } from "./redux/reduxStore.ts";
import "rsuite/dist/rsuite-no-reset.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} fallbackElement={<Preloader />} />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);
