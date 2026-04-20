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
import { store } from "./store/store.ts";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { ToastContainer } from "react-toastify";

import "./components/translations";
import "./index.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

import { getTheme } from "./theme.ts"; // 🔥 IMPORTANT

// ✅ Wrapper to handle theme
const AppWrapper = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

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

  // 🔥 dynamic theme
  const theme = useMemo(() => getTheme(mode), [mode]);
  const RouteProviderWithMode = RouteProvider as ComponentType<{
    setMode: Dispatch<SetStateAction<"light" | "dark">>;
  }>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <SnackbarProvider hideIconVariant preventDuplicate>
          <>
            {/* 🔥 PASS setMode */}
            <RouteProviderWithMode setMode={setMode} />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme={mode === "dark" ? "dark" : "light"} // 🔥 sync
            />
          </>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ErrorBoundary>
      <AppWrapper />
    </ErrorBoundary>
  </LocalizationProvider>,
);

// import { createRoot } from "react-dom/client";
// import { SnackbarProvider } from "notistack";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import RouteProvider from "./routes/RouteProvider.tsx";
// import { ThemeProvider } from "@mui/material";
// import { Provider } from "react-redux";
// import { store } from "./store/store.ts";
// import { ToastContainer } from "react-toastify"; // 👈 Import ToastContainer
// import "./components/translations";
// import theme from "./theme.ts";
// import "./index.css";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css"; // 👈 Toastify styles
// import ErrorBoundary from "./ErrorBoundary.tsx";

// createRoot(document.getElementById("root")!).render(
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <ErrorBoundary>
//       <ThemeProvider theme={theme}>
//         <Provider store={store}>
//           <SnackbarProvider hideIconVariant preventDuplicate>
//             <>
//               <RouteProvider />

//               {/* ✅ Global ToastContainer - Only one in app! */}
//               <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 newestOnTop
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 theme="colored"
//               />
//             </>
//           </SnackbarProvider>
//         </Provider>
//       </ThemeProvider>
//     </ErrorBoundary>
//   </LocalizationProvider>
// );
