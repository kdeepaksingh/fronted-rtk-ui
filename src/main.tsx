import { createRoot } from "react-dom/client";
import {
  useMemo,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type ComponentType,
} from "react";

import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import RouteProvider from "./routes/RouteProvider.tsx";
import { store, useAppSelector } from "./store/store.ts";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { ToastContainer } from "react-toastify";

import "./components/translations";
import "./index.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

import { getTheme } from "./theme.ts";
import { selectFontSize } from "./features/global/globalSlices.ts";

const AppWrapper = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Redux font size (NOW works because Provider is above)
  const fontSize = useAppSelector(
    selectFontSize as unknown as (
      state: ReturnType<typeof store.getState>,
    ) => number,
  );

  // Apply font size globally
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Initialize theme from localStorage/system
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";

    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const theme = useMemo(() => getTheme(mode, fontSize), [mode, fontSize]);

  const RouteProviderWithMode = RouteProvider as ComponentType<{
    setMode: Dispatch<SetStateAction<"light" | "dark">>;
  }>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SnackbarProvider hideIconVariant preventDuplicate>
        <>
          <RouteProviderWithMode setMode={setMode} />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme={mode === "dark" ? "dark" : "light"}
          />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </LocalizationProvider>
  </Provider>,
);
