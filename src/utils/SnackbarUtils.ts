import type { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

type EnqueueSnackbar = (
  message: SnackbarMessage,
  options?: OptionsObject
) => SnackbarKey;

export class SnackbarUtils {
  private static enqueueSnackbar: EnqueueSnackbar | null = null;

  private static defaultProps: OptionsObject = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 3000,
  };

  static setEnqueueSnackbar(enqueueSnackbar: EnqueueSnackbar) {
    SnackbarUtils.enqueueSnackbar = enqueueSnackbar;
  }

  static notifySuccess(message: SnackbarMessage) {
    if (SnackbarUtils.enqueueSnackbar) {
      SnackbarUtils.enqueueSnackbar(message, {
        variant: "success",
        ...SnackbarUtils.defaultProps,
      });
    }
  }

  static notifyError(message: SnackbarMessage) {
    if (SnackbarUtils.enqueueSnackbar) {
      SnackbarUtils.enqueueSnackbar(message, {
        variant: "error",
        ...SnackbarUtils.defaultProps,
      });
    }
  }
}

export default SnackbarUtils;

// // import { SnackbarProvider, useSnackbar } from "notistack";
// // import SnackbarUtils from "./snackbarService";

// // function App() {
// //   const { enqueueSnackbar } = useSnackbar();

// //   useEffect(() => {
// //     SnackbarUtils.setEnqueueSnackbar(enqueueSnackbar);
// //   }, [enqueueSnackbar]);

// //   return <YourAppRoutes />;
// }
