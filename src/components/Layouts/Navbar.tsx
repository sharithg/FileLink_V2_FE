import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import { googleLogout } from "../../actions/googleAction";
//MUI
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { IRootState, IAuthState } from "../../actions/types";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

interface INavbarProps {
  auth: IAuthState;
  handleDrawerToggle: () => void;
  logout: () => void;
  googleLogout: () => void;
}

const Navbar: React.FC<INavbarProps> = (props) => {
  const classes = useStyles();

  const handleLogout = () => {
    props.logout();
    props.googleLogout();
  };

  const { isAuthenticated, user } = props.auth;
  const auth_links = (
    <div>
      <Typography variant="h6" className="navbar-text-username">
        {user ? `Hello, ${user.username}` : ""}
      </Typography>
    </div>
  );
  const guest_links = (
    <div>
      <Typography variant="h6" noWrap className="navbar-text-register">
        Register
      </Typography>
      <Typography variant="h6" noWrap className="navbar-text-login">
        Login
      </Typography>
    </div>
  );
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isAuthenticated ? auth_links : guest_links}
          <button onClick={handleLogout}>Logout</button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, googleLogout })(Navbar);
