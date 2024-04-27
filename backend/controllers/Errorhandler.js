async function ErrorHandler(callback) {
  try {
    callback();
  } catch {
    res.status(500).json({ message: err.message });
  }
}

module.exports = ErrorHandler;
