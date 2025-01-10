export interface VideoPost {
  id: number;
  message: string;
  image: string;
  video: string;
  reference: string;
  likes: number;
  dislikes: number;
  user: User;
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
  avatarUrl: string;
}

export type SortType = "ranking" | "newest";
