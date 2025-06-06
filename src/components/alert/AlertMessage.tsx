import { Alert, Slide, Snackbar, Zoom, type AlertColor } from "@mui/material";
import { useEffect, useState, type JSX } from "react";
import DOMPurify from "dompurify";
import useComponentDidMount from "../hooks/useComponentDidMount";
import useTimer from "../hooks/useTimer";
import Condition from "../commons/Condition";

interface AlertMessageProps {
  message?: string | JSX.Element;
  success?: boolean;
  error?: boolean;
  onClose?: () => void;
  autoCloseIn?: number;
  type?: "alert" | "snackbar";
  snackbar?: boolean;
  look?: string;
  lookUpType?: string;
  successSnack?: boolean;
  errorSnack?: boolean;
  onlyErrors?: boolean;
  onlySuccess?: boolean;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message = "",
  success = false,
  error = false,
  onClose,
  autoCloseIn = 5,
  type = "alert",
  snackbar = false,
  look = "",
  lookUpType,
  successSnack = false,
  errorSnack = false,
  onlyErrors = false,
  onlySuccess = false,
}) => {
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [text, setText] = useState<string | JSX.Element>("");

  const isSnack =
    type === "snackbar" ||
    snackbar ||
    (success && successSnack) ||
    (error && errorSnack);

  useComponentDidMount({
    onDestroy: () => {
      if (snackbar && onClose) {
        onClose?.();
      }
    },
  });

  useEffect(() => {
    if (error && !onlySuccess) {
      setSeverity("error");
      setText(message);
    }

    if (success && !onlyErrors) {
      setSeverity("success");
      setText(message);
    }
  }, [error, success, message, onlyErrors, onlySuccess]);

  useTimer({
    tick: autoCloseIn,
    start: autoCloseIn && (success || error) ? true : false,
    onDone: autoCloseIn && onClose ? onClose : undefined,
  });

  if (look && look !== lookUpType) {
    return null;
  }

  const props: { onClose?: () => void } = {};

  if (onClose) {
    props["onClose"] = onClose;
  }

  const show = Boolean(
    text && ((success && !onlyErrors) || (error && !onlySuccess))
  );

  const alert = (
    <Alert severity={severity} className="visible" {...props}>
      {typeof text === "object" ? (
        text
      ) : (
        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      )}
    </Alert>
  );

  if (isSnack) {
    return (
      <Snackbar
        open={show}
        message={typeof text === "string" ? text : undefined}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={autoCloseIn * 1000}
        onClose={props.onClose}
        sx={{ maxWidth: 400 }}
        TransitionComponent={Slide}
      >
        {alert}
      </Snackbar>
    );
  }

  return (
    <Condition show={show}>
      <Zoom in={true}>
        <div className="mb-4">{alert}</div>
      </Zoom>
    </Condition>
  );
};

export default AlertMessage;

// import { useDispatch } from "react-redux";
// import "./App.css";
// import AlertMessage from "./components/alert/AlertMessage";
// import {
//   clearAlert,
//   showError,
//   showSuccess,
// } from "./features/alertSlice/alertSlice";
// import { useSelector } from "react-redux";
// import type { RootState } from "./store/store";

// function App() {
//   const dispatch = useDispatch();
//   const alert = useSelector((state: RootState) => state.alert);

//   const handleClickSuccess = () => {
//     dispatch(showSuccess("This is a success message!"));
//   };

//   const handleClickError = () => {
//     dispatch(showError("This is an error message!"));
//   };
//   return (
//     <>
//       <div>
//         <button onClick={handleClickSuccess}>Show Success</button>
//         <button onClick={handleClickError}>Show Error</button>

//         <AlertMessage
//           message={alert.message}
//           success={alert.success}
//           error={alert.error}
//           onClose={() => dispatch(clearAlert())}
//           autoCloseIn={3}
//           type="snackbar"
//           successSnack
//           errorSnack
//         />
//       </div>
//     </>
//   );
// }

// export default App;
