import { Image, ListFilter, Smile, Calendar, MapPin, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CURRENT_USER } from "@/constants";
import { useState, useRef, useEffect } from "react";

interface TweetComposerProps {
  onTweet: (content: string) => void;
}

export function TweetComposer({ onTweet }: TweetComposerProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTweet = () => {
    if (content.trim()) {
      onTweet(content);
      setContent("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="p-4 border-b border-border">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={CURRENT_USER.avatar} />
          <AvatarFallback>{CURRENT_USER.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <div className="mb-2">
            <Textarea
              ref={textareaRef}
              placeholder="What is happening?!"
              className="border-none focus-visible:ring-0 text-xl p-0 min-h-[50px] resize-none overflow-hidden shadow-none bg-transparent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 mb-4 text-[#1d9bf0] font-bold text-sm cursor-pointer hover:bg-[#1d9bf0]/10 w-fit px-2 py-0.5 rounded-full transition-colors">
            <Globe className="h-4 w-4" />
            <span>Everyone can reply</span>
          </div>

          <div className="h-[1px] bg-border mb-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#1d9bf0]">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1d9bf0]/10 h-9 w-9">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1d9bf0]/10 h-9 w-9">
                <ListFilter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1d9bf0]/10 h-9 w-9">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1d9bf0]/10 h-9 w-9">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1d9bf0]/10 h-9 w-9 opacity-50">
                <MapPin className="h-5 w-5" />
              </Button>
            </div>
            <Button
              disabled={!content.trim()}
              onClick={handleTweet}
              className="rounded-full px-5 font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white shadow-none disabled:opacity-50"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
