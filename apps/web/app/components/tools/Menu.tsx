"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Circle,
  ArrowRight,
  Type,
  ArrowLeft,
  RectangleHorizontal,
  Hand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuTypeEnum } from "@draw/shapeTypes";

interface MenuItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  label?: string;
}

function MenuItem({ icon, isActive = false, onClick, label }: MenuItemProps) {
  return (
    <Button
      aria-label={label}
      variant="ghost"
      className={cn(
        "relative flex-shrink-0  h-10 w-10  p-0 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors",
        isActive && "bg-indigo-600 text-white hover:bg-indigo-700"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-4 h-4 ">{icon}</div>
      </div>
    </Button>
  );
}

export default function Menu({
  activeTool,
  setActiveTool,
}: {
  activeTool: MenuTypeEnum;
  setActiveTool: Dispatch<SetStateAction<MenuTypeEnum>>;
}) {
  const menuItems = [
    {
      icon: <Hand className="w-full h-full" />,
      id: 1,
      type: MenuTypeEnum.HAND,
      label: "Hand",
    },
    {
      icon: <RectangleHorizontal className="w-full h-full" />,
      id: 2,
      type: MenuTypeEnum.RECTANGLE,
      label: "Rectangle",
    },
    {
      icon: <Circle className="w-full h-full" />,
      id: 3,
      type: MenuTypeEnum.CIRCLE,
      label: "Circle",
    },
    {
      icon: <ArrowLeft className="w-full h-full" />,
      id: 4,
      type: MenuTypeEnum.ARROW_LEFT,
      label: "Arrow Left",
    },
    {
      icon: <ArrowRight className="w-full h-full" />,
      id: 5,
      type: MenuTypeEnum.ARROW_RIGHT,
      label: "Arrow Right",
    },
    {
      icon: <Type className="w-full h-full" />,
      id: 6,
      type: MenuTypeEnum.TEXT,
      label: "Text",
    },
  ];

  return (
    <div className="w-full max-w-full">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-1 sm:p-2">
        <div className="flex items-center gap-1 md:gap-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 md:gap-1 min-w-max">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                isActive={activeTool === item.type}
                onClick={() => setActiveTool(item.type)}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
