"use client";

import { initDraw } from "@draw/drawConfig";
import { MenuTypeEnum, Shape } from "@draw/shapeTypes";
import React, { useEffect, useRef } from "react";

function Canvas({
  activeTool,
  roomId,
  socket,
  shapes,
}: {
  activeTool: MenuTypeEnum;
  roomId: string;
  socket: WebSocket;
  shapes: Shape[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initDraw({ canvas, activeTool, roomId, socket, shapes });
  }, [shapes, activeTool]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

export default Canvas;
