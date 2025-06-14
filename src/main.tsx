import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import RouteProvider from "./routes/RouteProvider.tsx";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./components/translations";
import theme from "./theme.ts";
import "./index.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import ErrorBoundary from "./ErrorBoundary.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider hideIconVariant preventDuplicate>
          <RouteProvider />
          <App />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </ErrorBoundary>
);
