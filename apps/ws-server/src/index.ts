import http from "http";
import { WebSocketServer } from "ws";
import { verifyUser } from "./utils/utils";
import { MessageType, User, WebSocketData } from "./utils/types";
import {
  handleJoinRoom,
  handleLeaveRoom,
  handleMessage,
} from "./utils/handlers";

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
      let parsedData: WebSocketData;
      if (typeof message !== "string") {
        parsedData = JSON.parse(message.toString());
      } else {
        parsedData = JSON.parse(message);
      }
      if (parsedData && parsedData.type === MessageType.JOIN_ROOM) {
        handleJoinRoom(users, ws, parsedData, isVerified);
      }

      if (parsedData && parsedData.type === MessageType.LEAVE_ROOM) {
        handleLeaveRoom(users, parsedData, isVerified);
      }

      if (parsedData && parsedData.type === MessageType.MESSAGE) {
        handleMessage(users, ws, parsedData, isVerified);
      }
    });
  } catch (error) {
    console.error("Invalid token:", error);
    ws.close();
  }
});

server.listen(8080, () => console.log("Server started on port 8080"));
