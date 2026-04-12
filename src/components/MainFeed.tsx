import { useState, useEffect } from "react";
import { TweetCard } from "./TweetCard";
import { TweetComposer } from "./TweetComposer";
import { CURRENT_USER } from "@/constants";
import { Tweet } from "@/types";
import { fetchTweets, postTweet } from "@/api";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MainFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetchTweets().then(setTweets).catch(console.error);
  }, []);

  const handleNewTweet = async (content: string) => {
    const newTweet = await postTweet(content, CURRENT_USER.id);
    setTweets((prev) => [newTweet, ...prev]);
  };

  return (
    <div className="flex flex-col min-h-screen border-x border-border max-w-[600px] w-full">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <h1 className="text-xl font-bold px-4 py-3">Home</h1>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full bg-transparent h-12 p-0 rounded-none border-b border-border">
            <TabsTrigger 
              value="for-you" 
              className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none relative after:absolute after:bottom-0 after:h-1 after:w-16 after:bg-[#1d9bf0] after:rounded-full data-[state=inactive]:after:hidden"
            >
              For you
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none relative after:absolute after:bottom-0 after:h-1 after:w-16 after:bg-[#1d9bf0] after:rounded-full data-[state=inactive]:after:hidden"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TweetComposer onTweet={handleNewTweet} />

      <div className="flex flex-col">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
