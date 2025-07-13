"use client";
import CanvasComponent from "@/components/CanvasComponent";
import Menu from "@/components/tools/Menu";

function CanvasPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="absolute top-8">
        <Menu />
      </div>
      <CanvasComponent />
    </div>
  );
}

export default CanvasPage;
