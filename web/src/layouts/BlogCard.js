import { createUseStyles } from "react-jss";
import { getImage } from "../api";
import theme from "../theme";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  root: {
    height: "100px",
    width: "100%",
    display: "flex",
    borderRadius: "5px",
    overflow: "clip",
    border: `1px solid ${theme.borderPrimary}`,
    textDecoration: "none",
    color: "inherit",
  },
  image: {
    objectFit: "cover",
    width: "140px",
    height: "110px",
  },
  contentContainer: {
    width: "0px",
    flexGrow: 1,
    backgroundColor: theme.bgPrimary,
    margin: "0 10px ",
    "& > h3": {
      margin: "10px 0",
    },
  },
  overflow: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const BlogCard = ({ post, ...props }) => {
  const classes = useStyles();

  const defaultImages = [
    "images/dog.jpg",
    "images/cat.jpg",
    "images/ostrich.jpg",
    "images/lemur.jpg",
  ];

  // Assign default picture to posts without their own
  const imagePath =
    post?.image || defaultImages[post._id % defaultImages.length];

  return (
    <Link to={`/blog/${post._id}`} className={classes.root}>
      <img className={classes.image} src={getImage(imagePath)} alt="" />
      <div className={classes.contentContainer}>
        <h3 className={`${classes.overflow} ${classes.lowClearance}`}>
          {post.title}
        </h3>
        <h6>
          {post.author}
          <br />
          {new Date(parseInt(post.created)).toLocaleString()}
        </h6>
      </div>
    </Link>
  );
};

export default BlogCard;
