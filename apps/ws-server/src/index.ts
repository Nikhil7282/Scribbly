import http from "http";
import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/contract/constants";
import { prismaClient } from "@repo/db/client";

import { MessageType, verifyUser } from "./utils/utils";

const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const url = req.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";

  try {
    const isVerified = verifyUser(token);

    if (!isVerified) {
      ws.close();
      return;
    }

    ws.on("message", async (message) => {
      let parsedData;
      if (typeof message !== "string") {
        parsedData = JSON.parse(message.toString());
      } else {
        parsedData = JSON.parse(message);
      }
      if (parsedData && parsedData.type === MessageType.JOIN_ROOM) {
        const { roomId } = parsedData;

        const room = await prismaClient.rooms.findUnique({
          where: { id: roomId },
        });

        const usersExist = await prismaClient.user.findFirst({
          where: { rooms: { some: roomId } },
        });

        if (usersExist) {
          ws.send(
            JSON.stringify({
              Error: true,
              message: "You are already in a room",
            })
          );
          return;
        }

        if (!room) {
          ws.send(
            JSON.stringify({
              Error: true,
              message: "Room does not exist",
            })
          );
          return;
        }

        prismaClient.user.update({
          where: { id: isVerified.id, rooms: { none: { id: room.id } } },
          data: { rooms: { connect: { id: room.id } } },
        });
      }
    });
  } catch (error) {
    console.error("Invalid token:", error);
    ws.close();
  }
});

server.listen(8080, () => console.log("Server started on port 8080"));
