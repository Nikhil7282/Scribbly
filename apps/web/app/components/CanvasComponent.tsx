import React from "react";
import Canvas from "./tools/Canvas";
import { Shape } from "@draw/shapeTypes";

function CanvasComponent() {
  let existingShapes: Shape[] = [];
  return <Canvas existingShapes={existingShapes} />;
}

export default CanvasComponent;
