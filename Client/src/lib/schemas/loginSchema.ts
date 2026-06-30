import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain a non-alphanumeric character",
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
