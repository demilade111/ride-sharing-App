const sendResponse = (res, statusCode, message, data, success = true) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = {
  sendResponse,
};
