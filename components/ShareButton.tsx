"use client";

import type { VideoPost } from "@/types";
import {
  CircleCheckIcon,
  ClipboardIcon,
  Share,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  video: VideoPost;
}

export default function ShareButton({ video }: ShareButtonProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="w-16 h-16 bg-gray-900/50 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <Share className="w-8 h-8 text-white" />
      </button>
      {menuVisible && (
        <ShareMenu video={video} setMenuVisible={setMenuVisible} />
      )}
    </div>
  );
}

interface ShareMenuProps {
  video: VideoPost;
  setMenuVisible: (visible: boolean) => void;
}

function ShareMenu({ video, setMenuVisible }: ShareMenuProps) {
  const [isCopied, setCopied] = useState<boolean>(false);
  const shareOptions = [
    {
      icon: isCopied ? CircleCheckIcon : ClipboardIcon,
      label: "Copy Link",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => {
          setMenuVisible(false);
          setCopied(false);
        }, 500);
      },
    },
    {
      icon: SquareArrowOutUpRight,
      label: "Open Source",
      action: () => {
        window.location.href = video.reference;
        setMenuVisible(false);
      },
    },
  ];

  return (
    <div className="absolute bottom-full right-0 mb-6 w-44 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 scale-100 origin-bottom-right">
      {shareOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            type="button"
            key={option.label}
            onClick={option.action}
            className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
