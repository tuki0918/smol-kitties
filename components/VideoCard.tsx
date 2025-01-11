"use client";

import VideoRepeatButton, { repeatAtom } from "@/components/VideoRepeatButton";
import VolumeButton, { volumeAtom } from "@/components/VolumeButton";
import type { VideoPost } from "@/types";
import { useAtomValue } from "jotai";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoCardProps {
  video: VideoPost;
}

export default function VideoCard({ video }: VideoCardProps) {
  const isVolumeOn = useAtomValue(volumeAtom);
  const isRepeatOn = useAtomValue(repeatAtom);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoCover, setVideoCover] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVolumeOn;
    }
  }, [isVolumeOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = isRepeatOn;
    }
  }, [isRepeatOn]);

  const handleVideoClick = () => {
    if (isVideoCover) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setVideoCover(!isVideoCover);
  };

  const handleVideoEnd = () => {
    const nextElement =
      videoRef.current?.closest(".h-screen")?.nextElementSibling;
    if (nextElement) {
      nextElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setVideoCover(false);
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
      {/* Background */}
      <img
        src={video.image}
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-50"
        alt="Background blur"
      />

      {/* Video */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full max-h-screen w-full md:w-auto bg-black">
        {isVideoCover && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button
              type="button"
              onClick={handleVideoClick}
              className="w-24 h-24 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
            >
              <Play className="w-12 h-12 text-white fill-white" />
            </button>
          </div>
        )}

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: */}
        <video
          src={video.video}
          className={"select-none w-full h-full object-cover"}
          loop
          muted
          playsInline
          onClick={handleVideoClick}
          onEnded={handleVideoEnd}
          ref={videoRef}
        />
        <div className="hidden md:block absolute top-4 left-4">
          <div className="flex space-x-2">
            <VolumeButton />
            <VideoRepeatButton />
          </div>
        </div>
      </div>

      {/* Global Menu */}
      <div className="block md:hidden absolute top-4 left-4">
        <div className="flex space-x-2">
          <VolumeButton />
          <VideoRepeatButton />
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-4 left-4">
        <h3 className="font-semibold text-lg text-white">
          {video.user.username}
        </h3>
        <p className="mt-2 text-sm text-white">{video.message}</p>
      </div>
    </div>
  );
}
