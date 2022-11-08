import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    width: "fit-content",
    padding: "5px",
  },
  button: {
    fontFamily: "inherit",
  },
});

const Button = ({ label = "empty", type = "button", onClick, ...props }) => {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    try {
      onClick(e);
    } catch (e) {
      console.error(
        `Must define onClick handler for button labeled : ${label}`
      );
    }
  };
  return (
    <div className={classes.root}>
      <button onClick={handleClick} className={classes.button} type={type}>
        {label?.toUpperCase()}
      </button>
    </div>
  );
};

export default Button;
