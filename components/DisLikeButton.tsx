"use client";

import { cn } from "@/lib/utils";
import type { VideoPost } from "@/types";
import { ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_DISLIKES = 3;

interface DisLikeButtonProps {
  video: VideoPost;
}

export default function DisLikeButton({ video }: DisLikeButtonProps) {
  const [isDisliked, setIsDisliked] = useState(false);
  const [minusOnes, setMinusOnes] = useState<number[]>([]);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleClick = () => {
    // TODO: Implement stored dislike count
    setIsDisliked(true);
    setMinusOnes((prev) => [...prev, Date.now()]);
    setDislikeCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (minusOnes.length > 0) {
      const timer = setTimeout(() => {
        setMinusOnes((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [minusOnes]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={
          "w-16 h-16 bg-gray-900/50 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110"
        }
      >
        <ThumbsDown
          className={cn("w-8 h-8", {
            "text-sky-500": isDisliked,
            "text-white": !isDisliked,
          })}
        />
      </button>
      {minusOnes.map((id) => (
        <div
          key={id}
          className="select-none absolute top-0 left-1/2 transform -translate-x-1/2 animate-fadeOutUp"
        >
          {dislikeCount > MAX_DISLIKES ? (
            <div className="relative -left-5 -top-4">
              <span className="text-white text-lg font-bold">MAX</span>
            </div>
          ) : (
            <div className="relative -left-2 -top-4">
              <span className="text-white text-lg font-bold">-1</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
