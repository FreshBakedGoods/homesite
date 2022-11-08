const { createUseStyles } = require("react-jss");

// Find a better adaptive sizing
const useStyles = createUseStyles({
  root: ({ width }) => ({
    width,
    height: "200px",
    minHeight: "45%",
    resize: "none",
    fontFamily: "inherit",
    fontSize:"1rem"
  }),
});

const TextArea = ({ width = "auto", onChange, value = "", id, ...props }) => {
  const classes = useStyles({ props, width });
  return (
    <textarea
      className={classes.root}
      onChange={onChange}
      value={value}
      id={id}
    />
  );
};

export default TextArea;
