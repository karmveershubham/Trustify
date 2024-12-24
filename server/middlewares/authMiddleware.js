import { z } from "zod";

// Middleware to check if a user is logged in
export const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401); // Respond with 401 Unauthorized if not logged in
};

// Zod schema for signup validation
const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name cannot exceed 50 characters" }),
    email: z
      .string()
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Pinpoints the confirmPassword field for the error
    message: "Passwords do not match",
  });

// Middleware for signup validation
export const signupValidation = (req, res, next) => {
  try {
    signupSchema.parse(req.body); // Validates the request body
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

// Zod schema for login validation
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Middleware for login validation
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

// Exporting the modules
export default { isLoggedIn, signupValidation, loginValidation };
