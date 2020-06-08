function dateFormat() {
  return new Date(Date.now()).toUTCString();
}

function logger(req, res, next) {
  console.log(`${req.method} - ${req.url} - ${dateFormat()}`);
  next();
}

module.exports = {
  logger
};
