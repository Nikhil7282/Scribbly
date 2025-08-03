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

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(6),
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
        201: z.object({
          message: z.string(),
          token: z.string(),
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

export const CreateRoomSuccessResponse = z.object({
  message: z.string(),
  roomId: z.string(),
  roomName: z.string(),
});

export const roomEndPoints = c.router(
  {
    createRoom: {
      method: "POST",
      path: "/create-room",
      body: z.object({}),
      responses: {
        201: CreateRoomSuccessResponse,
      },
    },

    getAllShapesInRoom: {
      method: "GET",
      path: "/get-all-shapes-in-room",
      query: z.object({
        roomId: z.string(),
      }),
      responses: {
        200: z.array(
          z.object({
            id: z.string(),
            shape: z.string(),
            color: z.string(),
            x: z.number(),
            y: z.number(),
            width: z.number(),
            height: z.number(),
            rotation: z.number(),
          })
        ),
      },
    },
  },

  {
    pathPrefix: "/room",
  }
);

export const contract = c.router({
  authContract: AuthEndPoints,
  roomContract: roomEndPoints,
});
