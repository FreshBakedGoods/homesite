import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { getBlogPosts } from "../api";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import BlogCard from "./BlogCard";

const useStyles = createUseStyles({
  root: {
    padding: "10px 5px",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    paddingTop: "5px",
  },
});

const Blog = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const { count, posts: p } = await getBlogPosts();
        if (count > 0) setPosts(p);
      } catch (e) {
        console.error(e);
      }
    }
    getPosts();
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    navigate("/blog/new");
  };

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <SearchBar placeholder={"Search"} />
        <Button label="New Post" onClick={onClick} />
      </div>
      <div className={classes.posts}>
        {posts.map((post, idx) => (
          <BlogCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
