import React, { Fragment, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { DashRoute, GAuthRoute, GoogleRoute } from "../../common";
import { Helmet } from "react-helmet";

import Sidebar from "./Sidebar";
//MUI
import {
  CssBaseline,
  Drawer,
  Hidden,
  Theme,
  useTheme,
  makeStyles,
} from "@material-ui/core";
//Layouts
import { isAuthGoogle } from "../../actions/googleAction";
import { getClasses } from "../../actions/classAction";
import { Auth } from "../GoogleAuth";
import DashView from "./DashView";
import ClassView from "./ClassView";
import { Redirect } from "react-router-dom";
import { IClasses, IRootState } from "../../actions/types";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface IContentProps extends RouteComponentProps<{ dashId: string }> {
  classes: Array<IClasses>;
  window: Window;
}

const Content: React.FC<IContentProps> = (props) => {
  const classes_s = useSelector((state: IRootState) => state.classes.classes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthGoogle());
    dispatch(getClasses());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <Fragment>
      <Helmet>
        <title>FileLink &bull; Dashboard</title>
      </Helmet>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar handleDrawerToggle={handleDrawerToggle} />

        <nav className={classes.drawer} aria-label="college classes">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              elevation={2}
            >
              <Sidebar classes={classes_s} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Sidebar classes={classes_s} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content} style={{ textAlign: "center" }}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => <Redirect to="/dashboard/schedule" />}
            />
            <DashRoute exact path="/dashboard/:dashId" component={DashView} />
            <GoogleRoute
              exact
              path="/dashboard/class/:classId"
              component={ClassView}
            />
            <GAuthRoute
              exact
              path="/dashboard/gauth/googleauth"
              component={Auth}
            />
            <Redirect from="*" to="/404" />
          </Switch>
        </main>
      </div>
    </Fragment>
  );
};

export default Content;
