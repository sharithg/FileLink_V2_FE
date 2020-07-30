import React, { useRef, MouseEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login } from "../../actions/authAction";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { IRootState } from "../../actions/types";
import { isNullOrUndefined } from "util";
import { Helmet } from "react-helmet";
import { TheTextField } from "../../CustomMUI";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ILoginProps {
  login: (username: string, password: string) => void;
  isAuthenticated: boolean | null;
}

const Login: React.FC<ILoginProps> = (props) => {
  const classes = useStyles();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    if (username.current === null || password.current === null) return;
    event.preventDefault();
    props.login(username.current.value, password.current.value);
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Helmet>
        <title>FileLink &bull; Login</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TheTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            type="username"
            name="username"
            autoComplete="username"
            inputRef={username}
            autoFocus
          />
          <TheTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <p>Forgot password?</p>
            </Grid>
            <Grid item>
              <p>
                Dont have a account? <Link to="/register">Register</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { login } from "../../actions/authAction";
// import { Link, Redirect } from "react-router-dom";
// //CONTEXT

// class Login extends Component {
//   static propTypes = {
//     login: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool,
//   };

//   state = { username: "", password: "" };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.login(this.state.username, this.state.password);
//   };

//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     if (this.props.isAuthenticated) {
//       return <Redirect to="/dashboard" />;
//     }
//     const { username, password } = this.state;
//     return (
//       <Fragment>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="exampleInputEmail1">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               onChange={this.handleChange}
//               placeholder="Enter email"
//               value={username}
//               name="username"
//             />
//             <small id="emailHelp" className="form-text text-muted">
//               We'll never share your email with anyone else.
//             </small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="exampleInputPassword1">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               onChange={this.handleChange}
//               placeholder="Password"
//               value={password}
//               name="password"
//             />
//           </div>
// <p>
//   Dont have a account? <Link to="/register">Register</Link>
// </p>
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { login })(Login);
