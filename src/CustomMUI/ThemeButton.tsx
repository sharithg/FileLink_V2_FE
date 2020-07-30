import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";

const ThemeButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#83D6B7"),
    backgroundColor: "#83D6B7",
    "&:hover": {
      backgroundColor: "#41c090",
    },
    borderRadius: "5px",
  },
}))(Button);

export default ThemeButton;
