"use client";

import Canvas from "@/components/tools/Canvas";
import { MenuTypeEnum, Shape } from "@draw/shapeTypes";
import { useEffect, useState } from "react";
import axios from "axios";

function SocketConnection({
  roomId,
  activeTool,
}: {
  roomId: string;
  activeTool: MenuTypeEnum;
}) {
  const token = localStorage.getItem("userToken");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [loading, setLoading] = useState(true);

  const [reRenderCount, setReRenderCount] = useState(0);

  console.log("reRenderCount", reRenderCount);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/room/get-all-shapes-in-room`,
          {
            params: { roomId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShapes(res.data.map((message: any) => JSON.parse(message.message)));
      } catch (error) {
        console.error("Error fetching shapes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShapes();

    const socket = new WebSocket(`ws://localhost:8080/ws?token=${token}`);

    socket.onopen = (event) => {
      console.log("Socket connected");
      try {
        socket.send(JSON.stringify({ type: "JOIN_ROOM", roomId }));
      } catch (error) {
        console.error("Error joining room:", error);
      }
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "MESSAGE" && data.roomId === roomId) {
        setShapes((prevShapes) => [...prevShapes, data.message]);
      }
    };

    setReRenderCount((prevCount) => prevCount + 1);

    return () => {
      socket.close();
    };
  }, [roomId]);

  if (loading || !socket) return <div>Loading...</div>;

  return (
    <Canvas
      roomId={roomId}
      activeTool={activeTool}
      socket={socket}
      shapes={shapes}
    />
  );
}

export default SocketConnection;
