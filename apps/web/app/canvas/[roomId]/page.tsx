"use client";
import Canvas from "@/components/tools/Canvas";
import Menu from "@/components/tools/Menu";
import { Shape } from "@draw/shapeTypes";
import { useState } from "react";

function CanvasPage() {
  const [activeTool, setActiveTool] = useState<number>(1);
  let existingShapes: Shape[] = [];
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="absolute top-8 z-10">
        <Menu activeTool={activeTool} setActiveTool={setActiveTool} />
      </div>
      <Canvas existingShapes={existingShapes} activeTool={activeTool} />
    </div>
  );
}

export default CanvasPage;
