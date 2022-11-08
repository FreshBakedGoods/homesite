import { useWindowWidth } from "@react-hook/window-size";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { NavLink, useNavigate } from "react-router-dom";
import theme from "../theme";

const useStyles = createUseStyles({
  root: {
    borderBottom: `1px solid ${theme.colorPrimary}`,
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: theme.bgPrimary,
    color: theme.colorPrimary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 5px",
    height: "48px",
    maxWidth: "900px",
    flexGrow: 1,
  },
  spacer: {
    flexGrow: 1,
  },
  menuIcon: {
    fontSize: "2rem",
  },
  navLinks: {
    display: "flex",
    gap: "10px",
    "& > a": {
      textDecoration: "none",
      position: "relative",
      color: theme.colorPrimary,
    },
    "& > a:after": {
      position: "absolute",
      left: 0,
      bottom: -3,
      content: "''",
      borderBottom: `3px solid ${theme.active}`,
      width: "0%",
    },
    "& > a.active:after": { width: "100%", transition: "width .5s" },
  },
  drawer: ({ drawerIsOpen }) => ({
    top: 0,
    right: drawerIsOpen ? "0px" : "-60%",
    backgroundColor: theme.bgSecondary,
    width: "60%",
    position: "fixed",
    height: "100%",
    transition: "right 0.5s ease-in",
    borderLeft: "1px solid black",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 100,
  }),
  drawerLinks: {
    fontSize: "1.5rem",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },
  drawerWrapper: ({ drawerIsOpen }) => ({
    display: drawerIsOpen ? "block" : "none",
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    zIndex: 99,
  }),
});

const AppBar = (props) => {
  const links = [
    { text: "Blog", path: "/blog", icon: "library_books" },
    { text: "Projects", path: "/projects", icon: "grid_view" },
    { text: "About", path: "/about", icon: "info" },
    localStorage.getItem("trible-b")
      ? { text: "Profile", path: "/profile", icon: "person" }
      : { text: "Login", path: "/login", icon: "account_circle" },
  ];

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const width = useWindowWidth();
  const classes = useStyles({ props, drawerIsOpen });
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const { path } = e.target.dataset;
    navigate(path);
    setDrawerIsOpen(false);
  };

  return (
    <header className={classes.root}>
      <div className={classes.wrapper}>
        <h2>Paul</h2>
        <div className={classes.spacer} />
        <div>
          {width > 400 ? (
            <div className={classes.navLinks}>
              {links.map((val, idx) => (
                <NavLink key={idx} to={val.path}>
                  {val.text}
                </NavLink>
              ))}
            </div>
          ) : (
            <div>
              <div
                className={classes.drawerWrapper}
                onClick={() => setDrawerIsOpen(false)}
              />
              <span
                className={`material-icons ${classes.menuIcon}`}
                onClick={() => setDrawerIsOpen(true)}
              >
                menu
              </span>
              <div className={classes.drawer}>
                {links.map((val, idx) => (
                  <div
                    className={classes.drawerLinks}
                    key={idx}
                    data-path={val.path}
                    onClick={handleClick}
                  >
                    <span className="material-icons">{val.icon}</span>
                    {val.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
