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
  user: User;
  /** Timestamp of last update */
  timestamp: Date;
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
