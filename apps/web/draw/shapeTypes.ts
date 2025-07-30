export enum ShapeTypeEnum {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
}

export enum MenuTypeEnum {
  HAND = "HAND",
  ARROW_LEFT = "ARROW_LEFT",
  ARROW_RIGHT = "ARROW_RIGHT",
  CIRCLE = ShapeTypeEnum.CIRCLE,
  RECTANGLE = ShapeTypeEnum.RECTANGLE,
  TEXT = "TEXT",
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
