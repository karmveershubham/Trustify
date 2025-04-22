import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to check if a user is authenticated
export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
        req.user = decoded; // Attach user info to request without overwriting `req.body`
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Zod schema for login validation   we can create separate file for schema s
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Middleware for login validation   we can create differentf folder  for validations
export const loginValidation = (req, res, next) => {
  try {
    loginSchema.parse(req.body); // Validates the request body
    next(); // If validation passes, proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({
      errors: error.errors.map((err) => ({
        path: err.path, // Specifies the field with the error
        message: err.message, // Error message
      })),
    });
  }
};

// Exporting modules
export default { loginValidation, isAuthenticated };
