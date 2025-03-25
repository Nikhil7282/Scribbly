import http from "http";
import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/contract/constants";
import { prismaClient } from "@repo/db/client";

import { MessageType, verifyUser } from "./utils/utils";
import { User } from "./utils/type";

const server = http.createServer();

const wss = new WebSocketServer({ server });

const users: User[] = [];

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

    users.push({ ws, userId: isVerified.id, rooms: [] });

    ws.on("message", async (message) => {
      let parsedData;
      if (typeof message !== "string") {
        parsedData = JSON.parse(message.toString());
      } else {
        parsedData = JSON.parse(message);
      }
      if (parsedData && parsedData.type === MessageType.JOIN_ROOM) {
        const user = users.find((user) => user.userId === isVerified.id);
        if (!user) {
          return;
        }
        const isAlreadyJoined = user?.rooms.includes(parsedData.roomId);
        if (isAlreadyJoined) {
          ws.send(
            JSON.stringify({
              message: "You are already in a room",
              Error: true,
            })
          );
        }
        user?.rooms.push(parsedData.roomId);

        // const { roomId } = parsedData;

        // const room = await prismaClient.rooms.findUnique({
        //   where: { id: roomId },
        // });

        // const usersExist = await prismaClient.user.findFirst({
        //   where: { rooms: { some: roomId } },
        // });

        // if (usersExist) {
        //   ws.send(
        //     JSON.stringify({
        //       Error: true,
        //       message: "You are already in a room",
        //     })
        //   );
        //   return;
        // }

        // if (!room) {
        //   ws.send(
        //     JSON.stringify({
        //       Error: true,
        //       message: "Room does not exist",
        //     })
        //   );
        //   return;
        // }

        // prismaClient.user.update({
        //   where: { id: isVerified.id, rooms: { none: { id: room.id } } },
        //   data: { rooms: { connect: { id: room.id } } },
        // });
      }

      if (parsedData && parsedData.type === MessageType.LEAVE_ROOM) {
        const user = users.find((user) => user.userId === isVerified.id);
        if (!user) {
          return;
        }
        user.rooms = user?.rooms.filter(
          (roomId) => roomId !== parsedData.roomId
        );
      }
      console.log(`users-${parsedData.type}`, users);
    });
  } catch (error) {
    console.error("Invalid token:", error);
    ws.close();
  }
});

server.listen(8080, () => console.log("Server started on port 8080"));
