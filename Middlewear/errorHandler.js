const { sendResponse } = require("../utils/responseHandler");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";
  sendResponse(res, statusCode, message, null, false);
};

module.exports = errorHandler;
