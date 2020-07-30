import React, { useRef, MouseEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TheTextField } from "../../CustomMUI";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { IRootState } from "../../actions/types";
import { resetPassword } from "../../actions/authAction";
import { Loader } from "../../common";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface IPasswordResetEmailProps {
  password_email_sent: boolean;
  resetPassword: (email: string) => void;
  isResetLoading: boolean;
}

const PasswordResetEmail: React.FC<IPasswordResetEmailProps> = (props) => {
  const classes = useStyles();
  const email = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.current === null) return;
    props.resetPassword(email.current.value);
  };

  if (props.password_email_sent)
    return <h1>Password rest instructions sent</h1>;
  if (props.isResetLoading) return <Loader />;

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>FileLink &bull; Reset Password</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Enter your email and we will send instructions on resetting your
          password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TheTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={email}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset password
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  password_email_sent: state.auth.password_email_sent,
  isResetLoading: state.auth.isResetLoading,
});

export default connect(mapStateToProps, { resetPassword })(PasswordResetEmail);
