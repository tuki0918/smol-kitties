import VideoCard from "@/components/VideoCard";
import type { SortType, VideoPost } from "@/types";

interface VideoListProps {
  videos: VideoPost[];
  sortType: SortType;
}

const VideoList: React.FC<VideoListProps> = ({ videos, sortType }) => {
  const sortedVideos = [...videos].sort((a, b) => {
    if (sortType === "ranking") {
      return b.likes - a.likes;
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {sortedVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
