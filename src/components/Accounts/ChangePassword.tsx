import React, { MouseEvent, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TheTextField } from "../../CustomMUI";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { IRootState } from "../../actions/types";
import { setNewPassword } from "../../actions/authAction";
import { Loader } from "../../common";

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

interface Props extends RouteComponentProps<{ uidb64: string; token: string }> {
  setNewPassword: (body: {
    password: string;
    uidb64: string;
    token: string;
  }) => void;
  new_password_set: boolean;
  isResetLoading: boolean;
}

const ChangePassword: React.FC<Props> = (props) => {
  console.log(props.match.params.token, props.match.params.uidb64);
  const classes = useStyles();
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.current === null) return;
    props.setNewPassword({
      password: password.current.value,
      uidb64: props.match.params.uidb64,
      token: props.match.params.token,
    });
  };
  if (props.new_password_set) return <h1>Password successfully changed</h1>;
  if (props.isResetLoading) return <Loader />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Helmet>
        <title>FileLink &bull; Change Password</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Enter new password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TheTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Enter new password"
            name="password"
            autoComplete="password"
            inputRef={password}
            autoFocus
          />
          <TheTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Confirm new password"
            name="password"
            autoComplete="password"
            inputRef={confirmPassword}
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
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  new_password_set: state.auth.new_password_set,
  isResetLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { setNewPassword })(ChangePassword);
