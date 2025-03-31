"use client";
import { useEffect, useRef } from "react";
import { initDraw } from "@draw/drawConfig";

function CanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawHandlers = initDraw(canvas);

    if (!drawHandlers) return;

    const { handleMouseDown, handleMouseMove, handleMouseUp } = drawHandlers;

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-[90vw] h-[90vh] border border-gray-400 rounded-md"
      />
    </div>
  );
}

export default CanvasPage;
