import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Hash, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CURRENT_USER } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: Hash, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: User, label: "Profile" },
];

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen sticky top-0 px-4 py-2 w-full max-w-[275px]">
      <div className="p-3 hover:bg-accent rounded-full w-fit cursor-pointer transition-colors mb-2">
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      <nav className="flex flex-col gap-1 mb-4">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 p-3 hover:bg-accent rounded-full cursor-pointer transition-colors w-fit pr-6"
          >
            <item.icon className={`h-7 w-7 ${item.active ? "stroke-[2.5px]" : ""}`} />
            <span className={`text-xl hidden xl:block ${item.active ? "font-bold" : ""}`}>
              {item.label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-4 p-3 hover:bg-accent rounded-full cursor-pointer transition-colors w-fit pr-6">
          <MoreHorizontal className="h-7 w-7" />
          <span className="text-xl hidden xl:block">More</span>
        </div>
      </nav>

      <Button className="w-full rounded-full py-6 text-lg font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white shadow-none hidden xl:block">
        Post
      </Button>
      <Button size="icon" className="xl:hidden rounded-full h-12 w-12 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white shadow-none">
        <SquarePen className="h-6 w-6" />
      </Button>

      <div className="mt-auto mb-4 flex items-center gap-3 p-3 hover:bg-accent rounded-full cursor-pointer transition-colors">
        <Avatar className="h-10 w-10">
          <AvatarImage src={CURRENT_USER.avatar} />
          <AvatarFallback>{CURRENT_USER.name[0]}</AvatarFallback>
        </Avatar>
        <div className="hidden xl:flex flex-col flex-1 min-w-0">
          <span className="font-bold truncate">{CURRENT_USER.name}</span>
          <span className="text-muted-foreground truncate">@{CURRENT_USER.username}</span>
        </div>
        <MoreHorizontal className="h-5 w-5 hidden xl:block ml-auto" />
      </div>
    </div>
  );
}
