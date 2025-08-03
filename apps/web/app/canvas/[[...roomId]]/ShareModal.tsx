import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ShareModal({
  isLoading,
  isShareModalOpen,
  setIsShareModalOpen,
  handleStartSession,
}: {
  isLoading: boolean;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  handleStartSession: () => void;
}) {
  return (
    <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800/95 border-gray-700/50 backdrop-blur-sm">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Live collaboration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-6 pb-6">
          <p className="text-center text-gray-300 text-lg leading-relaxed">
            Invite people to collaborate on your drawing in real-time.
          </p>

          <p className="text-center text-gray-400 text-base leading-relaxed max-w-md mx-auto">
            Your work is securely stored, ensuring a seamless experience across
            devices. Sign up to create and join live sessions effortlessly.
          </p>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleStartSession}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Start Session
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
