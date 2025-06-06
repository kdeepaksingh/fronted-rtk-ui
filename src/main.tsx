import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouteProvider from "./routes/RouteProvider.tsx";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./components/translations";
import theme from "./theme.ts";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouteProvider />
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
