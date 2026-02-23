import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // Token format is usually "Bearer <token>", so we split it
    const tokenString = token.split(" ")[1]; 
    const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = verified; // Attach user ID to the request
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};