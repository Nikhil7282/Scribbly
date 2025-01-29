import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

export const UpdateUserSchema = RegisterSchema.omit({ password: true });

const AuthEndPoints = c.router(
  {
    register: {
      method: "POST",
      path: "/register",
      body: RegisterSchema,
      responses: {
        200: z.object({
          message: z.string(),
        }),
      },
    },

    login: {
      method: "POST",
      path: "/login",
      body: LoginSchema,
      responses: {
        200: z.object({
          message: z.string(),
        }),
      },
    },

    updateUser: {
      method: "PUT",
      path: "/updateUser",
      body: UpdateUserSchema,
      responses: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
  },
  {
    pathPrefix: "/auth",
  }
);

export const contract = c.router({
  authContract: AuthEndPoints,
});
