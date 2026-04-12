export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Tweet {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  image?: string;
  isLiked?: boolean;
  isRetweeted?: boolean;
}
