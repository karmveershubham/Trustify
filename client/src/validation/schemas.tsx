import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }),
    confirmPassword: z.string().nonempty({ message: "Confirm Password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["password_confirmation"],
        message: "Password and Confirm Password don't match",
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

// export const resetPasswordLinkSchema = z.object({
//   email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
// });

// export const resetPasswordSchema = z
//   .object({
//     password: z.string().nonempty({ message: "Password is required" }),
//     password_confirmation: z.string().nonempty({ message: "Confirm Password is required" }),
//   })
//   .superRefine((data, ctx) => {
//     if (data.password !== data.password_confirmation) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["password_confirmation"],
//         message: "Password and Confirm Password don't match",
//       });
//     }
//   });

// export const verifyEmailSchema = z.object({
//   email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
//   otp: z.string().nonempty({ message: "OTP is required" }),
// });

// export const changePasswordSchema = z
//   .object({
//     password: z.string().nonempty({ message: "Password is required" }),
//     password_confirmation: z.string().nonempty({ message: "Confirm Password is required" }),
//   })
//   .superRefine((data, ctx) => {
//     if (data.password !== data.password_confirmation) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["password_confirmation"],
//         message: "Password and Confirm Password don't match",
//       });
//     }
//   });
