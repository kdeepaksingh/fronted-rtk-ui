import { CircularProgress } from "@mui/material";
import { t } from "i18next";
import { cloneDeep } from "lodash";
import { useSnackbar } from "notistack";
import type { SnackbarKey } from "notistack";
import {
  forwardRef,
  type ForwardedRef,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

// Define the LoadingParams type
interface LoadingParams {
  key?: string;
  isLoading: boolean;
  snack?: boolean;
  message: {
    dataKey: string;
    params?: Record<string, string | number | boolean>;
  };
}

// Custom Snackbar
interface CustomSnackbarProps {
  message: ReactNode;
}

const CustomSnackbar = forwardRef<HTMLDivElement, CustomSnackbarProps>(
  ({ message }, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      className="flex items-center justify-start text-xs bg-upag-primary border-sky-700 text-white px-4 py-3 gap-2 rounded shadow-md border w-52 font-semibold"
      ref={ref}
    >
      <div className="mr-2">
        <CircularProgress size={16} color="inherit" />
      </div>
      <div>{message}</div>
    </div>
  )
);

CustomSnackbar.displayName = "CustomSnackbar";

const ApiCallInProgress = () => {
  const [displaying, setDisplaying] = useState<Record<string, boolean>>({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    const current = cloneDeep(displaying);

    Object.entries(loading).forEach(([id, params = {} as LoadingParams]) => {
      const key = params.key || id;

      if (params.snack !== false) {
        if (params.isLoading) {
          if (!current[key]) {
            const message = t(
              params.message.dataKey,
              params.message.params || {}
            );
            enqueueSnackbar(message, {
              key,
              variant: "default",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              autoHideDuration: null,
              preventDuplicate: true,
              content: (key: SnackbarKey, message: ReactNode) => (
                <CustomSnackbar message={message} key={String(key)} />
              ),
            });

            setDisplaying((prev) => ({ ...prev, [key]: true }));
            current[key] = true;
          }
        } else {
          closeSnackbar(key);
          setDisplaying((prev) => ({ ...prev, [key]: false }));
          current[key] = false;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    return () => {
      Object.keys(displaying).forEach((key) => {
        closeSnackbar(key);
      });

      Object.entries(loading).forEach(([id, params = {} as LoadingParams]) => {
        const key = params.key || id;
        closeSnackbar(key);
      });
    };
  }, [closeSnackbar, displaying, loading]);

  return null;
};

export default ApiCallInProgress;

// import { useDispatch } from "react-redux";
// import { setLoading, clearLoading } from "../store/loadingSlice";

// // Example usage
// dispatch(setLoading({
//   id: "fetchUser",
//   params: {
//     key: "fetchUser",
//     isLoading: true,
//     snack: true,
//     message: {
//       dataKey: "loading.fetchUser",
//     },
//   },
// }));

// dispatch(clearLoading("fetchUser"));
