import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export const UpdateUserSchema = RegisterSchema.omit({ password: true });
