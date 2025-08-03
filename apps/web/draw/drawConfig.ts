import { MenuTypeEnum, Shape, ShapeTypeEnum } from "./shapeTypes";

export const initDraw = ({
  canvas,
  activeTool,
  roomId,
  socket,
  shapes,
}: {
  canvas: HTMLCanvasElement;
  activeTool: MenuTypeEnum;
  roomId?: string;
  socket: WebSocket | null;
  shapes: Shape[];
}) => {
  const width = window.innerWidth; // width for canvas

  const height = window.innerHeight; // height for canvas

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.strokeStyle = "#fff"; // stroke color

  clearCanvas(shapes, canvas, ctx);

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

    clearCanvas(shapes, canvas, ctx);
    if (activeTool === MenuTypeEnum.RECTANGLE) {
      ctx.strokeRect(startX, startY, w, h);
    } else if (activeTool === MenuTypeEnum.CIRCLE) {
      ctx.beginPath();
      ctx.arc(startX, startY, w, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    isMouseClicked = false;

    const rect = canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const w = currentX - startX;
    const h = currentY - startY;

    let newShape: Shape | null = null;

    if (activeTool === MenuTypeEnum.RECTANGLE) {
      newShape = {
        type: ShapeTypeEnum.RECTANGLE,
        x: startX,
        y: startY,
        width: w,
        height: h,
      };
    } else if (activeTool === MenuTypeEnum.CIRCLE) {
      newShape = {
        type: ShapeTypeEnum.CIRCLE,
        centerX: startX,
        centerY: startY,
        radius: w,
      };
    }

    if (newShape) {
      shapes.push(newShape);

      if (roomId && socket) {
        socket.send(
          JSON.stringify({
            type: "MESSAGE",
            roomId,
            message: newShape,
          })
        );
      } else {
        localStorage.setItem("canvas_shapes", JSON.stringify(shapes));
      }
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
  };
};

const clearCanvas = (
  shapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.map((shape) => {
    if (shape.type === ShapeTypeEnum.RECTANGLE) {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
    if (shape.type === ShapeTypeEnum.CIRCLE) {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
};
