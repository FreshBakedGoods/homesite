module.exports = httpResp = (status, req, data) => {
  const validStatus = ["failure", "success"];
  if (!Number.isNaN(status) && status < 0 && status >= validStatus.length)
    throw "Invalid http status";
  if (Number.isNaN(status) && !validStatus.includes(status))
    throw "Invalid http status";
  return {
    status: Number.isNaN(status) ? status : validStatus[status],
    method: req.method,
    route: req.originalUrl,
    data,
  };
};
