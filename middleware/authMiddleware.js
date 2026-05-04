import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // Ensure this path is correct

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token
      console.log("Received Token:", token); // Debugging log

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      console.log("Decoded Token:", decoded); // Debugging log

      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      res.status(401).json({ message: `Invalid Token: ${error.message}` });
    }
  } else {
    console.log("No Token Provided");
    res.status(401).json({ message: "No Token, Access Denied" });
  }
};


export default protect;
