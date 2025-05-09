const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if the Authorization header exists and has the Bearer token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied: No Token Provided or Incorrect Format" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Log the token for debugging purposes
    console.log("Token Received:", token);

    // Verify the token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Log the verified token data
    console.log("Verified Token:", verified);

    // If no valid token or user ID is found, return error
    if (!verified || !verified.id) {
      return res.status(401).json({ message: "Access Denied: Invalid Token" });
    }

    // Attach the user data to the request object for further use
    req.user = verified; 
    next();
  } catch (error) {
    // Check for token expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired: Please login again" });
    }

    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    console.log("🔍 Checking Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Token Provided or Incorrect Format");
      return res.status(401).json({ message: "Access Denied: No Token Provided or Incorrect Format" });
    }

    const token = authHeader.split(" ")[1];

    console.log("🔑 Token Received:", token);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token Verified:", verified);

    if (!verified || !verified.id || verified.role !== "admin") {
      console.log("❌ Unauthorized Access: User is not an admin", verified);
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = verified;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("❌ Token Expired");
      return res.status(401).json({ message: "Token Expired: Please login again" });
    }

    console.error("🚨 JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
