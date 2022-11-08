import { useState } from "react";
import { createUseStyles } from "react-jss";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api";

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
});

const Login = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const {
      target: { value, id },
    } = e;
    if (id === "username") return setUsername(value);
    if (id === "password") return setPassword(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resp = await userLogin(username, password);
      if (resp.data.login_successful) navigate("/blog");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.root}>
      <h2>Login</h2>
      <form className={classes.root}>
        <TextInput
          id="username"
          value={username}
          title="username"
          onChange={handleChange}
        />
        <TextInput
          id="password"
          type="password"
          value={password}
          title="password"
          onChange={handleChange}
        />
        <Button onClick={handleClick} label="login" />
      </form>
      <span>
        Forgot your password? <Link to="/signup">Reset Password</Link>
      </span>
      <span>
        Need an Account? <Link to="/signup">Sign Up</Link>
      </span>
    </div>
  );
};

export default Login;
