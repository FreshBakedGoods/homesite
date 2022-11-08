import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useParams } from "react-router-dom";
import { getBlogPost } from "../api";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    "& h2": {
      wordWrap: "break-word",
      maxWidth: "90vw",
    },
    "& p": {},
  },
});

const BlogEntry = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost(postId) {
      try {
        const { post } = await getBlogPost(postId);

        setPost(post);
      } catch (e) {
        console.log(e);
      }
    }
    getPost(id);
  }, [id]);

  return (
    <div className={classes.root}>
      <h2>{post?.title}</h2>
      <div>
        {post?.body?.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogEntry;
