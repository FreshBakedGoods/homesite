const { query } = require("../database");

module.exports.blogController_read = async (req, res) => {
  try {
    const text =
      "SELECT b._id, b.created, b.edited, b.title, u.display_name as author \
    FROM blog b \
    JOIN users u \
    ON b.author=u._id \
    ORDER BY b.created DESC LIMIT 20";
    const { rows, rowCount } = await query(text);
    res.json(httpResp(1, req, { count: rowCount, posts: rows }));
  } catch (e) {
    console.error(e);
    res.json(httpResp(0, req, { message: "You didn't do it" }));
  }
};

module.exports.blogController_readOne = async (req, res) => {
  const { id } = req.params;
  try {
    const text =
      "SELECT b._id, b.body, b.created, b.edited, b.title, u.display_name as author \
    FROM blog b \
    JOIN users u \
    ON b.author=u._id \
    WHERE b._id=$1";
    const values = [id];
    const { rows } = await query(text, values);
    res.json(httpResp(1, req, { post: rows[0] }));
  } catch (e) {
    console.error(e);
    res.json(httpResp(0, req, { message: "You didn't do it" }));
  }
};

module.exports.blogController_create = async (req, res) => {
  const { title, body } = req.body;
  const { _id } = res.locals;
  try {
    const timestamp = Date.now();
    const text =
      "INSERT INTO blog(author, title, body, created, edited) \
                  VALUES ($1, $2, $3, $4, $5) RETURNING _id";
    const values = [_id, title, body, timestamp, timestamp];
    const result = await query(text, values);
    if (result.rowCount === 0) throw new Error("Failed to create blog post.");
    res.json(httpResp(1, req, { post_id: result.rows[0]._id }));
  } catch (e) {
    console.error(e);
    res.json(httpResp(0, req, { message: e }));
  }
};
