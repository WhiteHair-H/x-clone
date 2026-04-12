import { Tweet, User } from "./types";

export const CURRENT_USER: User = {
  id: "u1",
  name: "John Doe",
  username: "johndoe",
  avatar: "https://picsum.photos/seed/johndoe/200/200",
  isVerified: true,
};

export const MOCK_TWEETS: Tweet[] = [
  {
    id: "t1",
    author: {
      id: "u2",
      name: "Elon Musk",
      username: "elonmusk",
      avatar: "https://picsum.photos/seed/elon/200/200",
      isVerified: true,
    },
    content: "Mars is looking good today! 🚀",
    timestamp: "2h",
    likes: 125000,
    retweets: 15000,
    replies: 8000,
    views: 1200000,
    image: "https://picsum.photos/seed/mars/800/400",
  },
  {
    id: "t2",
    author: {
      id: "u3",
      name: "React",
      username: "reactjs",
      avatar: "https://picsum.photos/seed/react/200/200",
      isVerified: true,
    },
    content: "Check out the new React 19 features! Hooks are getting even better. #ReactJS #WebDev",
    timestamp: "5h",
    likes: 4500,
    retweets: 800,
    replies: 120,
    views: 85000,
  },
  {
    id: "t3",
    author: {
      id: "u4",
      name: "Tailwind CSS",
      username: "tailwindcss",
      avatar: "https://picsum.photos/seed/tailwind/200/200",
      isVerified: true,
    },
    content: "Tailwind v4 is here! 🚀 Faster, smaller, and even more powerful.",
    timestamp: "8h",
    likes: 8900,
    retweets: 1200,
    replies: 250,
    views: 150000,
  },
];

export const TRENDS = [
  { topic: "Technology", name: "#ReactJS", tweets: "125K" },
  { topic: "Business", name: "Elon Musk", tweets: "85.2K" },
  { topic: "Entertainment", name: "New Movie", tweets: "45K" },
  { topic: "Sports", name: "World Cup", tweets: "250K" },
];

export const SUGGESTIONS: User[] = [
  {
    id: "u5",
    name: "Bill Gates",
    username: "BillGates",
    avatar: "https://picsum.photos/seed/bill/200/200",
    isVerified: true,
  },
  {
    id: "u6",
    name: "Vite",
    username: "vite_js",
    avatar: "https://picsum.photos/seed/vite/200/200",
    isVerified: true,
  },
];
