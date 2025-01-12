export interface VideoPost {
  /** Unique ID */
  id: number;
  /** Content */
  message: string;
  /** URL of the image */
  image: string;
  /** URL of the video */
  video: string;
  /** URL of the original post */
  reference: string;
  likes: number;
  dislikes: number;
  /** Relation */
  tags: VideoTag[];
  user: User;
  /** Timestamp of last update */
  timestamp: Date;
}

export interface VideoTag {
  /** Unique ID */
  id: number;
  /** Name without "#" */
  name: string;
}

export interface User {
  /** Unique ID */
  id: string;
  /** Username with "@" */
  username: string;
  /** Display name */
  displayName: string;
  /** URL of the avatar image */
  avatar: string;
}

export type SortType = "ranking" | "newest";
