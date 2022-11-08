import { ThemeProvider, createUseStyles } from "react-jss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";
import AppBar from "./layouts/AppBar";
import Login from "./layouts/Login";
import SignUp from "./layouts/SignUp";
import Blog from "./layouts/Blog";

import Profile from "./layouts/Profile";
import NewBlogPost from "./layouts/NewBlogPost";
import BlogEntry from "./layouts/BlogEntry";

const useStyles = createUseStyles({
  appWrapper: {
    height: "100vh",
    display: "grid",
    gridTemplateRows: "50px 1fr",
  },
  content: {
    maxWidth: "900px",
    width: "100%",
    height: "100%",
    justifySelf: "center",
  },
  "@global": {
    "*": {
      boxSizing: "border-box",
    },
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={classes.appWrapper}>
            <AppBar />
            <div className={classes.content}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/new" element={<NewBlogPost />} />
                <Route path="/blog/:id" element={<BlogEntry />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
