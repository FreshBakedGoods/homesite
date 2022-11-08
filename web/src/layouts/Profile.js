import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { clearSiteUser, userGet, userLogout } from "../api";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

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

const Profile = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await userGet();
        if (
          resp.status === "failure" &&
          resp.data.error === "Token has expired"
        )
          clearSiteUser() && navigate("/login");
        if (resp.status === "failure") throw new Error("Failed to get user.");
        setUser(resp.data.user);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, [navigate]);

  const onChange = (e) => {
    const { id, value } = e.target;
    setUser((state) => ({ ...state, [id]: value }));
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await userLogout();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.root}>
      {user?.username && (
        <>
          <TextInput
            title="username"
            id="username"
            value={user?.username}
            onChange={onChange}
            disabled
          />
          <TextInput
            title="display name"
            id="display_name"
            value={user?.display_name}
            onChange={onChange}
            disabled
          />
          <TextInput
            title="email"
            id="email"
            value={user?.email}
            onChange={onChange}
            disabled
          />
          <Button label="Log out" onClick={handleClick} />
        </>
      )}
    </div>
  );
};

export default Profile;
