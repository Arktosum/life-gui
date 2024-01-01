require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.HASH_SECRET_KEY;
// Middleware to verify the token
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied.");
  let [bearer, TOKEN] = token.split(" ");
  try {
    const verified = jwt.verify(TOKEN, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = verifyToken;
