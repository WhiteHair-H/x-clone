import { Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TRENDS, SUGGESTIONS } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function RightSidebar() {
  return (
    <div className="hidden lg:flex flex-col gap-4 p-4 w-full max-w-[350px] sticky top-0 h-screen overflow-y-auto scrollbar-hide">
      <div className="sticky top-0 bg-background py-1 z-10">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#1d9bf0]" />
          <Input 
            placeholder="Search" 
            className="pl-12 bg-accent border-none rounded-full focus-visible:ring-1 focus-visible:ring-[#1d9bf0] h-11 shadow-none"
          />
        </div>
      </div>

      <div className="bg-accent/50 rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3">What's happening</h2>
        {TRENDS.map((trend, i) => (
          <div key={i} className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">{trend.topic} · Trending</p>
              <p className="font-bold">{trend.name}</p>
              <p className="text-xs text-muted-foreground">{trend.tweets} posts</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="px-4 py-4 hover:bg-accent cursor-pointer transition-colors">
          <p className="text-[#1d9bf0] text-sm">Show more</p>
        </div>
      </div>

      <div className="bg-accent/50 rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3">Who to follow</h2>
        {SUGGESTIONS.map((user) => (
          <div key={user.id} className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold truncate">{user.name}</span>
                {user.isVerified && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#1d9bf0]">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.01s-2.62-1.27-4.01-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.98-.2-4.02.81s-1.27 2.62-.81 4.01c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.33c-.46 1.4-.2 2.98.81 4.02s2.62 1.27 4.01.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.97.2 4.01-.81s1.27-2.62.81-4.01c1.31-.66 2.19-1.9 2.19-3.33zM9.9 17.17l-3.37-3.37 1.42-1.42 1.95 1.95 4.95-4.95 1.42 1.42-6.37 6.37z" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-muted-foreground truncate">@{user.username}</span>
            </div>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold h-8 px-4">
              Follow
            </Button>
          </div>
        ))}
        <div className="px-4 py-4 hover:bg-accent cursor-pointer transition-colors">
          <p className="text-[#1d9bf0] text-sm">Show more</p>
        </div>
      </div>

      <div className="px-4 py-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="hover:underline cursor-pointer">Terms of Service</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Cookie Policy</span>
        <span className="hover:underline cursor-pointer">Accessibility</span>
        <span className="hover:underline cursor-pointer">Ads info</span>
        <span className="hover:underline cursor-pointer">More...</span>
        <span>© 2024 X Corp.</span>
      </div>
    </div>
  );
}
