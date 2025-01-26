import { initContract } from "@ts-rest/core";
import { LoginSchema, RegisterSchema, UpdateUserSchema } from "./auth.types";
import { z } from "zod";

const c = initContract();

export const AuthEndPoints = c.router(
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
