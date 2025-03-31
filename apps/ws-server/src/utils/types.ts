import { WebSocket } from "ws";

export enum MessageType {
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  MESSAGE = "MESSAGE",
}

export interface User {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

export interface WebSocketData {
  type: MessageType;
  roomId: string;
  message?: string;
}
