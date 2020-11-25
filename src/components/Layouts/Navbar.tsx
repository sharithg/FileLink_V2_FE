import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
import { googleLogout } from "../../actions/googleAction";
//MUI
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import { IRootState } from "../../actions/types";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  username: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

interface INavbarProps {
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<INavbarProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(googleLogout());
  };

  const { user } = useSelector((state: IRootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.username}>
            {user ? user.username : ""}
          </Typography>
          <Button onClick={() => handleLogout()} className={classes.button}>
            Logout
          </Button>
          <IconButton onClick={handleClick} color="inherit">
            <SettingsIcon />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
