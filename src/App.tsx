import { useDispatch } from "react-redux";
import "./App.css";
import AlertMessage from "./components/alert/AlertMessage";
import {
  clearAlert,
  showError,
  showSuccess,
} from "./features/alertSlice/alertSlice";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);

  const handleClickSuccess = () => {
    dispatch(showSuccess("This is a success message!"));
  };

  const handleClickError = () => {
    dispatch(showError("This is an error message!"));
  };
  return (
    <>
      <div>
        <button onClick={handleClickSuccess}>Show Success</button>
        <button onClick={handleClickError}>Show Error</button>

        <AlertMessage
          message={alert.message}
          success={alert.success}
          error={alert.error}
          onClose={() => dispatch(clearAlert())}
          autoCloseIn={3}
          type="snackbar"
          successSnack
          errorSnack
        />
      </div>
    </>
  );
}

export default App;
