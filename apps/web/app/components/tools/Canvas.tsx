import { initDraw } from "@draw/drawConfig";
import { Shape } from "@draw/shapeTypes";
import React, { useEffect, useRef, useState } from "react";

function Canvas({ existingShapes }: { existingShapes: Shape[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawHandlers = initDraw({ canvas, existingShapes });

    if (!drawHandlers) return;

    const { handleMouseDown, handleMouseMove, handleMouseUp } = drawHandlers;

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="w-[90vw] h-[90vh] border border-gray-400 rounded-md"
    />
  );
}

export default Canvas;
