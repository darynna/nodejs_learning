const { serverConfig } = require('../configs');

exports.globalErrorHandler = (err, req, res, next) => {
  // let msg;
  // let stack;
  // let error;

  // if (serverConfig.environment === 'development') {
  //   msg = err.message;
  //   stack = err.stack;
  //   error = err;
  // } else {
  //   msg = err.status === 500 ? 'Internal server error' : err.message;
  // }

  // res.status(err.status ?? 500).json({
  //   msg,
  //   stack,
  //   error,
  // });
  let message;
  let stack;
  let error;
  if (serverConfig.environment === 'development') {
    message = err.message;
    stack = err.stack;
    error = err;
  } else {
    message = err.status === 500 ? 'Internal server error' : err.message;
  }

  // if (serverConfig.environment === 'production') {
  //   return res.status(err.status ?? 500).json({
  //     msg: !err.status || err.status === 500 ? 'Internal server error' : err.message,
  //   });
  // }

  res.status(err.status ?? 500).json({
    msg: err.message,
    stack: err.stack,
  });
};
