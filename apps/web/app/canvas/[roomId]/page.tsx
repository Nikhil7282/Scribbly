"use client";
import Menu from "@/components/tools/Menu";
import { MenuTypeEnum } from "@draw/shapeTypes";
import { useState } from "react";
import { useParams } from "next/navigation";
import SocketConnection from "./SocketConnection";

function CanvasPage() {
  const { roomId } = useParams();

  const [activeTool, setActiveTool] = useState<MenuTypeEnum>(MenuTypeEnum.HAND);
  if (!roomId) return <div>Loading...</div>;
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="absolute top-8 z-10">
        <Menu activeTool={activeTool} setActiveTool={setActiveTool} />
      </div>
      <SocketConnection activeTool={activeTool} roomId={roomId as string} />
    </div>
  );
}

export default CanvasPage;
