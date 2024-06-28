// exports.handleError = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   };
  
exports.handleError = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: err.message,
  });
};