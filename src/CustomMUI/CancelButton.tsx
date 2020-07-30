import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

const CancelButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#EC6262"),
    backgroundColor: "#EC6262",
    "&:hover": {
      backgroundColor: red[700],
    },
    borderRadius: "5px",
  },
}))(Button);

export default CancelButton;
