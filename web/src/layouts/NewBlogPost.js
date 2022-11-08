import { createUseStyles } from "react-jss";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { blogCreate } from "../api";
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
    height: "100%",
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
  },
  error: {
    color: theme.errorMessage,
  },
});

const NewBlogPost = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useErrorMessage(3000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body)
      return setErrorMessage("Title and body both required.");
    try {
      const resp = await blogCreate({ title, body });
      navigate(`/blow/${resp}`);
    } catch (e) {}
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/blog");
  };

  const handleChange = (e) => {
    const {
      target: { value, id },
    } = e;
    if (id === "title") return setTitle(value);
    if (id === "body") return setBody(value);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextInput
        title="Post Title"
        width="85%"
        onChange={handleChange}
        id="title"
        value={title}
      />
      <TextArea width="85%" onChange={handleChange} id="body" value={body} />
      <div className={classes.buttonBar}>
        <Button label="submit" onClick={handleSubmit} />
        <Button label="cancel" onClick={handleCancel} />
      </div>
      <p className={classes.error}>{errorMessage}</p>
    </form>
  );
};

export default NewBlogPost;
