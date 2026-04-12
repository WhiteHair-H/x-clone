import React from "react";
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, BarChart3 } from "lucide-react";
import { Tweet } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-b border-border hover:bg-accent/30 transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={tweet.author.avatar} />
          <AvatarFallback>{tweet.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-bold hover:underline truncate">{tweet.author.name}</span>
            {tweet.author.isVerified && (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-[#1d9bf0]">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.01s-2.62-1.27-4.01-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.98-.2-4.02.81s-1.27 2.62-.81 4.01c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.33c-.46 1.4-.2 2.98.81 4.02s2.62 1.27 4.01.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.97.2 4.01-.81s1.27-2.62.81-4.01c1.31-.66 2.19-1.9 2.19-3.33zM9.9 17.17l-3.37-3.37 1.42-1.42 1.95 1.95 4.95-4.95 1.42 1.42-6.37 6.37z" />
              </svg>
            )}
            <span className="text-muted-foreground truncate">@{tweet.author.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{tweet.timestamp}</span>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 rounded-full hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[15px] leading-normal mb-3 whitespace-pre-wrap">{tweet.content}</p>
          {tweet.image && (
            <div className="rounded-2xl overflow-hidden border border-border mb-3">
              <img src={tweet.image} alt="Tweet image" className="w-full h-auto object-cover max-h-[512px]" referrerPolicy="no-referrer" />
            </div>
          )}
          <div className="flex justify-between max-w-md text-muted-foreground">
            <div className="flex items-center gap-1 group cursor-pointer hover:text-[#1d9bf0]">
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                <MessageCircle className="h-[18px] w-[18px]" />
              </div>
              <span className="text-xs">{tweet.replies > 0 && tweet.replies.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-[#00ba7c]">
              <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10 transition-colors">
                <Repeat2 className="h-[18px] w-[18px]" />
              </div>
              <span className="text-xs">{tweet.retweets > 0 && tweet.retweets.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-[#f91880]">
              <div className="p-2 rounded-full group-hover:bg-[#f91880]/10 transition-colors">
                <Heart className={`h-[18px] w-[18px] ${tweet.isLiked ? "fill-[#f91880] text-[#f91880]" : ""}`} />
              </div>
              <span className="text-xs">{tweet.likes > 0 && tweet.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-[#1d9bf0]">
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                <BarChart3 className="h-[18px] w-[18px]" />
              </div>
              <span className="text-xs">{tweet.views > 0 && tweet.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-[#1d9bf0]">
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                <Share className="h-[18px] w-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
