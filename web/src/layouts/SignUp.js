import { useWindowWidth } from "@react-hook/window-size";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { userCreate } from "../api";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import useErrorMessage from "../hooks/useErrorMessage";
import theme from "../theme";

const useStyles = createUseStyles({
  root: {
    padding: "10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "center",
    height: "fit-content",
  },
  siblings: ({ width }) => ({
    display: width > 400 ? "flex" : "contents",
  }),
  error: {
    color: theme.errorMessage,
  },
});

const SignUp = (props) => {
  const width = useWindowWidth();
  const navigate = useNavigate();
  const classes = useStyles({ props, width });

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useErrorMessage(3000);

  const validEmail = (testEmail) => {
    const regEx = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regEx.test(testEmail);
  };

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    if (id === "username") return setUsername(value);
    if (id === "displayName") return setDisplayName(value);
    if (id === "password") return setPassword(value);
    if (id === "confirmPassword") return setConfirmPassword(value);
    if (id === "email") return setEmail(value);
  };

  const handleClick = async (e) => {
    if (username.length < 3)
      return setErrorMessage("Username must be 3 characters long.");
    if (displayName.length < 3)
      return setErrorMessage("Display Name must be 3 characters long.");
    if (username.toLowerCase() === displayName.toLowerCase())
      return setErrorMessage("Username and Display Name must different.");
    if (password.length < 8)
      return setErrorMessage("Password must be minimum 8 characters long.");
    if (password !== confirmPassword)
      return setErrorMessage("Confirm password does not match password.");
    if (!validEmail(email)) return setErrorMessage("Email is not valid.");
    try {
      //TODO Create a toast to notify user created successfully
      const resp = await userCreate(username, displayName, password, email);
      if (resp.data.status === "success") return navigate("/login");
      if (resp.data.status === "failure")
        return setErrorMessage(resp.data.data.error_message);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.root}>
      <h2>Sign Up</h2>
      <form className={classes.root}>
        <div className={classes.siblings}>
          <TextInput
            id="username"
            title="username"
            value={username}
            onChange={handleChange}
          />
          <TextInput
            id="displayName"
            title="Display Name"
            value={displayName}
            onChange={handleChange}
          />
        </div>
        <div className={classes.siblings}>
          <TextInput
            id="password"
            title="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <TextInput
            id="confirmPassword"
            title="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className={classes.siblings}>
          <TextInput
            id="email"
            title="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <Button label="Sign Up" onClick={handleClick} />
      </form>
      <p className={classes.error}>{errorMessage}</p>
    </div>
  );
};

export default SignUp;
