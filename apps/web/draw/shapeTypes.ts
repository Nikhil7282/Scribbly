export enum ShapeTypeEnum {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
}

export type Rectangle = {
  type: ShapeTypeEnum.RECTANGLE;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Circle = {
  type: ShapeTypeEnum.CIRCLE;
  centerX: number;
  centerY: number;
  radius: number;
};

export type Shape = Rectangle | Circle;
