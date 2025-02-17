import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const CreateRoomSchema = z.object({
  roomName: z.string(),
});

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
      body: z.object({
        roomName: z.string(),
      }),
      responses: {
        200: CreateRoomSuccessResponse,
      },
    },
  },
  {
    pathPrefix: "/room",
  }
);
