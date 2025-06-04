import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouteProvider from "./routes/RouteProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouteProvider />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
