"use client";

import VideoList from "@/components/VideoList";
import type { SortType, VideoPost } from "@/types";
import React, { useState } from "react";

const videos: VideoPost[] = [];

export default function App() {
  const [sortType, setSortType] = useState<SortType>("newest");
  return (
    <div className="relative h-screen w-full bg-black">
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
        <VideoList videos={videos} sortType={sortType} />
      </div>
    </div>
  );
}
