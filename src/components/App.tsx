// React imports
import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// React components
import { Content } from "./Layouts";
import Home from "./Home/Home";
import {
  Login,
  Register,
  PasswordResetEmail,
  ChangePassword,
} from "./Accounts";
import PrivateRoute from "../common/PrivateRoute";
// Redux imports
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/authAction";
import Error from "./Layouts/404";
import ErrorSnack from "../common/ErrorSnack";
import MessageSnack from "../common/MessageSnack";

console.log(store);

class App extends Component {
  componentDidMount() {
    store.dispatch<any>(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <ErrorSnack />
            <MessageSnack />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/dashboard" component={Content} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/reset_password"
                  component={PasswordResetEmail}
                />
                <Route
                  exact
                  path="/change_password/:uidb64/:token"
                  component={ChangePassword}
                />
                <Route exact path="/404" component={Error} />
                <Redirect from="*" to="/404" />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
