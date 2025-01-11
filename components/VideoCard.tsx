"use client";

import VolumeButton, { volumeAtom } from "@/components/VolumeButton";
import type { VideoPost } from "@/types";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

interface VideoCardProps {
  video: VideoPost;
}

export default function VideoCard({ video }: VideoCardProps) {
  const isVolumeOn = useAtomValue(volumeAtom);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVolumeOn;
    }
  }, [isVolumeOn]);

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
          className={"select-none w-full h-full object-cover"}
          loop
          muted
          playsInline
          ref={videoRef}
        />
        <div className="hidden md:block absolute top-4 right-4">
          <VolumeButton />
        </div>
      </div>

      <div className="block md:hidden absolute top-4 right-4">
        <VolumeButton />
      </div>

      <div className="absolute bottom-4 left-4 right-16 text-white">
        <h3 className="font-semibold text-lg">{video.user.username}</h3>
        <p className="text-sm mt-2">{video.message}</p>
      </div>
    </div>
  );
}
