module.exports = (err, req, res, next) => {
  if (!err.status) {
    res.status( 500 ).send({
      error: {
        status: 500,
        name: err.name,
        message: err.message
      }
    });
    next(err);
  } else {
    res.status( err.status ).send({
      error: {
        status: err.status,
        name: err.name,
        message: err.message,
      }
    });
  }
}
