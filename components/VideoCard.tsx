"use client";

import type { VideoPost } from "@/types";
import { Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoCardProps {
  video: VideoPost;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVolumeToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        }
      },
      { threshold: 0.5 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-black snap-start overflow-hidden">
      <img
        src={video.image}
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-50"
        alt="Background blur"
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full max-h-screen w-[56.25vh] bg-black">
        <video
          src={video.video}
          className={"w-full h-full object-cover"}
          loop
          muted
          ref={videoRef}
        />
      </div>

      <div className="absolute bottom-4 left-4 right-16 text-white">
        <h3 className="font-semibold text-lg">{video.user.username}</h3>
        <p className="text-sm mt-2">{video.message}</p>
      </div>

      <div className="absolute top-20 right-4">
        <button
          type="button"
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
          onClick={handleVolumeToggle}
        >
          {isMuted ? (
            <VolumeOff className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
