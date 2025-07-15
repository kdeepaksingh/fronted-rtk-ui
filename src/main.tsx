import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import RouteProvider from "./routes/RouteProvider.tsx";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify"; // 👈 Import ToastContainer
import "./components/translations";
import theme from "./theme.ts";
import "./index.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css"; // 👈 Toastify styles
import ErrorBoundary from "./ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider hideIconVariant preventDuplicate>
          <>
            <RouteProvider />

            {/* ✅ Global ToastContainer - Only one in app! */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </ErrorBoundary>
);
