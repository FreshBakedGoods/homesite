import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import theme from "../theme";

const useStyles = createUseStyles({
  root: ({ width }) => ({
    position: "relative",
    width,
  }),
  input: ({ disabled }) => ({
    boxSizing: "border-box",
    outline: "none",
    border: `1px solid ${theme.borderPrimary}`,
    borderRadius: `5px`,
    height: "30px",
    fontSize: "1rem",
    fontFamily: "inherit",
    width: "100%",
    cursor: disabled ? "auto" : "pointer",
  }),
  title: ({ titleMoved }) => ({
    position: "absolute",
    top: titleMoved ? "-4px" : "6px",
    left: titleMoved ? "10px" : "13px",
    fontSize: titleMoved ? "0.6rem" : "1rem",
    backgroundColor: theme.bgPrimary,
    userSelect: "none",
    transition: "top .25s , font-size .25s, left .25s",
    pointerEvents: "none",
  }),
});

const TextInput = ({
  title,
  onChange,
  value = "",
  id,
  type = "text",
  autocomplete = "on",
  disabled,
  width,
  ...props
}) => {
  const [titleMoved, setTitleMoved] = useState(false);

  useEffect(() => {
    if (value.length > 0 && titleMoved !== true) setTitleMoved(true);
  }, [value.length]);

  const handleFocus = (e) => setTitleMoved(true);

  const handleBlur = (e) => {
    if (value.length === 0) setTitleMoved(false);
  };

  const classes = useStyles({ props, titleMoved, disabled, width });

  return (
    <div className={classes.root}>
      <input
        id={id}
        className={classes.input}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete={autocomplete}
        disabled={disabled}
      />
      <span className={classes.title}>{title?.toUpperCase()}</span>
    </div>
  );
};

export default TextInput;
