import { Shape, ShapeTypeEnum } from "./shapeTypes";

export const initDraw = (canvas: HTMLCanvasElement) => {
  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.9;
  canvas.width = width;
  canvas.height = height;

  let existingShapes: Shape[] = [];

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.strokeStyle = "#fff";

  let isMouseClicked = false;
  let startX = 0;
  let startY = 0;

  const handleMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    isMouseClicked = true;
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isMouseClicked) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const w = currentX - startX;
    const h = currentY - startY;

    clearCanvas(existingShapes, canvas, ctx);
    ctx.strokeRect(startX, startY, w, h);
  };

  const handleMouseUp = (event: MouseEvent) => {
    isMouseClicked = false;

    const rect = canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const w = currentX - startX;
    const h = currentY - startY;

    const newShape: Shape = {
      type: ShapeTypeEnum.RECTANGLE,
      x: startX,
      y: startY,
      width: w,
      height: h,
    };

    existingShapes.push(newShape);
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

const clearCanvas = (
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === ShapeTypeEnum.RECTANGLE) {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
};
