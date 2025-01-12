"use client";

import type { VideoPost } from "@/types";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  video: VideoPost;
}

export default function LikeButton({ video }: LikeButtonProps) {
  // TODO: Implement feature
  return (
    <div className="relative">
      <button type="button" className="flex flex-col items-center group">
        <div className="w-16 h-16 bg-gray-900/50 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110">
          <ThumbsUp className="w-8 h-8 text-white" />
        </div>
      </button>
    </div>
  );
}