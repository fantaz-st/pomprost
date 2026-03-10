import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import components from "./components";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components,
  shape: {
    borderRadius: 14,
  },
});

export default theme;
