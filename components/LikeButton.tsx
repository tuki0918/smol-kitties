"use client";

import { cn } from "@/lib/utils";
import type { VideoPost } from "@/types";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  video: VideoPost;
}

export default function LikeButton({ video }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [plusOnes, setPlusOnes] = useState<number[]>([]);

  const handleClick = () => {
    // TODO: Implement like count
    setIsLiked(true);
    setPlusOnes((prev) => [...prev, Date.now()]);
  };

  useEffect(() => {
    if (plusOnes.length > 0) {
      const timer = setTimeout(() => {
        setPlusOnes((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [plusOnes]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={
          "w-16 h-16 bg-gray-900/50 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110"
        }
      >
        <ThumbsUp
          className={cn("w-8 h-8", {
            "text-yellow-500": isLiked,
            "text-white": !isLiked,
          })}
        />
      </button>
      {plusOnes.map((id) => (
        <div
          key={id}
          className="select-none absolute top-0 left-1/2 transform -translate-x-1/2 animate-fadeOutUp"
        >
          <div className="relative -left-2 -top-4">
            <span className="text-white text-lg font-bold">+1</span>
          </div>
        </div>
      ))}
    </div>
  );
}
