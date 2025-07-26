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

    getAllShapesInRoom: {
      method: "GET",
      path: "/get-all-shapes-in-room",
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
