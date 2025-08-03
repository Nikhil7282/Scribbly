"use client";
import Menu from "@/components/tools/Menu";
import { MenuTypeEnum } from "@draw/shapeTypes";
import { useState } from "react";
import { useParams } from "next/navigation";
import SocketConnection from "./SocketConnection";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import ShareModal from "./ShareModal";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";
import { getQueryClient } from "@utils/api";
import { useRouter } from "next/navigation";

function CanvasPage() {
  const { roomId } = useParams<{ roomId: string }>();

  const [activeTool, setActiveTool] = useState<MenuTypeEnum>(MenuTypeEnum.HAND);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { makeApiCall } = useApi();
  const router = useRouter();

  const handleStartSession = async () => {
    await makeApiCall({
      showLoader: false,
      fetcherFn: () =>
        getQueryClient().roomContract.createRoom.mutation({
          body: {},
        }),
      onSuccessFn: (response) => {
        if (response.status === 201 && response.body) {
          setIsShareModalOpen(false);
          toast.success(response.body.message);
          router.push("/canvas/" + response.body.roomId);
        }
      },
      finallyFn: () => setIsLoading(false),
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="absolute top-8 z-10">
        <Menu activeTool={activeTool} setActiveTool={setActiveTool} />
      </div>

      <div className="absolute top-8 right-8 z-10">
        <Button
          className="h-10 px-4 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center gap-2"
          onClick={() => setIsShareModalOpen(true)}
        >
          <Share className="w-4 h-4" />
          Share
        </Button>
      </div>
      <ShareModal
        isLoading={isLoading}
        isShareModalOpen={isShareModalOpen}
        setIsShareModalOpen={setIsShareModalOpen}
        handleStartSession={handleStartSession}
      />

      <SocketConnection activeTool={activeTool} roomId={roomId?.[0]} />
    </div>
  );
}

export default CanvasPage;
