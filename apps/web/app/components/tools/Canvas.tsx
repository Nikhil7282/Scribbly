import { initDraw } from "@draw/drawConfig";
import { Shape } from "@draw/shapeTypes";
import React, { useEffect, useRef, useState } from "react";

function Canvas({
  existingShapes,
  activeTool,
}: {
  existingShapes: Shape[];
  activeTool: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawHandlers = initDraw({ canvas, existingShapes });
    if (!drawHandlers) return;

    // Panning functionality (dragging the canvas)
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDownPan = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseMovePan = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      setCanvasPosition((prevPos) => ({
        x: prevPos.x + dx,
        y: prevPos.y + dy,
      }));
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseUpPan = () => {
      isDragging = false;
    };

    // Add event listeners for panning
    canvas.addEventListener("mousedown", handleMouseDownPan);
    canvas.addEventListener("mousemove", handleMouseMovePan);
    canvas.addEventListener("mouseup", handleMouseUpPan);

    // Zoom functionality (mouse wheel)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1; // Zoom in or out based on wheel direction
      setZoom((prevZoom) => Math.max(0.1, prevZoom + zoomDelta)); // Enforce zoom limits
    };

    canvas.addEventListener("wheel", handleWheel);

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDownPan);
      canvas.removeEventListener("mousemove", handleMouseMovePan);
      canvas.removeEventListener("mouseup", handleMouseUpPan);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [existingShapes]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${zoom})`,
        transformOrigin: "top left",
      }}
    />
  );
}

export default Canvas;
