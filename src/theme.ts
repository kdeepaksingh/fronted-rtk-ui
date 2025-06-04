import { createTheme } from "@mui/material";
import colors from "./color";

const font = "'Open Sans'";

const theme = createTheme({
  typography: {
    fontFamily: font,
    fontSize: 18,
    body1: { lineHeight: 1, color: colors["ui-black"] },
  },
});

export default theme;
