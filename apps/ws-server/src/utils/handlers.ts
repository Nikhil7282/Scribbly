import { JwtPayload } from "jsonwebtoken";
import { User, WebSocketData } from "./types";
import { WebSocket } from "ws";
import { prismaClient } from "@repo/db/client";

export async function handleJoinRoom(
  users: User[],
  ws: WebSocket,
  parsedData: WebSocketData,
  isVerified: JwtPayload
) {
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
    return;
  }
  user?.rooms.push(parsedData.roomId);
}

export async function handleLeaveRoom(
  users: User[],
  parsedData: WebSocketData,
  isVerified: JwtPayload
) {
  const user = users.find((user) => user.userId === isVerified.id);
  if (!user) {
    return;
  }
  user.rooms = user?.rooms.filter((roomId) => roomId !== parsedData.roomId);
}

export async function handleMessage(
  users: User[],
  ws: WebSocket,
  parsedData: WebSocketData,
  isVerified: JwtPayload
) {
  const user = users.find((user) => user.userId === isVerified.id);
  if (!user) {
    return;
  }

  await prismaClient.chats.create({
    data: {
      message: JSON.stringify(parsedData.message) ?? "",
      roomId: parsedData.roomId ?? "",
      userId: isVerified.id,
    },
  });

  users.forEach((user) => {
    if (user.rooms.includes(parsedData.roomId)) {
      user.ws.send(JSON.stringify(parsedData));
    }
  });
}
