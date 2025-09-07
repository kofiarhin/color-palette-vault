import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.styles.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { fetchMe } from "./store/authSlice";

// Prime auth state on app load
store.dispatch(fetchMe());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
