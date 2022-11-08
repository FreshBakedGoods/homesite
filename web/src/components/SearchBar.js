import { createUseStyles } from "react-jss";
import theme from "../theme";

const useStyles = createUseStyles({
  root: {
    height: "30px",
    padding: "5px",
    backgroundColor: theme.bgSecondary,
    flexGrow: 1,
  },
  input: {
    outline: "none",
    border: "none",
    width: "100%",
    backgroundColor: "inherit",
  },
});

const SearchBar = ({ placeholder, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input className={classes.input} placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
