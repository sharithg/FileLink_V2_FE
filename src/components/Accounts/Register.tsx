import React, { useRef, MouseEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { createMessage } from "../../actions/messagesAction";
import { Redirect } from "react-router-dom";
import { CredentialTypes, IRootState } from "../../actions/types";
import { Helmet } from "react-helmet";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
}));

interface IRegisterProps {
  isAuthenticated: boolean | null;
  createMessage: (message: { passwordNotMatch: string }) => void;
  registerUser: (user: CredentialTypes) => void;
}

const Register: React.FC<IRegisterProps> = (props) => {
  const classes = useStyles();
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      password.current === null ||
      username.current === null ||
      confirmPassword.current === null ||
      email.current === null
    )
      return;
    console.log(event);
    if (password.current.value !== confirmPassword.current.value) {
      props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      props.registerUser(newUser);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Helmet>
        <title>FileLink &bull; Register</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser, createMessage })(
  Register
);

// import React, { Component, Fragment } from "react";
// import { Link, Redirect } from "react-router-dom";
// import Nav from "./Nav";
// import { registerUser } from "../../actions/authAction";
// import { createMessage } from "../../actions/messagesAction";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

// //GENERAL
// import { TextField, Grid } from "@material-ui/core";
// import { isWidthDown } from "@material-ui/core/withWidth";
// //CONTEXT

// class Register extends Component {
// 	static propTypes = {
// 		registerUser: PropTypes.func.isRequired,
// 		isAuthenticated: PropTypes.bool,
// 	};
// 	state = { username: "", email: "", password: "", confirmPassword: "" };

// 	handleSubmit = (event) => {
// 		event.preventDefault();
// 		const { username, email, password, confirmPassword } = this.state;
// 		if (password !== confirmPassword) {
// 			this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
// 		} else {
// 			const newUser = {
// 				username,
// 				password,
// 				email,
// 			};
// 			this.props.registerUser(newUser);
// 		}
// 	};

// 	handleChange = (event) => {
// 		this.setState({ [event.target.name]: event.target.value });
// 	};

// 	render() {
// 		if (this.props.isAuthenticated) {
// 			return <Redirect to="/dashboard" />;
// 		}
// 		const { username, email, password, confirmPassword } = this.state;
// 		return (
// 			<Fragment>
// 				<form onSubmit={this.handleSubmit}>
// 					<div className="form-group">
// 						<label htmlFor="exampleInputEmail1">Username</label>
// 						<input
// 							type="text"
// 							className="form-control"
// 							id="usernameInput"
// 							placeholder="Enter username"
// 							name="username"
// 							onChange={this.handleChange}
// 							value={username}
// 						/>
// 						<label htmlFor="exampleInputEmail1">Email address</label>
// 						<input
// 							type="email"
// 							className="form-control"
// 							id="exampleInputEmail1"
// 							aria-describedby="emailHelp"
// 							name="email"
// 							placeholder="Enter email"
// 							onChange={this.handleChange}
// 							value={email}
// 						/>
// 						<small id="emailHelp" className="form-text text-muted">
// 							We'll never share your email with anyone else.
// 						</small>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="exampleInputPassword1">Password</label>
// 						<input
// 							type="password"
// 							className="form-control"
// 							id="exampleInputPassword1"
// 							placeholder="Password"
// 							name="password"
// 							onChange={this.handleChange}
// 							value={password}
// 						/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="exampleInputPassword2">Confirm Password</label>
// 						<input
// 							type="password"
// 							className="form-control"
// 							id="exampleInputPasswordConfirm"
// 							placeholder="Password"
// 							name="confirmPassword"
// 							onChange={this.handleChange}
// 							value={confirmPassword}
// 						/>
// 					</div>
// 					<p>
// 						Already have a account? <Link to="/login">Login</Link>
// 					</p>
// 					<button type="submit" className="btn btn-primary">
// 						Submit
// 					</button>
// 				</form>
// 			</Fragment>
// 		);
// 	}
// }

// const mapStateToProps = (state) => ({
// 	isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { registerUser, createMessage })(
// 	Register
// );
